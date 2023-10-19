import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
  imports: [PrismaModule],
})
export class ComplaintsModule {}
