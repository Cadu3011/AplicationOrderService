import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdemServicoService } from './ordem-servico.service';
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';
import { UpdateOrdemServicoDto } from './dto/update-ordem-servico.dto';

@Controller('ordem-servico')
export class OrdemServicoController {
  constructor(private readonly ordemServicoService: OrdemServicoService) {}

  @Post()
  create(@Body() createOrdemServicoDto: CreateOrdemServicoDto) {
    return this.ordemServicoService.create(createOrdemServicoDto);
  }

  @Get()
  findAll() {
    return this.ordemServicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordemServicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdemServicoDto: UpdateOrdemServicoDto) {
    return this.ordemServicoService.update(+id, updateOrdemServicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordemServicoService.remove(+id);
  }
}
