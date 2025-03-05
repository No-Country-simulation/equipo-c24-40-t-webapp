import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class ProfessionalsService {
  constructor(private prisma: PrismaService) {}

  async create(createProfessionalDto: CreateProfessionalDto) {
    // Verificar si el user existe
    const user = await this.prisma.user.findUnique({
      where: { id: createProfessionalDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `user con ID ${createProfessionalDto.userId} no encontrado`,
      );
    }

    // Verificar si el user ya tiene un perfil profesional
    const existingProfesional = await this.prisma.professional.findUnique({
      where: { userId: createProfessionalDto.userId },
    });

    if (existingProfesional) {
      throw new BadRequestException('Este user ya tiene un perfil profesional');
    }

    // Actualizar el rol del user a profesional
    await this.prisma.user.update({
      where: { id: createProfessionalDto.userId },
      data: { role: UserRole.PROFESSIONAL },
    });

    // Crear el perfil profesional
    return this.prisma.professional.create({
      data: {
        userId: createProfessionalDto.userId,
        profession: createProfessionalDto.profession,
        education: createProfessionalDto.education,
        certified: createProfessionalDto.certified,
        experience: createProfessionalDto.experience || '',
        skills: createProfessionalDto.skills || [],
        rating: createProfessionalDto.rating,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            location: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.professional.findMany({
      select: {
        id: true,
        profession: true,
        education: true,
        certified: true,
        experience: true,
        skills: true,
        rating: true,
        user: {
          select: {
            id: true,
            name: true,
            lastname: true,
            age: true,
            email: true,
            location: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const professional = await this.prisma.professional.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            location: true,
          },
        },
      },
    });

    if (!professional) {
      throw new NotFoundException(`Profesional con ID ${id} no encontrado`);
    }

    return professional;
  }

  async findByUserId(userId: string) {
    const professional = await this.prisma.professional.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            location: true,
          },
        },
      },
    });

    if (!professional) {
      throw new NotFoundException(
        `Profesional con user ID ${userId} no encontrado`,
      );
    }

    return professional;
  }

  async update(id: string, updateProfessionalDto: UpdateProfessionalDto) {
    // Verificar si el profesional existe
    await this.findOne(id);

    // Actualizar el profesional
    return this.prisma.professional.update({
      where: { id },
      data: updateProfessionalDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            location: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    // Verificar si el profesional existe
    const profesional = await this.findOne(id);

    // Eliminar el profesional
    await this.prisma.professional.delete({
      where: { id },
    });

    // Cambiar el rol del user a "user" si es necesario
    await this.prisma.user.update({
      where: { id: profesional.userId },
      data: { role: UserRole.USER },
    });

    return { message: 'Profesional eliminado correctamente' };
  }
}
