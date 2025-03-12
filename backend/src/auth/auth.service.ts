import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    // Validate if user exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) throw new BadRequestException('El usuario ya existe');

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const user = await this.usersService.create(registerDto, hashedPassword);
    return {
      user,
      message: 'Usuario creado con éxito',
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email no es correcto');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña no es correcta');
    }
    // Creamos un payload más completo con la información del usuario
    const payload = { name: user.name, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      name: user.name,
      email: user.email,
      token,
    };
  }

  async profile({ email }: { email: string; role: string }) {
    return await this.usersService.findByEmail(email);
  }
}
