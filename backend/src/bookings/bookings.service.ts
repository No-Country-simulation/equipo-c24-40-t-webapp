import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        userId: createBookingDto.userId,
        serviceId: createBookingDto.serviceId,
        status: 'PENDING',
        date: new Date(createBookingDto.date),
      },
    });
  }

  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        // user: true,
        service: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: {
        // user: true,
        service: true,
      },
    });
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    return this.prisma.booking.update({
      where: { id },
      data: {
        status: updateBookingDto.status,
        date: updateBookingDto.date
          ? new Date(updateBookingDto.date)
          : undefined,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
