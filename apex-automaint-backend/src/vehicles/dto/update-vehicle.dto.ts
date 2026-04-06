import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear() + 1)
  year?: number;

  @IsOptional()
  @IsString()
  vin?: string | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  currentMileage?: number;
}
