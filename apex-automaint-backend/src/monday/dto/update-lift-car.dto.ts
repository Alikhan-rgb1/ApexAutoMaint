import { IsOptional, IsUUID } from 'class-validator';

export class UpdateLiftCarDto {
  @IsOptional()
  @IsUUID()
  vehicleId?: string | null;
}
