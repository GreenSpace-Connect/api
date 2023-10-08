import { Test, TestingModule } from '@nestjs/testing';
import { GreenPlacesController } from './green-places.controller';
import { GreenPlacesService } from './green-places.service';

describe('GreenPlacesController', () => {
  let controller: GreenPlacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreenPlacesController],
      providers: [GreenPlacesService],
    }).compile();

    controller = module.get<GreenPlacesController>(GreenPlacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
