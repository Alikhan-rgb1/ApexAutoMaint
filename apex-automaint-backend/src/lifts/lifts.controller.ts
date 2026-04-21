import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateLiftDto } from './dto/create-lift.dto';
import { UpdateLiftDto } from './dto/update-lift.dto';
import { LiftsService } from './lifts.service';

@Controller('lifts')
@UseGuards(JwtAuthGuard)
export class LiftsController {
  constructor(private readonly lifts: LiftsService) {}

  @Get()
  list() {
    return this.lifts.list();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreateLiftDto) {
    return this.lifts.create(dto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('mechanic', 'admin')
  update(@Param('id') id: string, @Body() dto: UpdateLiftDto) {
    return this.lifts.update(id, dto);
  }
}
