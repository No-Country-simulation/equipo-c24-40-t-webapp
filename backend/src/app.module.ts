import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { PrismaService } from './prisma/prisma.service';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [ServicesModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
