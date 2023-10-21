import { Test, TestingModule } from '@nestjs/testing';
import { DonationTransactionsService } from './donation-transactions.service';

describe('DonationTransactionsService', () => {
  let service: DonationTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonationTransactionsService],
    }).compile();

    service = module.get<DonationTransactionsService>(DonationTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
