import { Injectable } from '@nestjs/common';
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';
import { UpdateOrdemServicoDto } from './dto/update-ordem-servico.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
 
@Injectable()
export class OrdemServicoService {
  constructor(private readonly Prisma: PrismaService) {}
  async create(data: Prisma.ServiceOrderCreateInput,produto?:Prisma.EstoqueCreateInput) {
    
    const serviceOrder = await this.Prisma.serviceOrder.create({
      data:{
        ...data,
      estoques: {
        create: 
           produto  // Quantidade do estoque 
      },
    }
    })
    return serviceOrder
  }
  async addProdutoOS(ordemServicoId:number,productId: number, quantity: number): Promise<void> {
    // Obter o produto e seu estoque
    const product = await this.Prisma.product.findUnique({
      where: { id: productId ,isActive:true},
       // Incluindo a relação de estoque
    });
    const ordemService = await this.Prisma.serviceOrder.findUnique({
      where:{id:ordemServicoId}
    })

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    // Atualizar a quantidade do produto no estoque
    await this.Prisma.product.update({
      where: { id: productId },
      data: {
        quantity: product.quantity - quantity, // Somar a quantidade ao estoque do produto
      },
    });
    // Atualizar o estoque (se necessário)
    await this.Prisma.estoque.create({
      data:{
        quantidade:quantity,
        produto:{
          connect:{id:productId}
        },
        ordensServico:{
          connect:{id:ordemServicoId}
        }

      }
    })
  }

  findAll() {
    return this.Prisma.serviceOrder.findMany({include:{operadores:true,estoques:{include:{produto:true}}}})
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
