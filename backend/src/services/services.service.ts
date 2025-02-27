import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prismaService: PrismaService) {}

  create(createServiceDto: CreateServiceDto) {
    return this.prismaService.service.create({
      data: createServiceDto,
    });
  }

  findAll() {
    return this.prismaService.service.findMany();
  }

  findOne(id: string) {
    return this.prismaService.service.findUnique({
      where: { id },
    });
  }

  update(id: string, updateServiceDto: UpdateServiceDto) {
    return this.prismaService.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  remove(id: string) {
    return this.prismaService.service.delete({
      where: { id },
    });
  }
}
