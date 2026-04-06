import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('mechanic', 'admin')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async list(@Query('search') search?: string) {
    const users = await this.usersService.listUsers(search);
    return users.map((u) => ({
      id: u.id,
      name: u.name,
      phone: u.phone,
      email: u.email,
      role: u.role,
    }));
  }
}
