import { Test, TestingModule } from '@nestjs/testing';
import { OrdemServicoController } from './ordem-servico.controller';
import { OrdemServicoService } from './ordem-servico.service';

describe('OrdemServicoController', () => {
  let controller: OrdemServicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdemServicoController],
      providers: [OrdemServicoService],
    }).compile();

    controller = module.get<OrdemServicoController>(OrdemServicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
