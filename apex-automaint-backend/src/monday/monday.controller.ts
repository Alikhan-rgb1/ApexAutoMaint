import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthUser } from '../auth/auth.types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { VehiclesService } from '../vehicles/vehicles.service';
import { MondayService } from './monday.service';
import { UpdateLiftCarDto } from './dto/update-lift-car.dto';
import { UpdateLiftStatusDto } from './dto/update-lift-status.dto';

@Controller('monday')
@UseGuards(JwtAuthGuard)
export class MondayController {
  constructor(
    private readonly monday: MondayService,
    private readonly config: ConfigService,
    private readonly vehicles: VehiclesService,
  ) {}

  @Get('boards')
  @UseGuards(RolesGuard)
  @Roles('admin')
  listBoards() {
    return this.monday.listBoards();
  }

  @Get('lifts')
  async listLifts() {
    const boardIdRaw = this.config.get<string>('MONDAY_LIFTS_BOARD_ID');
    if (!boardIdRaw || !/^\d+$/.test(boardIdRaw)) {
      throw new BadRequestException('MONDAY_LIFTS_BOARD_ID is not configured');
    }
    return this.monday.listBoardItems(boardIdRaw);
  }

  @Put('lifts/:itemId/status')
  @UseGuards(RolesGuard)
  @Roles('mechanic', 'admin')
  async setLiftStatus(
    @Param('itemId') itemId: string,
    @Body() dto: UpdateLiftStatusDto,
  ) {
    const boardIdRaw = this.config.get<string>('MONDAY_LIFTS_BOARD_ID');
    const boardId = boardIdRaw ? Number(boardIdRaw) : NaN;
    if (!boardIdRaw || Number.isNaN(boardId)) {
      throw new BadRequestException('MONDAY_LIFTS_BOARD_ID is not configured');
    }
    const columnId =
      this.config.get<string>('MONDAY_LIFTS_STATUS_COLUMN_ID') ?? 'status';
    return this.monday.setItemStatus(boardId, itemId, columnId, dto.status);
  }

  @Put('lifts/:itemId/car')
  @UseGuards(RolesGuard)
  @Roles('mechanic', 'admin')
  async setLiftCar(
    @Param('itemId') itemId: string,
    @Body() dto: UpdateLiftCarDto,
    @CurrentUser() user: AuthUser,
  ) {
    const boardIdRaw = this.config.get<string>('MONDAY_LIFTS_BOARD_ID');
    const boardId = boardIdRaw ? Number(boardIdRaw) : NaN;
    if (!boardIdRaw || Number.isNaN(boardId)) {
      throw new BadRequestException('MONDAY_LIFTS_BOARD_ID is not configured');
    }

    const columnId =
      this.config.get<string>('MONDAY_LIFTS_CAR_COLUMN_ID') ?? 'text_mm2ctfz4';

    const vehicleId = (dto.vehicleId ?? '').toString().trim();
    let value = '';
    if (vehicleId) {
      const v = await this.vehicles.getByIdForUser(vehicleId, user);
      value = `${v.make} ${v.model} (${v.year})`;
    }

    return this.monday.setItemColumnValue(boardId, itemId, columnId, value);
  }
}
