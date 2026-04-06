import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuardsModule } from '../auth/auth-guards.module';
import { VehicleTechData } from './vehicle-tech-data.entity.js';
import { Vehicle } from './vehicle.entity.js';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [
    AuthGuardsModule,
    TypeOrmModule.forFeature([Vehicle, VehicleTechData]),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule {}
