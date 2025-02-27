import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { IsOptional, IsDateString, IsEnum } from 'class-validator';
import { BookingStatus } from '@prisma/client';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @IsEnum(BookingStatus)
  @IsOptional()
  status?: BookingStatus;

  @IsDateString()
  @IsOptional()
  date?: string;
}
