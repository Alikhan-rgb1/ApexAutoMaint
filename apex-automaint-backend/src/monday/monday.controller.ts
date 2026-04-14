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

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { MondayService } from './monday.service';
import { UpdateLiftStatusDto } from './dto/update-lift-status.dto';

@Controller('monday')
@UseGuards(JwtAuthGuard)
export class MondayController {
  constructor(
    private readonly monday: MondayService,
    private readonly config: ConfigService,
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
}
