import { Test, TestingModule } from '@nestjs/testing';
import { ConfiguracionesController } from './configuraciones.controller';

describe('ConfiguracionesController', () => {
  let controller: ConfiguracionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfiguracionesController],
    }).compile();

    controller = module.get<ConfiguracionesController>(ConfiguracionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
