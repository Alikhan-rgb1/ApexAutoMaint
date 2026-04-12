import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

type CorsCallback = (err: Error | null, allow?: boolean) => void;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const originEnv =
    process.env.FRONTEND_URL ??
    process.env.CORS_ORIGIN ??
    'http://localhost:3000';
  const origins = originEnv
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

  const allowAny = origins.includes('*');
  const exactOrigins = origins.filter((o) => !o.includes('*') && o !== '*');
  const wildcardRegexes = origins
    .filter((o) => o.includes('*') && o !== '*')
    .map((pattern) => {
      const rx = `^${escapeRegex(pattern).replace(/\\\*/g, '.*')}$`;
      return new RegExp(rx);
    });

  app.enableCors({
    origin: (origin: string | undefined, cb: CorsCallback) => {
      if (!origin) return cb(null, true);
      if (allowAny) return cb(null, true);
      if (exactOrigins.includes(origin)) return cb(null, true);
      if (wildcardRegexes.some((r) => r.test(origin))) return cb(null, true);
      return cb(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port, '0.0.0.0');
}
void bootstrap();
