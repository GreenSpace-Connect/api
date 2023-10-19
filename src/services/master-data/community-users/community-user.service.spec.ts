import { Test, TestingModule } from '@nestjs/testing';
import { CommunityUserService } from './community-user.service';

describe('CommunityUserService', () => {
  let service: CommunityUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityUserService],
    }).compile();

    service = module.get<CommunityUserService>(CommunityUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
