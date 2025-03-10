import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    // temporarily use any to handle passwordConfirm
    const { email, password, passwordConfirm, ...restData } = data;

    // Validate if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) throw new BadRequestException('El usuario ya existe');

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and ClientData if role is CLIENT
    const user = await this.prisma.user.create({
      data: {
        ...restData,
        email,
        password: hashedPassword,
        ...(restData.role === 'CLIENT' && {
          clientData: {
            create: {}, // Creates associated ClientData
          },
        }),
      },
      include: {
        clientData: true,
        professionalData: true,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        clientData: true,
        professionalData: true,
      },
    });
  }

  async findAllClients() {
    return this.prisma.user.findMany({
      where: {
        role: 'CLIENT',
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        age: true,
        email: true,
        location: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        clientData: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            services: true,
          },
        },
      },
    });
  }
}
