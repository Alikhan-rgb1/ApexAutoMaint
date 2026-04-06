import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import type { AuthUser } from '../auth/auth.types';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get('my')
  my(@CurrentUser() user: AuthUser) {
    return this.service.listMy(user.sub);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('mechanic', 'admin')
  create(@Body() dto: CreateNotificationDto) {
    return this.service.create(dto);
  }
}
