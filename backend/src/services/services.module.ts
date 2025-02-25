import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [ServicesController],
  providers: [ServicesService, PrismaService],
})
export class ServicesModule {}
