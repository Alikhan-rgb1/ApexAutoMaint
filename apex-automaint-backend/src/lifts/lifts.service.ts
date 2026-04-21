import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { AuthUser } from '../auth/auth.types';
import { Notification } from '../notifications/notification.entity.js';
import { Vehicle } from '../vehicles/vehicle.entity.js';
import { VehiclesService } from '../vehicles/vehicles.service';
import { Lift } from './lift.entity';
import { CreateLiftDto } from './dto/create-lift.dto';
import { UpdateLiftDto } from './dto/update-lift.dto';

@Injectable()
export class LiftsService {
  constructor(
    @InjectRepository(Lift)
    private readonly liftsRepo: Repository<Lift>,
    @InjectRepository(Vehicle)
    private readonly vehiclesRepo: Repository<Vehicle>,
    @InjectRepository(Notification)
    private readonly notificationsRepo: Repository<Notification>,
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

    const prevStatus = lift.status;
    const prevVehicleId = lift.vehicleId;

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

    const nextVehicleId = lift.vehicleId;
    if (prevVehicleId !== nextVehicleId) {
      if (nextVehicleId) {
        await this.createLiftInAppNotification(nextVehicleId, {
          type: 'lift_assigned',
          message: (vehicleLabel) =>
            `Ваш автомобиль ${vehicleLabel} поставлен на пост ${lift.name}.`,
        });
      } else if (prevVehicleId) {
        await this.createLiftInAppNotification(prevVehicleId, {
          type: 'lift_released',
          message: (vehicleLabel) =>
            `Ваш автомобиль ${vehicleLabel} снят с поста ${lift.name}.`,
        });
      }
    }

    if (prevStatus !== lift.status && lift.vehicleId) {
      const statusText = (lift.status ?? '').trim();
      if (statusText) {
        await this.createLiftInAppNotification(lift.vehicleId, {
          type: 'lift_status',
          message: (vehicleLabel) =>
            `Статус по посту ${lift.name} для ${vehicleLabel}: ${statusText}.`,
        });
      }
    }

    return { ok: true as const };
  }

  private async createLiftInAppNotification(
    vehicleId: string,
    payload: {
      type: string;
      message: (vehicleLabel: string) => string;
    },
  ) {
    const vehicle = await this.vehiclesRepo.findOne({
      where: { id: vehicleId },
    });
    if (!vehicle) return;

    const label = `${vehicle.make} ${vehicle.model} (${vehicle.year})`;
    await this.notificationsRepo.save(
      this.notificationsRepo.create({
        userId: vehicle.userId,
        vehicleId: vehicle.id,
        type: payload.type,
        channel: 'in_app',
        message: payload.message(label),
        isSent: false,
        scheduledAt: new Date(),
      }),
    );
  }
}
