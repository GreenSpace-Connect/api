import { Test, TestingModule } from '@nestjs/testing';
import { TicketTransactionsController } from './ticket-transactions.controller';
import { TicketTransactionsService } from './ticket-transactions.service';

describe('TicketTransactionsController', () => {
  let controller: TicketTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketTransactionsController],
      providers: [TicketTransactionsService],
    }).compile();

    controller = module.get<TicketTransactionsController>(TicketTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
