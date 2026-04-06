import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import type { AuthUser } from '../auth/auth.types';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleTechDataDto } from './dto/update-vehicle-tech-data.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleTechData } from './vehicle-tech-data.entity.js';
import { Vehicle } from './vehicle.entity.js';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
@UseGuards(JwtAuthGuard)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  list(@CurrentUser() user: AuthUser): Promise<Vehicle[]> {
    return this.vehiclesService.listForUser(user);
  }

  @Get('by-user/:userId')
  @UseGuards(RolesGuard)
  @Roles('mechanic', 'admin')
  listByUser(
    @Param('userId') userId: string,
    @Query('onlyWithoutOrders') onlyWithoutOrders: string | undefined,
  ): Promise<Vehicle[]> {
    return this.vehiclesService.listForOwner(
      userId,
      onlyWithoutOrders === 'true',
    );
  }

  @Get(':id')
  get(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
  ): Promise<Vehicle> {
    return this.vehiclesService.getByIdForUser(id, user);
  }

  @Post()
  create(
    @Body() dto: CreateVehicleDto,
    @CurrentUser() user: AuthUser,
  ): Promise<Vehicle> {
    return this.vehiclesService.createForUser(dto, user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateVehicleDto,
    @CurrentUser() user: AuthUser,
  ): Promise<Vehicle> {
    return this.vehiclesService.updateForUser(id, dto, user);
  }

  @Get(':id/tech-data')
  techData(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
  ): Promise<VehicleTechData | null> {
    return this.vehiclesService.getTechData(id, user);
  }

  @Put(':id/tech-data')
  @UseGuards(RolesGuard)
  @Roles('mechanic', 'admin')
  async updateTechData(
    @Param('id') id: string,
    @Body() dto: UpdateVehicleTechDataDto,
    @CurrentUser() user: AuthUser,
  ): Promise<VehicleTechData> {
    await this.vehiclesService.getByIdForUser(id, user);
    return this.vehiclesService.upsertTechData(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
  ): Promise<{ ok: true }> {
    return this.vehiclesService.deleteForUser(id, user);
  }
}
