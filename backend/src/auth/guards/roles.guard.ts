/* import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = UserRole.PROFESSIONAL;
    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    return user?.role === requiredRole;
  }
} */
