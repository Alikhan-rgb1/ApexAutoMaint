import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuardsModule } from '../auth/auth-guards.module';
import { Notification } from '../notifications/notification.entity';
import { VehicleTechData } from '../vehicles/vehicle-tech-data.entity.js';
import { Vehicle } from '../vehicles/vehicle.entity.js';
import { OrderItem } from './order-item.entity';
import { ServiceOrder } from './service-order.entity';
import { ServiceOrdersController } from './service-orders.controller';
import { ServiceOrdersService } from './service-orders.service';

@Module({
  imports: [
    AuthGuardsModule,
    TypeOrmModule.forFeature([
      ServiceOrder,
      OrderItem,
      Vehicle,
      VehicleTechData,
      Notification,
    ]),
  ],
  controllers: [ServiceOrdersController],
  providers: [ServiceOrdersService],
})
export class ServiceOrdersModule {}
