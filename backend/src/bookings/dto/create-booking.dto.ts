import { BookingStatus } from '@prisma/client';
import {
  IsString,
  IsDateString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @IsEnum(BookingStatus)
  @IsOptional()
  status?: BookingStatus;

  @IsDateString()
  @IsNotEmpty()
  date: string; // Fecha en formato ISO
}
