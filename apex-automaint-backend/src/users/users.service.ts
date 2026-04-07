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

  async listUsers(search?: string) {
    const qb = this.usersRepo
      .createQueryBuilder('u')
      .orderBy('u.createdAt', 'DESC');
    if (search && search.trim()) {
      const q = `%${search.trim().toLowerCase()}%`;
      qb.where(
        'LOWER(u.name) LIKE :q OR LOWER(u.email) LIKE :q OR LOWER(u.phone) LIKE :q',
        { q },
      );
    }
    return qb.getMany();
  }

  async createUser(params: {
    email: string;
    name: string;
    phone: string;
    passwordHash: string;
    role?: User['role'];
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
      role: params.role ?? 'client',
      carMake: params.carMake ?? null,
      carModel: params.carModel ?? null,
      carYear: params.carYear ?? null,
      serviceType: params.serviceType ?? null,
    });
    return this.usersRepo.save(user);
  }

  async upsertSeedUser(params: {
    email: string;
    name: string;
    phone: string;
    passwordHash: string;
    role: User['role'];
    updateExisting: boolean;
  }) {
    const existing = await this.findByEmail(params.email);
    if (!existing) {
      const user = this.usersRepo.create({
        email: params.email,
        name: params.name,
        phone: params.phone,
        passwordHash: params.passwordHash,
        role: params.role,
        carMake: null,
        carModel: null,
        carYear: null,
        serviceType: null,
      });
      return this.usersRepo.save(user);
    }

    if (!params.updateExisting) return existing;

    const updated = this.usersRepo.merge(existing, {
      name: params.name,
      phone: params.phone,
      passwordHash: params.passwordHash,
      role: params.role,
    });
    return this.usersRepo.save(updated);
  }
}
