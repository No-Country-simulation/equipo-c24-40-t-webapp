import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: RegisterDto,
    description: 'Datos necesarios para registrar un usuario',
    examples: {
      ejemplo1: {
        value: {
          name: 'Juan Pérez',
          email: 'juan@email.com',
          password: '123456',
          role: 'CLIENT',
          location: 'Optional',
          profession: 'Optional',
          education: 'Optional',
          certified: 'Optional',
          experience: 'Optional',
          skills: ['Optional'],
          rating: 'Number is Optional',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: RegisterDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({
    type: LoginDto,
    description: 'Credenciales de inicio de sesión',
    examples: {
      ejemplo1: {
        value: {
          email: 'juan@email.com',
          password: '123456',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: LoginDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  profile() {
    return 'profile';
  }
}
