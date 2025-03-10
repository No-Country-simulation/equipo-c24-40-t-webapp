import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { RequestUser } from 'src/auth/interface/request-user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('clients')
  @UseGuards(JwtAuthGuard)
  async getAllClients() {
    return this.usersService.findAllClients();
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    const user = req.user as RequestUser;
    return this.usersService.findById(user.sub);
  }
}
