import { Test, TestingModule } from '@nestjs/testing';
import { TicketTransactionsService } from './ticket-transactions.service';

describe('TicketTransactionsService', () => {
  let service: TicketTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketTransactionsService],
    }).compile();

    service = module.get<TicketTransactionsService>(TicketTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
