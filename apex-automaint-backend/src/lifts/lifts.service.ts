import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { AuthUser } from '../auth/auth.types';
import { VehiclesService } from '../vehicles/vehicles.service';
import { Lift } from './lift.entity';
import { CreateLiftDto } from './dto/create-lift.dto';
import { UpdateLiftDto } from './dto/update-lift.dto';

@Injectable()
export class LiftsService {
  constructor(
    @InjectRepository(Lift)
    private readonly liftsRepo: Repository<Lift>,
    private readonly vehicles: VehiclesService,
  ) {}

  private readonly adminUser: AuthUser = { sub: '', email: '', role: 'admin' };

  async list() {
    const lifts = await this.liftsRepo.find({
      relations: { vehicle: true },
      order: { group: 'ASC', name: 'ASC' },
    });
    return lifts.map((l) => ({
      id: l.id,
      name: l.name,
      group: l.group,
      status: l.status,
      workTime: l.workTime,
      workType: l.workType,
      notes: l.notes,
      mechanic: l.mechanic,
      vehicleId: l.vehicleId,
      vehicle: l.vehicle
        ? {
            id: l.vehicle.id,
            make: l.vehicle.make,
            model: l.vehicle.model,
            year: l.vehicle.year,
          }
        : null,
    }));
  }

  async create(dto: CreateLiftDto) {
    const lift = await this.liftsRepo.save(
      this.liftsRepo.create({
        name: dto.name.trim(),
        group: dto.group.trim(),
        status: (dto.status ?? 'available').trim(),
        workTime: null,
        workType: null,
        notes: null,
        mechanic: null,
        vehicleId: null,
      }),
    );
    return { id: lift.id };
  }

  async update(id: string, dto: UpdateLiftDto) {
    const lift = await this.liftsRepo.findOne({ where: { id } });
    if (!lift) throw new NotFoundException('Lift not found');

    if (dto.status !== undefined) lift.status = (dto.status ?? '').trim();
    if (dto.workTime !== undefined)
      lift.workTime = dto.workTime ? dto.workTime.trim() : null;
    if (dto.workType !== undefined)
      lift.workType = dto.workType ? dto.workType.trim() : null;
    if (dto.notes !== undefined)
      lift.notes = dto.notes ? dto.notes.trim() : null;
    if (dto.mechanic !== undefined)
      lift.mechanic = dto.mechanic ? dto.mechanic.trim() : null;

    if (dto.vehicleId !== undefined) {
      const vId = (dto.vehicleId ?? '').toString().trim();
      if (!vId) {
        lift.vehicleId = null;
      } else {
        await this.vehicles.getByIdForUser(vId, this.adminUser);
        lift.vehicleId = vId;
      }
    }

    await this.liftsRepo.save(lift);
    return { ok: true as const };
  }
}
