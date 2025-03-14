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
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ example: 30, description: 'User age' })
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    example: 'john.doe@email.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'User password - minimum 6 characters',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'Buenos Aires',
    description: 'User location',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    enum: UserRole,
    example: 'CLIENT',
    description: 'User role - CLIENT or PROFESSIONAL',
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    example: 'Psicólogo',
    description: 'Professional occupation (required if role is PROFESSIONAL)',
    required: false,
  })
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.PROFESSIONAL)
  @IsString()
  @IsNotEmpty()
  profession: string;

  @ApiProperty({
    example: 'Universidad de Buenos Aires',
    description: 'Educational background',
    required: false,
  })
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.PROFESSIONAL)
  @IsString()
  @IsOptional()
  education?: string;

  @ApiProperty({
    example: 'Licenciatura en Psicología',
    description: 'Professional certifications',
    required: false,
  })
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.PROFESSIONAL)
  @IsString()
  @IsOptional()
  certified?: string;

  @ApiProperty({
    example: '5 años de experiencia en terapia',
    description: 'Professional experience',
    required: false,
  })
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.PROFESSIONAL)
  @IsString()
  @IsOptional()
  experience?: string;

  @ApiProperty({
    example: ['Terapia Individual', 'Mindfulness'],
    description: 'Professional skills',
    required: false,
    isArray: true,
  })
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.PROFESSIONAL)
  @IsArray()
  @IsOptional()
  skills: string[];

  @ApiProperty({
    example: 4.5,
    description: 'Professional rating',
    required: false,
    minimum: 0,
    maximum: 5,
  })
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.PROFESSIONAL)
  @IsNumber()
  @IsOptional()
  rating?: number;
}
