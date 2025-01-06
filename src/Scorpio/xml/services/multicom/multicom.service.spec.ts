import { Test, TestingModule } from '@nestjs/testing';
import { MulticomService } from './multicom.service';

describe('MulticomService', () => {
  let service: MulticomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MulticomService],
    }).compile();

    service = module.get<MulticomService>(MulticomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
