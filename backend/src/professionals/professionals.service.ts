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
    const {
      userId,
      profession,
      education,
      certified,
      experience,
      skills,
      rating,
    } = createProfessionalDto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);

    const existingProfessional = await this.prisma.professionalData.findUnique({
      where: { userId },
    });
    if (existingProfessional)
      throw new BadRequestException(
        'Este usuario ya tiene un perfil profesional',
      );

    await this.prisma.user.update({
      where: { id: userId },
      data: { role: UserRole.PROFESSIONAL },
    });

    return this.prisma.professionalData.create({
      data: {
        userId,
        profession,
        education,
        certified,
        experience: experience || '',
        skills: skills || [],
        rating,
      },
      include: {
        user: { select: { id: true, name: true, email: true, location: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.professionalData.findMany({
      include: {
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
    const professional = await this.prisma.professionalData.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, location: true } },
      },
    });
    if (!professional)
      throw new NotFoundException(`Profesional con ID ${id} no encontrado`);
    return professional;
  }

  async findByUserId(userId: string) {
    const professional = await this.prisma.professionalData.findUnique({
      where: { userId },
      include: {
        user: { select: { id: true, name: true, email: true, location: true } },
      },
    });
    if (!professional)
      throw new NotFoundException(
        `Profesional con user ID ${userId} no encontrado`,
      );
    return professional;
  }

  async update(id: string, updateProfessionalDto: UpdateProfessionalDto) {
    await this.findOne(id);
    return this.prisma.professionalData.update({
      where: { id },
      data: updateProfessionalDto,
      include: {
        user: { select: { id: true, name: true, email: true, location: true } },
      },
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    const professional = await this.findOne(id);
    await this.prisma.professionalData.delete({ where: { id } });
    await this.prisma.user.update({
      where: { id: professional.userId },
      data: { role: UserRole.CLIENT },
    });
    return { message: 'Profesional eliminado correctamente' };
  }
}
