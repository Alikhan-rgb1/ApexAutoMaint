import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async onApplicationBootstrap() {
    const enabled = this.config.get<string>('SEED_ON_START') === 'true';
    if (!enabled) return;

    const nodeEnv = this.config.get<string>('NODE_ENV') ?? 'development';
    const allowProd =
      this.config.get<string>('SEED_ALLOW_PRODUCTION') === 'true';
    if ((nodeEnv === 'production' || nodeEnv === 'prod') && !allowProd) {
      return;
    }

    const updateExisting =
      this.config.get<string>('SEED_UPDATE_EXISTING') === 'true';

    const adminEmail = this.config.get<string>('SEED_ADMIN_EMAIL');
    const adminPassword = this.config.get<string>('SEED_ADMIN_PASSWORD');
    const mechanicEmail = this.config.get<string>('SEED_MECHANIC_EMAIL');
    const mechanicPassword = this.config.get<string>('SEED_MECHANIC_PASSWORD');

    if (adminEmail && adminPassword) {
      await this.usersService.upsertSeedUser({
        email: adminEmail.toLowerCase(),
        name: 'Admin',
        phone: '+0000000000',
        passwordHash: await bcrypt.hash(adminPassword, 10),
        role: 'admin',
        updateExisting,
      });
    }

    if (mechanicEmail && mechanicPassword) {
      await this.usersService.upsertSeedUser({
        email: mechanicEmail.toLowerCase(),
        name: 'Mechanic',
        phone: '+0000000000',
        passwordHash: await bcrypt.hash(mechanicPassword, 10),
        role: 'mechanic',
        updateExisting,
      });
    }
  }
}
