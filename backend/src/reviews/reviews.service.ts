import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createReviewDto: CreateReviewDto) {
    return this.prismaService.review.create({
      data: createReviewDto,
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
