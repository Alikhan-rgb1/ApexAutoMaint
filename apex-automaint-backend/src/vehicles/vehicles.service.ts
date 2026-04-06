import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import type { AuthUser } from '../auth/auth.types';
import { VehicleTechData } from './vehicle-tech-data.entity.js';
import { Vehicle } from './vehicle.entity.js';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { UpdateVehicleTechDataDto } from './dto/update-vehicle-tech-data.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehiclesRepo: Repository<Vehicle>,
    @InjectRepository(VehicleTechData)
    private readonly techRepo: Repository<VehicleTechData>,
    private readonly dataSource: DataSource,
  ) {}

  async listForUser(user: AuthUser): Promise<Vehicle[]> {
    if (user.role === 'client') {
      return this.vehiclesRepo.find({ where: { userId: user.sub } });
    }
    return this.vehiclesRepo.find();
  }

  async getByIdForUser(id: string, user: AuthUser): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepo.findOne({ where: { id } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    if (user.role === 'client' && vehicle.userId !== user.sub) {
      throw new ForbiddenException('Forbidden');
    }
    return vehicle;
  }

  async createForUser(dto: CreateVehicleDto, user: AuthUser): Promise<Vehicle> {
    const vehicle = this.vehiclesRepo.create({
      userId: user.sub,
      make: dto.make,
      model: dto.model,
      year: dto.year,
      vin: dto.vin ?? null,
      currentMileage: dto.currentMileage,
    });
    return this.vehiclesRepo.save(vehicle);
  }

  async updateForUser(
    id: string,
    dto: UpdateVehicleDto,
    user: AuthUser,
  ): Promise<Vehicle> {
    const vehicle = await this.getByIdForUser(id, user);
    if (user.role === 'client' && vehicle.userId !== user.sub) {
      throw new ForbiddenException('Forbidden');
    }

    if (dto.make !== undefined) vehicle.make = dto.make;
    if (dto.model !== undefined) vehicle.model = dto.model;
    if (dto.year !== undefined) vehicle.year = dto.year;
    if (dto.vin !== undefined) vehicle.vin = dto.vin;
    if (dto.currentMileage !== undefined)
      vehicle.currentMileage = dto.currentMileage;

    return this.vehiclesRepo.save(vehicle);
  }

  async getTechData(
    vehicleId: string,
    user: AuthUser,
  ): Promise<VehicleTechData | null> {
    await this.getByIdForUser(vehicleId, user);
    return this.techRepo.findOne({ where: { vehicleId } });
  }

  async listForOwner(
    userId: string,
    onlyWithoutOrders: boolean,
  ): Promise<Vehicle[]> {
    if (!onlyWithoutOrders) {
      return this.vehiclesRepo.find({ where: { userId } });
    }

    return this.dataSource
      .getRepository(Vehicle)
      .createQueryBuilder('v')
      .leftJoin('service_orders', 'o', 'o.vehicle_id = v.id')
      .where('v.user_id = :userId', { userId })
      .andWhere('o.id IS NULL')
      .orderBy('v.created_at', 'DESC')
      .getMany();
  }

  async deleteForUser(id: string, user: AuthUser): Promise<{ ok: true }> {
    const vehicle = await this.vehiclesRepo.findOne({ where: { id } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    if (user.role === 'client' && vehicle.userId !== user.sub) {
      throw new ForbiddenException('Forbidden');
    }
    await this.vehiclesRepo.delete({ id });
    return { ok: true };
  }

  async upsertTechData(
    vehicleId: string,
    dto: UpdateVehicleTechDataDto,
  ): Promise<VehicleTechData> {
    const existing = await this.techRepo.findOne({ where: { vehicleId } });
    const tech = existing
      ? this.techRepo.merge(existing, {
          oilBrand: dto.oilBrand,
          oilViscosity: dto.oilViscosity,
          oilChangeMileage: dto.oilChangeMileage,
          oilNextChangeKm: dto.oilNextChangeKm,
          transmissionType: dto.transmissionType,
          transmissionOil: dto.transmissionOil,
          transmissionOilChangeMileage: dto.transmissionOilChangeMileage,
          tireSize: dto.tireSize,
          tireType: dto.tireType,
          brakePadFrontMm: dto.brakePadFrontMm,
          brakePadRearMm: dto.brakePadRearMm,
          airFilterBrand: dto.airFilterBrand,
          cabinFilterBrand: dto.cabinFilterBrand,
        })
      : this.techRepo.create({
          vehicleId,
          oilBrand: dto.oilBrand,
          oilViscosity: dto.oilViscosity,
          oilChangeMileage: dto.oilChangeMileage,
          oilNextChangeKm: dto.oilNextChangeKm,
          transmissionType: dto.transmissionType,
          transmissionOil: dto.transmissionOil,
          transmissionOilChangeMileage: dto.transmissionOilChangeMileage,
          tireSize: dto.tireSize,
          tireType: dto.tireType,
          brakePadFrontMm: dto.brakePadFrontMm,
          brakePadRearMm: dto.brakePadRearMm,
          airFilterBrand: dto.airFilterBrand,
          cabinFilterBrand: dto.cabinFilterBrand,
        });
    return this.techRepo.save(tech);
  }
}
