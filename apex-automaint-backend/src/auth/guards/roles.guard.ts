import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

import type { AuthUser } from '../auth.types';
import { ROLES_KEY } from '../roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<
      Array<'client' | 'mechanic' | 'admin'>
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!roles || roles.length === 0) return true;

    const req = context
      .switchToHttp()
      .getRequest<Request & { user?: AuthUser }>();
    const role = req.user?.role;
    if (!role) throw new ForbiddenException('Missing role');
    if (!roles.includes(role)) throw new ForbiddenException('Forbidden');
    return true;
  }
}
