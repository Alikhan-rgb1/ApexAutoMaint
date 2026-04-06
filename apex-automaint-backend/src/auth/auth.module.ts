import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { AuthJwtModule } from './auth-jwt.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, AuthJwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
