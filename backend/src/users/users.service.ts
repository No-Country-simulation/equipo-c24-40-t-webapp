// src/usuarios/usuario.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/index';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // Verificar si el email ya está registrado
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new BadRequestException('El email ya está en uso');
      }

      // Validar longitud de la contraseña
      if (createUserDto.password.length < 8) {
        throw new BadRequestException(
          'La contraseña debe tener al menos 8 caracteres',
        );
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Crear usuario en la base de datos
      return this.prisma.$transaction(async (tx) => {
        return tx.user.create({
          data: {
            ...createUserDto,
            name: createUserDto.name,
            lastname: createUserDto.lastname,
            age: createUserDto.age,
            email: createUserDto.email,
            location: createUserDto.location ?? '',
            password: hashedPassword,
          },
        });
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el usuario`);
    }
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastname: true,
        age: true,
        email: true,
        role: true,
        location: true,
      },
    });
  }

  async findOne(id: string) {
    const usuario = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        lastname: true,
        age: true,
        email: true,
        role: true,
        location: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Verificar si el usuario existe
    await this.findOne(id);

    // Si hay una contraseña en el DTO, la hasheamos
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Actualizar el usuario
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        location: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    // Verificar si el usuario existe
    await this.findOne(id);

    // Eliminar el usuario
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
