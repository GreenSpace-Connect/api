import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CommunitiesController],
  providers: [CommunitiesService],
  imports: [PrismaModule],
})
export class CommunitiesModule {}
