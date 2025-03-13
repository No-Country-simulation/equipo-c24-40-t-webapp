import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  // Create user and ClientData if role is CLIENT
  async create(createUserDto: CreateUserDto, hashedPassword: string) {
    const {
      email,
      profession,
      certified,
      education,
      experience,
      skills,
      rating,
      ...restData
    } = createUserDto;

    const user = await this.prismaService.user.create({
      data: {
        ...restData,
        email,
        password: hashedPassword,
        ...(restData.role === 'CLIENT' && {
          clientData: {
            create: {},
          },
        }),
        ...(restData.role === 'PROFESSIONAL' && {
          professionalData: {
            create: {
              profession,
              education,
              certified,
              experience,
              skills,
              rating,
            },
          },
        }),
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }
}
