import { Test, TestingModule } from '@nestjs/testing';
import { CommunityUserController } from './community-user.controller';
import { CommunityUserService } from './community-user.service';

describe('CommunityUserController', () => {
  let controller: CommunityUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityUserController],
      providers: [CommunityUserService],
    }).compile();

    controller = module.get<CommunityUserController>(CommunityUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
