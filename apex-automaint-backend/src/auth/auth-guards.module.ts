import { Module } from '@nestjs/common';

import { AuthJwtModule } from './auth-jwt.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [AuthJwtModule],
  providers: [JwtAuthGuard, RolesGuard],
  exports: [AuthJwtModule, JwtAuthGuard, RolesGuard],
})
export class AuthGuardsModule {}
