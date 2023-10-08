import { Test, TestingModule } from '@nestjs/testing';
import { BasecampsService } from './basecamps.service';

describe('BasecampsService', () => {
  let service: BasecampsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasecampsService],
    }).compile();

    service = module.get<BasecampsService>(BasecampsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
