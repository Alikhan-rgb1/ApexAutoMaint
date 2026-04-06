import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const nodeEnv = config.get<string>('NODE_ENV') ?? 'development';
        const secret = config.get<string>('JWT_SECRET');
        if ((nodeEnv === 'production' || nodeEnv === 'prod') && !secret) {
          throw new Error('JWT_SECRET is required in production');
        }
        return { secret: secret ?? 'dev_jwt_secret_change_me' };
      },
    }),
  ],
  exports: [JwtModule],
})
export class AuthJwtModule {}
