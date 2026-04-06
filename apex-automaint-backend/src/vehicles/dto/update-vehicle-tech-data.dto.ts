import { IsInt, IsString, Min } from 'class-validator';

export class UpdateVehicleTechDataDto {
  @IsString()
  oilBrand!: string;

  @IsString()
  oilViscosity!: string;

  @IsInt()
  @Min(0)
  oilChangeMileage!: number;

  @IsInt()
  @Min(0)
  oilNextChangeKm!: number;

  @IsString()
  transmissionType!: string;

  @IsString()
  transmissionOil!: string;

  @IsInt()
  @Min(0)
  transmissionOilChangeMileage!: number;

  @IsString()
  tireSize!: string;

  @IsString()
  tireType!: string;

  @IsInt()
  @Min(0)
  brakePadFrontMm!: number;

  @IsInt()
  @Min(0)
  brakePadRearMm!: number;

  @IsString()
  airFilterBrand!: string;

  @IsString()
  cabinFilterBrand!: string;
}
