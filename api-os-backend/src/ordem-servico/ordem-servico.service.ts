import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
@Injectable()
export class OrdemServicoService {
  constructor(private readonly Prisma: PrismaService) {}

  async create(data: Prisma.ServiceOrderCreateInput, produto?: Prisma.EstoqueCreateInput) {
    const serviceOrder = await this.Prisma.serviceOrder.create({
      data: {
        ...data,
        estoques: produto ? { create: [produto] } : undefined 
      }
    });
    return serviceOrder;
  }

  async addProdutoOS(ordemServicoId: number, productId: number, quantity: number): Promise<void> {
    
    const product = await this.Prisma.product.findUnique({
      where: { id: productId, isActive: true },
    });
    
    const ordemService = await this.Prisma.serviceOrder.findUnique({
      where: { id: ordemServicoId },
      include: { estoques: true } 
    });
  
    if (!product) {
      throw new Error('Produto não encontrado');
    }
  
    if (!ordemService) {
      throw new Error('Ordem de serviço não encontrada');
    }
  
    await this.Prisma.product.update({
      where: { id: productId },
      data: {
        quantity: product.quantity - quantity, 
      },
    });
  
    await this.Prisma.estoque.create({
      data: {
        quantidade: quantity,
        produto: {
          connect: { id: productId }
        },
        ordensServico: {
          connect: { id: ordemServicoId }
        },
      }
    });
  }
  findAll() {
    return this.Prisma.serviceOrder.findMany({where:{payment:{ none: {}}},include:{operadores:true,estoques:{include:{produto:true}},payment:true}})
  }
  listOSAdm(){
    return this.Prisma.serviceOrder.findMany({include:{operadores:true,estoques:{include:{produto:true}},payment:true}})
  }
  findOne(id: number) {
    return this.Prisma.serviceOrder.findUnique({where:{id}})
  }
  filterOrderByname(nome:string){
    return this.Prisma.serviceOrder.findMany({where:{description:{contains:nome}}})
  }
  async update(params: { where: Prisma.ServiceOrderWhereUniqueInput, data: Prisma.ServiceOrderUpdateInput }) {
    const { where, data } = params;
    
    const ordemService = await this.Prisma.serviceOrder.findUnique({ where });
  
    if (!ordemService) {
      throw new Error('Ordem de serviço não encontrada');
    }
  
    const operadoresAtualizados = data.operadores ? {
      connect: data.operadores.connect || []
    } : undefined;
  
    const estoquesAtualizados = data.estoques ? {
      connect: data.estoques.connect || []
    } : undefined;
  
    return this.Prisma.serviceOrder.update({
      where,
      data: {
        ...data,
        operadores: operadoresAtualizados,
        estoques: estoquesAtualizados
      }
    });
  }
  

  
}
