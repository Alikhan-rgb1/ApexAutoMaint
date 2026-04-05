import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url =
          config.get<string>('DATABASE_URL') ??
          config.get<string>('SUPABASE_DB_URL');
        const sslEnabled =
          config.get<string>('DB_SSL') === 'true' ||
          (url?.includes('supabase') ?? false);
        const dnsFamilyRaw = config.get<string>('DB_DNS_FAMILY');
        const dnsFamily =
          dnsFamilyRaw === '4' || dnsFamilyRaw === '6'
            ? Number(dnsFamilyRaw)
            : (url?.includes('supabase') ?? false)
              ? 6
              : undefined;

        return {
          type: 'postgres',
          url,
          host: url ? undefined : config.get<string>('DB_HOST', 'localhost'),
          port: url ? undefined : config.get<number>('DB_PORT', 5432),
          username: url ? undefined : config.get<string>('DB_USER', 'postgres'),
          password: url
            ? undefined
            : config.get<string>('DB_PASSWORD', 'postgres'),
          database: url ? undefined : config.get<string>('DB_NAME', 'postgres'),
          ssl: sslEnabled ? { rejectUnauthorized: false } : undefined,
          extra: dnsFamily ? { family: dnsFamily } : undefined,
          autoLoadEntities: true,
          synchronize: config.get<string>('DB_SYNCHRONIZE') === 'true',
        };
      },
    }),
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
