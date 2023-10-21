import { Test, TestingModule } from '@nestjs/testing';
import { DonationTransactionsController } from './donation-transactions.controller';
import { DonationTransactionsService } from './donation-transactions.service';

describe('DonationTransactionsController', () => {
  let controller: DonationTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonationTransactionsController],
      providers: [DonationTransactionsService],
    }).compile();

    controller = module.get<DonationTransactionsController>(DonationTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
