import { Module } from '@nestjs/common';
import { DonationTransactionsService } from './donation-transactions.service';
import { DonationTransactionsController } from './donation-transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DonationTransactionsController],
  providers: [DonationTransactionsService],
  imports: [PrismaModule],
})
export class DonationTransactionsModule {}
