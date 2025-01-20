import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadodomicilioController } from './empleadodomicilio.controller';

describe('EmpleadodomicilioController', () => {
  let controller: EmpleadodomicilioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpleadodomicilioController],
    }).compile();

    controller = module.get<EmpleadodomicilioController>(EmpleadodomicilioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
