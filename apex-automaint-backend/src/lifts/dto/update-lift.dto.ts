import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class UpdateLiftDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  status?: string;

  @IsOptional()
  @IsUUID()
  vehicleId?: string | null;

  @IsOptional()
  @IsString()
  workTime?: string | null;

  @IsOptional()
  @IsString()
  workType?: string | null;

  @IsOptional()
  @IsString()
  notes?: string | null;

  @IsOptional()
  @IsString()
  mechanic?: string | null;
}
