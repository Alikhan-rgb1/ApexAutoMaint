import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuardsModule } from '../auth/auth-guards.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { Lift } from './lift.entity.js';
import { LiftsController } from './lifts.controller';
import { LiftsService } from './lifts.service';

@Module({
  imports: [AuthGuardsModule, VehiclesModule, TypeOrmModule.forFeature([Lift])],
  controllers: [LiftsController],
  providers: [LiftsService],
})
export class LiftsModule {}
