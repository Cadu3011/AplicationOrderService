import { Test, TestingModule } from '@nestjs/testing';
import { OrdemServicoService } from './ordem-servico.service';

describe('OrdemServicoService', () => {
  let service: OrdemServicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdemServicoService],
    }).compile();

    service = module.get<OrdemServicoService>(OrdemServicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
