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
        estoque: {
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
      include: { estoque: true }, // Incluindo a relação de estoque
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
    if (product.estoque) {
      await this.Prisma.estoque.update({
        where: { produtoId: productId },
        data: {
          quantidade: product.estoque.quantidade + quantityToAdd, // Somar a quantidade no estoque
        },
      });
    } else {
      // Caso o estoque não exista, cria um novo
      await this.Prisma.estoque.create({
        data: {
          produtoId: productId,
          quantidade: quantityToAdd,
        },
      });
    }
  }

  findAll() {
    return this.Prisma.product.findMany({ include: {
      estoque: true, // Incluir a tabela Estoque na consulta para pegar as informações do estoque
    },});
  }

  findOne(id: Prisma.ProductWhereUniqueInput) {
    return this.Prisma.product.findUnique({where:id})
  }

  update(params:{where: Prisma.ProductWhereUniqueInput, data: Prisma.ProductUpdateInput}) {
    const{where, data} = params
    return this.Prisma.product.update({data,where})
  }

  async remove(where: Prisma.ProductWhereUniqueInput) {
    const product = await this.Prisma.product.findUnique({ where });
  
  if (!product) {
    throw new Error('Product not found');
  }

  return this.Prisma.product.delete({ where });
  }
}
