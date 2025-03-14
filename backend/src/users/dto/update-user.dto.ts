import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  ValidateIf,
  IsEnum,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del usuario',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({
    example: 30,
    description: 'Edad del usuario',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({
    example: 'Buenos Aires',
    description: 'Ubicación del usuario',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    enum: UserRole,
    description: 'Rol del usuario',
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    example: 'Psicólogo',
    description: 'Profesión (solo para profesionales)',
    required: false,
  })
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.professional)
  @IsOptional()
  @IsString()
  profession?: string;

  @ApiProperty({
    example: 'Universidad de Buenos Aires',
    description: 'Educación del profesional',
    required: false,
  })
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.professional)
  @IsOptional()
  @IsString()
  education?: string;

  @ApiProperty({
    example: 'Licenciatura en Psicología',
    description: 'Certificaciones del profesional',
    required: false,
  })
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.professional)
  @IsOptional()
  @IsString()
  certified?: string;

  @ApiProperty({
    example: '5 años en terapia',
    description: 'Experiencia del profesional',
    required: false,
  })
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.professional)
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiProperty({
    example: ['Terapia individual', 'Ansiedad'],
    description: 'Habilidades del profesional',
    required: false,
    isArray: true,
  })
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.professional)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiProperty({
    example: 4.5,
    description: 'Calificación del profesional',
    required: false,
  })
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.professional)
  @IsOptional()
  @IsNumber()
  rating?: number;
}
