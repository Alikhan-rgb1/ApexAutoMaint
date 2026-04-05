import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }

  async createUser(params: {
    email: string;
    name: string;
    phone: string;
    passwordHash: string;
    carMake?: string;
    carModel?: string;
    carYear?: number;
    serviceType?: string;
  }) {
    const existing = await this.findByEmail(params.email);
    if (existing) throw new ConflictException('Email already registered');

    const user = this.usersRepo.create({
      email: params.email,
      name: params.name,
      phone: params.phone,
      passwordHash: params.passwordHash,
      carMake: params.carMake ?? null,
      carModel: params.carModel ?? null,
      carYear: params.carYear ?? null,
      serviceType: params.serviceType ?? null,
    });
    return this.usersRepo.save(user);
  }
}
