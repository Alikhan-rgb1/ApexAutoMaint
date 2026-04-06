import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuardsModule } from '../auth/auth-guards.module';
import { User } from '../users/user.entity';
import { Notification } from './notification.entity';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [AuthGuardsModule, TypeOrmModule.forFeature([Notification, User])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
