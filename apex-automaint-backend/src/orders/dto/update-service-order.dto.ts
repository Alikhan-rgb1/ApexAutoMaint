import {
  IsDateString,
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { ServiceOrderStatuses } from '../service-order.entity';

export class UpdateServiceOrderDto {
  @IsOptional()
  @IsString()
  status?: (typeof ServiceOrderStatuses)[number];

  @IsOptional()
  @IsInt()
  @Min(0)
  mileageAtService?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDecimal()
  totalPrice?: string;

  @IsOptional()
  @IsDateString()
  serviceDate?: string;
}
