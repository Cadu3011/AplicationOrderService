import { Module } from '@nestjs/common';
import { OrdemServicoService } from './ordem-servico.service';
import { OrdemServicoController } from './ordem-servico.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [OrdemServicoController],
  providers: [OrdemServicoService],
})
export class OrdemServicoModule {}
