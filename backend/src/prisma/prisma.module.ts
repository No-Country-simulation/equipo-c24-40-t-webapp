import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Permite que este módulo esté disponible en toda la app sin necesidad de importarlo en cada módulo
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Hacemos que PrismaService esté disponible para otros módulos
})
export class PrismaModule {}
