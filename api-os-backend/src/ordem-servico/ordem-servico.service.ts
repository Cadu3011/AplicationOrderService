import { Injectable } from '@nestjs/common';
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';
import { UpdateOrdemServicoDto } from './dto/update-ordem-servico.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrdemServicoService {
  constructor(private readonly Prisma: PrismaService) {}
  create(data: Prisma.ServiceOrderCreateInput) {
    return this.Prisma.serviceOrder.create({data})
  }

  findAll() {
    return this.Prisma.serviceOrder.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} ordemServico`;
  }

  update(id: number, updateOrdemServicoDto: UpdateOrdemServicoDto) {
    return `This action updates a #${id} ordemServico`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordemServico`;
  }
}
