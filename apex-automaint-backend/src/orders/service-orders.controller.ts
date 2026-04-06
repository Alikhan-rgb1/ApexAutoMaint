import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import type { AuthUser } from '../auth/auth.types';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';
import { ServiceOrdersService } from './service-orders.service';

@Controller('service-orders')
@UseGuards(JwtAuthGuard)
export class ServiceOrdersController {
  constructor(private readonly service: ServiceOrdersService) {}

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.service.list(user);
  }

  @Get('vehicle/:vehicleId')
  listByVehicle(
    @Param('vehicleId') vehicleId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.service.listByVehicle(vehicleId, user);
  }

  @Get(':id')
  get(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.service.getById(id, user);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('mechanic', 'admin')
  create(@Body() dto: CreateServiceOrderDto, @CurrentUser() user: AuthUser) {
    return this.service.create(dto, user.sub);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('mechanic', 'admin')
  update(@Param('id') id: string, @Body() dto: UpdateServiceOrderDto) {
    return this.service.update(id, dto);
  }
}
