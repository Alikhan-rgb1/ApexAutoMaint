import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  name!: string;

  @IsString()
  phone!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsOptional()
  carMake?: string;

  @IsString()
  @IsOptional()
  carModel?: string;

  @IsInt()
  @IsOptional()
  @Min(1980)
  @Max(new Date().getFullYear() + 1)
  carYear?: number;

  @IsString()
  @IsOptional()
  serviceType?: string;
}
