import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    const {
      title,
      description,
      price,
      category,
      featured,
      availability,
      professionalId,
    } = createServiceDto;

    // Verificar si el profesional existe antes de crear el servicio
    const professional = await this.prismaService.professional.findUnique({
      where: { id: professionalId },
    });

    if (!professional) {
      throw new NotFoundException(
        `El profesional con ID ${professionalId} no existe.`,
      );
    }

    return this.prismaService.service.create({
      data: {
        title,
        description,
        price,
        category,
        featured,
        availability,
        professionalId,
      },
    });
  }

  findAll() {
    return this.prismaService.service.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        category: true,
        featured: true,
        availability: true,
        professional: {
          select: {
            experience: true,
            skills: true,
            rating: true,
            user: {
              select: {
                name: true,
                email: true,
                location: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const service = await this.prismaService.service.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        category: true,
        featured: true,
        availability: true,
        professionalId: true,
        // No incluimos createdAt ni updatedAt
        professional: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                location: true,
                // No incluimos password, createdAt ni updatedAt del usuario
              },
            },
          },
        },
      },
    });

    if (!service) {
      throw new NotFoundException(`El servicio con ID ${id} no existe.`);
    }

    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    // Verificar si el servicio existe
    const service = await this.prismaService.service.findUnique({
      where: { id },
    });
    if (!service) {
      throw new NotFoundException(`El servicio con ID ${id} no existe.`);
    }

    return this.prismaService.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  async remove(id: string) {
    // Verificar si el servicio existe
    const service = await this.prismaService.service.findUnique({
      where: { id },
    });
    if (!service) {
      throw new NotFoundException(`El servicio con ID ${id} no existe.`);
    }

    return this.prismaService.service.delete({ where: { id } });
  }
}
