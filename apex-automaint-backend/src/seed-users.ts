import { NestFactory } from '@nestjs/core';
import bcrypt from 'bcryptjs';

import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function main() {
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const allowProd = process.env.SEED_ALLOW_PRODUCTION === 'true';
  if ((nodeEnv === 'production' || nodeEnv === 'prod') && !allowProd) {
    throw new Error(
      'Seeding is disabled in production. Set SEED_ALLOW_PRODUCTION=true to override.',
    );
  }

  const adminEmail =
    process.env.SEED_ADMIN_EMAIL ?? 'admin@apexautomaint.local';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'Admin1234!';
  const mechanicEmail =
    process.env.SEED_MECHANIC_EMAIL ?? 'mechanic@apexautomaint.local';
  const mechanicPassword =
    process.env.SEED_MECHANIC_PASSWORD ?? 'Mechanic1234!';

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });
  const users = app.get(UsersService);

  const adminExisting = await users.findByEmail(adminEmail.toLowerCase());
  if (!adminExisting) {
    await users.createUser({
      email: adminEmail.toLowerCase(),
      name: 'Admin',
      phone: '+0000000000',
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: 'admin',
    });
  }

  const mechanicExisting = await users.findByEmail(mechanicEmail.toLowerCase());
  if (!mechanicExisting) {
    await users.createUser({
      email: mechanicEmail.toLowerCase(),
      name: 'Mechanic',
      phone: '+0000000000',
      passwordHash: await bcrypt.hash(mechanicPassword, 10),
      role: 'mechanic',
    });
  }

  await app.close();

  process.stdout.write(`ADMIN_EMAIL=${adminEmail}\n`);
  process.stdout.write(`ADMIN_PASSWORD=${adminPassword}\n`);
  process.stdout.write(`MECHANIC_EMAIL=${mechanicEmail}\n`);
  process.stdout.write(`MECHANIC_PASSWORD=${mechanicPassword}\n`);
}

void main();
