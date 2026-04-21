import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateLiftDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @MinLength(1)
  group!: string;

  @IsOptional()
  @IsString()
  status?: string;
}
