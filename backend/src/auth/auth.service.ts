import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { password, passwordConfirm } = registerDto;

    if (password !== passwordConfirm) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const user = await this.usersService.create(registerDto);
    return this.login(user);
  }

  async validateUser(email: string, password: string) {
    // Buscar usuario en la base de datos
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    // Comparar contraseña encriptada
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException('Credenciales incorrectas');

    return user;
  }

  login(user: User) {
    // Creamos un payload más completo con la información del usuario
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      lastname: user.lastname,
      age: user.age,
      location: user.location,
      createdAt: user.createdAt,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        age: user.age,
        location: user.location,
      },
    };
  }
}
