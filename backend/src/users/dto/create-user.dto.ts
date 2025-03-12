import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsArray,
  MinLength,
  IsNumber,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(UserRole)
  role: UserRole;

  // Campos requeridos solo si role es PROFESSIONAL
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.PROFESSIONAL)
  @IsString()
  @IsNotEmpty()
  profession: string;

  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.PROFESSIONAL)
  @IsString()
  @IsOptional()
  education?: string;

  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.PROFESSIONAL)
  @IsString()
  @IsOptional()
  certified?: string;

  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.PROFESSIONAL)
  @IsString()
  @IsOptional()
  experience?: string;

  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.PROFESSIONAL)
  @IsArray()
  @IsOptional()
  skills: string[];

  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.PROFESSIONAL)
  @IsNumber()
  @IsOptional()
  rating?: number;
}
