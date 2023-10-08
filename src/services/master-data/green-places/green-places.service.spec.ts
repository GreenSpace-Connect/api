import { Test, TestingModule } from '@nestjs/testing';
import { GreenPlacesService } from './green-places.service';

describe('GreenPlacesService', () => {
  let service: GreenPlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GreenPlacesService],
    }).compile();

    service = module.get<GreenPlacesService>(GreenPlacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
