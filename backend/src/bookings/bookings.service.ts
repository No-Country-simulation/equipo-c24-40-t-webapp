import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    // Validar usuario
    const user = await this.prisma.user.findUnique({
      where: { id: createBookingDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createBookingDto.userId} not found`,
      );
    }
    // Validar si el servicio existe
    const service = await this.prisma.service.findUnique({
      where: { id: createBookingDto.serviceId },
    });
    if (!service) {
      throw new NotFoundException(
        `Service with ID ${createBookingDto.serviceId} not found`,
      );
    }
    const exxistingBooking = await this.prisma.booking.findFirst({
      where: {
        userId: createBookingDto.userId,
        serviceId: createBookingDto.serviceId,
        date: new Date(createBookingDto.date),
      },
    });
    if (exxistingBooking) {
      throw new BadRequestException(
        'User already has a booking for this service on this date',
      );
    }

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
        service: true,
        User: { select: { id: true, name: true } },
      },
    });
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
        User: { select: { id: true, name: true } },
      },
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    // Validar si el estado es válido y permitir solo cambios adecuados
    const validStatusChanges: Record<BookingStatus, BookingStatus[]> = {
      PENDING: ['ACCEPTED', 'REJECTED', 'CANCELLED'],
      ACCEPTED: ['CANCELLED'],
      REJECTED: [],
      CANCELLED: ['PENDING', 'ACCEPTED'],
    };

    if (
      updateBookingDto.status &&
      !validStatusChanges[booking.status].includes(updateBookingDto.status)
    ) {
      throw new BadRequestException(
        `Cannot change status from ${booking.status} to ${updateBookingDto.status}`,
      );
    }

    return await this.prisma.booking.update({
      where: { id },
      data: updateBookingDto,
    });
  }

  async remove(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return await this.prisma.booking.delete({
      where: { id },
    });
  }
}
