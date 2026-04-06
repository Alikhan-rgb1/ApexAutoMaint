import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  make!: string;

  @IsString()
  model!: string;

  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear() + 1)
  year!: number;

  @IsOptional()
  @IsString()
  vin?: string;

  @IsInt()
  @Min(0)
  currentMileage!: number;
}
