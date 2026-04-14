import { IsString, MinLength } from 'class-validator';

export class UpdateLiftStatusDto {
  @IsString()
  @MinLength(1)
  status!: string;
}
