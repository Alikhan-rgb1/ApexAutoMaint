import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { AuthUser } from '../auth/auth.types';
import { Notification } from '../notifications/notification.entity';
import { VehicleTechData } from '../vehicles/vehicle-tech-data.entity.js';
import { Vehicle } from '../vehicles/vehicle.entity.js';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';
import { OrderItem } from './order-item.entity';
import { ServiceOrder, ServiceOrderStatuses } from './service-order.entity';

@Injectable()
export class ServiceOrdersService {
  constructor(
    @InjectRepository(ServiceOrder)
    private readonly ordersRepo: Repository<ServiceOrder>,
    @InjectRepository(OrderItem)
    private readonly itemsRepo: Repository<OrderItem>,
    @InjectRepository(Vehicle)
    private readonly vehiclesRepo: Repository<Vehicle>,
    @InjectRepository(VehicleTechData)
    private readonly techRepo: Repository<VehicleTechData>,
    @InjectRepository(Notification)
    private readonly notificationsRepo: Repository<Notification>,
  ) {}

  async list(user: AuthUser) {
    if (user.role === 'client') {
      return this.ordersRepo.find({
        where: { userId: user.sub },
        relations: { vehicle: true, items: true },
        order: { createdAt: 'DESC' },
      });
    }
    return this.ordersRepo.find({
      relations: { vehicle: true, items: true, user: true },
      order: { createdAt: 'DESC' },
    });
  }

  async getById(id: string, user: AuthUser) {
    const order = await this.ordersRepo.findOne({
      where: { id },
      relations: { vehicle: true, items: true, user: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (user.role === 'client' && order.userId !== user.sub)
      throw new ForbiddenException('Forbidden');
    return order;
  }

  async listByVehicle(vehicleId: string, user: AuthUser) {
    const vehicle = await this.vehiclesRepo.findOne({
      where: { id: vehicleId },
    });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    if (user.role === 'client' && vehicle.userId !== user.sub)
      throw new ForbiddenException('Forbidden');

    return this.ordersRepo.find({
      where: { vehicleId },
      relations: { items: true },
      order: { createdAt: 'DESC' },
    });
  }

  async create(dto: CreateServiceOrderDto, createdBy: string) {
    const vehicle = await this.vehiclesRepo.findOne({
      where: { id: dto.vehicleId },
    });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    if (vehicle.userId !== dto.userId)
      throw new ForbiddenException('Vehicle does not belong to user');

    const order = await this.ordersRepo.save(
      this.ordersRepo.create({
        userId: dto.userId,
        vehicleId: dto.vehicleId,
        status: ServiceOrderStatuses[0],
        mileageAtService: dto.mileageAtService,
        notes: dto.notes,
        totalPrice: dto.totalPrice,
        createdBy,
        serviceDate: new Date(dto.serviceDate),
      }),
    );

    const items = dto.items.map((i) =>
      this.itemsRepo.create({
        orderId: order.id,
        serviceType: i.serviceType,
        description: i.description,
        partName: i.partName ?? null,
        partBrand: i.partBrand ?? null,
        price: i.price,
        quantity: i.quantity ?? 1,
      }),
    );
    await this.itemsRepo.save(items);

    return this.ordersRepo.findOne({
      where: { id: order.id },
      relations: { vehicle: true, items: true, user: true },
    });
  }

  async update(id: string, dto: UpdateServiceOrderDto) {
    const order = await this.ordersRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    const prevStatus = order.status;
    if (dto.status !== undefined) order.status = dto.status;
    if (dto.mileageAtService !== undefined)
      order.mileageAtService = dto.mileageAtService;
    if (dto.notes !== undefined) order.notes = dto.notes;
    if (dto.totalPrice !== undefined) order.totalPrice = dto.totalPrice;
    if (dto.serviceDate !== undefined)
      order.serviceDate = new Date(dto.serviceDate);

    const saved = await this.ordersRepo.save(order);

    if (
      prevStatus !== ServiceOrderStatuses[2] &&
      saved.status === ServiceOrderStatuses[2]
    ) {
      await this.createCompletionNotification(saved.id);
    }

    return this.ordersRepo.findOne({
      where: { id: saved.id },
      relations: { vehicle: true, items: true, user: true },
    });
  }

  private async createCompletionNotification(orderId: string) {
    const order = await this.ordersRepo.findOne({ where: { id: orderId } });
    if (!order) return;

    const vehicle = await this.vehiclesRepo.findOne({
      where: { id: order.vehicleId },
    });
    if (!vehicle) return;

    const tech = await this.techRepo.findOne({
      where: { vehicleId: vehicle.id },
    });
    const nextMileage =
      tech &&
      Number.isFinite(tech.oilChangeMileage) &&
      Number.isFinite(tech.oilNextChangeKm)
        ? tech.oilChangeMileage + tech.oilNextChangeKm
        : null;

    const current = vehicle.currentMileage ?? 0;
    const close = nextMileage !== null && nextMileage - current <= 500;
    const scheduledAt = close
      ? new Date(Date.now() + 24 * 60 * 60 * 1000)
      : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

    const message =
      nextMileage !== null
        ? `Order completed. Next oil change around ${nextMileage} km.`
        : 'Order completed. Next oil change reminder scheduled.';

    await this.notificationsRepo.save(
      this.notificationsRepo.create({
        userId: order.userId,
        vehicleId: order.vehicleId,
        type: 'oil_reminder',
        channel: 'email',
        message,
        isSent: false,
        scheduledAt,
      }),
    );
  }
}
