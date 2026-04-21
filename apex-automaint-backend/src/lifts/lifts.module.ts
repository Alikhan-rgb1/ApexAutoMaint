import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuardsModule } from '../auth/auth-guards.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { Notification } from '../notifications/notification.entity.js';
import { Vehicle } from '../vehicles/vehicle.entity.js';
import { Lift } from './lift.entity.js';
import { LiftsController } from './lifts.controller';
import { LiftsService } from './lifts.service';

@Module({
  imports: [
    AuthGuardsModule,
    VehiclesModule,
    TypeOrmModule.forFeature([Lift, Vehicle, Notification]),
  ],
  controllers: [LiftsController],
  providers: [LiftsService],
})
export class LiftsModule {}
