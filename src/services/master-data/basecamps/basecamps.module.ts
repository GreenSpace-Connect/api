import { Module } from '@nestjs/common';
import { BasecampsService } from './basecamps.service';
import { BasecampsController } from './basecamps.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BasecampsController],
  providers: [BasecampsService],
  imports: [PrismaModule],
})
export class BasecampsModule {}
