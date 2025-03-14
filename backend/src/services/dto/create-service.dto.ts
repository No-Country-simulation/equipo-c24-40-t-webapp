import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    example: 'Terapia Individual',
    description: 'Title of the service',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Sesión de terapia individual de 50 minutos',
    description: 'Detailed description of the service',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the service is featured',
  })
  @IsBoolean()
  @IsNotEmpty()
  featured: boolean;

  @ApiProperty({
    example: 5000,
    description: 'Price of the service',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'Psicología',
    description: 'Category of the service',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'ID of the professional providing the service',
  })
  @IsString()
  @IsNotEmpty()
  professionalId: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the service is currently available',
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  availability?: boolean;
}
