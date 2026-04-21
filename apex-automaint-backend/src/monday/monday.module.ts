import { Module } from '@nestjs/common';

import { AuthGuardsModule } from '../auth/auth-guards.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { MondayController } from './monday.controller';
import { MondayService } from './monday.service';

@Module({
  imports: [AuthGuardsModule, VehiclesModule],
  controllers: [MondayController],
  providers: [MondayService],
})
export class MondayModule {}
