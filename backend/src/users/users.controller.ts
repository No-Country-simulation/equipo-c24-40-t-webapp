/* import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { RequestUser } from 'src/auth/interface/request-user.interface';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('clients') // Change back to explicit 'clients' endpoint
  @UseGuards(JwtAuthGuard)
  async getAllClients() {
    return this.usersService.findAllClients();
  }

  @Get('profile') // Changed from POST to GET since it's retrieving data
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    const user = req.user as RequestUser;
    return this.usersService.findById(user.sub);
  }
}
 */
