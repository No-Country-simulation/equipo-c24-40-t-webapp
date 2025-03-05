import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    const {
      userId,
      bookingId,
      serviceId,
      professionalId,
      rating,
      comment,
      likes,
      response,
    } = createReviewDto;

    // Verificar si el usuario existe
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`El usuario con ID ${userId} no existe.`);
    }

    // Verificar si el servicio existe
    const service = await this.prismaService.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      throw new NotFoundException(`El servicio con ID ${serviceId} no existe.`);
    }

    // Validar que la calificación esté entre 1 y 5
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('La calificación debe estar entre 1 y 5.');
    }

    return this.prismaService.review.create({
      data: {
        bookingId,
        userId,
        serviceId,
        professionalId,
        rating,
        comment,
        likes,
        response,
      },
    });
  }

  findAll() {
    return this.prismaService.review.findMany();
  }

  findOne(id: string) {
    return this.prismaService.review.findUnique({
      where: { id },
    });
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.prismaService.review.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  remove(id: string) {
    return this.prismaService.review.delete({
      where: { id },
    });
  }
}
