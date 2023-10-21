import { Module } from '@nestjs/common';
import { TicketTransactionsService } from './ticket-transactions.service';
import { TicketTransactionsController } from './ticket-transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TicketTransactionsController],
  providers: [TicketTransactionsService],
  imports: [PrismaModule],
})
export class TicketTransactionsModule {}
