import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  userId!: string;

  @IsUUID()
  vehicleId!: string;

  @IsString()
  type!: string;

  @IsString()
  channel!: string;

  @IsString()
  message!: string;

  @IsDateString()
  scheduledAt!: string;
}
