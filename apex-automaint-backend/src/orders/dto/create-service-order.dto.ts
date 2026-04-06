import {
  IsArray,
  IsDateString,
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsString()
  serviceType!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  partName?: string;

  @IsOptional()
  @IsString()
  partBrand?: string;

  @IsDecimal()
  price!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;
}

export class CreateServiceOrderDto {
  @IsUUID()
  userId!: string;

  @IsUUID()
  vehicleId!: string;

  @IsInt()
  @Min(0)
  mileageAtService!: number;

  @IsString()
  notes!: string;

  @IsDecimal()
  totalPrice!: string;

  @IsDateString()
  serviceDate!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}
