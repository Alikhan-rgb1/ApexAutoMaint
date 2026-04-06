import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

import type { AuthUser } from '../auth.types';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user?: AuthUser }>();
    const authorization = req.headers.authorization;
    const token = authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : null;
    if (!token) throw new UnauthorizedException('Missing token');

    try {
      const payload = await this.jwtService.verifyAsync<AuthUser>(token);
      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
