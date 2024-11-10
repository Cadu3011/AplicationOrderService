import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdemServicoService } from './ordem-servico.service';
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';
import { UpdateOrdemServicoDto } from './dto/update-ordem-servico.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Controller('ordem-servico')
export class OrdemServicoController {
  constructor(private readonly ordemServicoService: OrdemServicoService) {}
  @Post()
  async create(@Body() createOrdemServicoDto: CreateOrdemServicoDto,product:Prisma.EstoqueCreateInput) {
    
    return this.ordemServicoService.create(createOrdemServicoDto,product)
  }
  @Post(':OSId/produtos/:produtoId')
  async addProdutcOS(@Param('OSId') ordemServiceId:number ,@Param('produtoId') produtoId:number , @Body('quantidade') quantidade:number) {
    
    return this.ordemServicoService.addProdutoOS(+ordemServiceId,+produtoId,+quantidade)
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
