import { Module } from '@nestjs/common';

import { AuthGuardsModule } from '../auth/auth-guards.module';
import { MondayController } from './monday.controller';
import { MondayService } from './monday.service';

@Module({
  imports: [AuthGuardsModule],
  controllers: [MondayController],
  providers: [MondayService],
})
export class MondayModule {}
