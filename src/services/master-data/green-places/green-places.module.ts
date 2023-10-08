import { Module } from '@nestjs/common';
import { GreenPlacesService } from './green-places.service';
import { GreenPlacesController } from './green-places.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [GreenPlacesController],
  providers: [GreenPlacesService],
  imports: [PrismaModule],
})
export class GreenPlacesModule {}
