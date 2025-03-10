import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsArray,
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
  password: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(UserRole)
  role: UserRole;

  // Datos opcionales para profesionales
  @IsString()
  @IsOptional()
  profession?: string;

  @IsString()
  @IsOptional()
  education?: string;

  @IsString()
  @IsOptional()
  certified?: string;

  @IsString()
  @IsOptional()
  experience?: string;

  @IsArray()
  @IsOptional()
  skills?: string[];
}
