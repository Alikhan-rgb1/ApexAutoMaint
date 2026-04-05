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
  carMake!: string;

  @IsString()
  carModel!: string;

  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear() + 1)
  carYear!: number;

  @IsString()
  @IsOptional()
  serviceType?: string;
}
