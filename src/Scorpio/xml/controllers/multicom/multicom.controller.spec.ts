import { Test, TestingModule } from '@nestjs/testing';
import { MulticomController } from './multicom.controller';

describe('MulticomController', () => {
  let controller: MulticomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MulticomController],
    }).compile();

    controller = module.get<MulticomController>(MulticomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
