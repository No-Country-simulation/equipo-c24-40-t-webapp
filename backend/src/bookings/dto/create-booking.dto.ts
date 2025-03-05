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
  professionalId: string;

  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @IsEnum(BookingStatus, { message: 'Status must be a valid BookingStatus' })
  @IsOptional()
  status?: BookingStatus;

  @IsDateString({}, { message: 'Invalid date format, must be ISO8601' })
  @IsNotEmpty()
  date: string; // Fecha en formato ISO
}
