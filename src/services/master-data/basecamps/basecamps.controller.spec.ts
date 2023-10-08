import { Test, TestingModule } from '@nestjs/testing';
import { BasecampsController } from './basecamps.controller';
import { BasecampsService } from './basecamps.service';

describe('BasecampsController', () => {
  let controller: BasecampsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasecampsController],
      providers: [BasecampsService],
    }).compile();

    controller = module.get<BasecampsController>(BasecampsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
