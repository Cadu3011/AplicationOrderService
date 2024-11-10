import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly Prisma: PrismaService) {}


  async create(
    data: Prisma.ProductCreateInput, 
    estoqueData: Prisma.EstoqueCreateInput
  ){
    const product = await this.Prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        quantity: data.quantity, // A quantidade do produto na tabela Product
        estoques: {
          create: 
             estoqueData  // Quantidade do estoque
          
        },
      },
    });
  
    return product;
  }
  async addStockToProduct(productId: number, quantityToAdd: number): Promise<void> {
    // Obter o produto e seu estoque
    const product = await this.Prisma.product.findUnique({
      where: { id: productId },
      include: { estoques: true }, // Incluindo a relação de estoque
    });

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    // Atualizar a quantidade do produto no estoque
    await this.Prisma.product.update({
      where: { id: productId },
      data: {
        quantity: product.quantity + quantityToAdd, // Somar a quantidade ao estoque do produto
      },
    });

    // Atualizar o estoque (se necessário)
    
      await this.Prisma.estoque.create({
        data: {
          quantidade: quantityToAdd,
          produto: {
            connect: { id: productId }, // Somar a quantidade no estoque
        },
      }
      })
  }

  findAll() {
    return this.Prisma.product.findMany();
  }
  findAllProductOS(nome: string) {
    return this.Prisma.product.findMany({where:{name:{contains:nome},isActive:true}});
  }
  findAllInStock(id : number) {
    return this.Prisma.estoque.findMany({where:{produtoId:id}})
  }
  findOne(id: Prisma.ProductWhereUniqueInput) {
    return this.Prisma.product.findUnique({where:id})
  }

  async update(params:{where: Prisma.ProductWhereUniqueInput, data: Prisma.ProductUpdateInput}) {
    const{where, data} = params
    const product = await this.findOne(where)

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    return this.Prisma.product.update({data,where})
  }
}
