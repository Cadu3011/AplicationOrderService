import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly Prisma: PrismaService) {}


  async create(data: Prisma.ProductCreateInput) {
    
    return  this.Prisma.product.create({data}) 
  }

  findAll() {
    return this.Prisma.product.findMany();
  }

  findOne(id: Prisma.ProductWhereUniqueInput) {
    return this.Prisma.product.findUnique({where:id})
  }

  update(params:{where: Prisma.ProductWhereUniqueInput, data: Prisma.ProductUpdateInput}) {
    const{where, data} = params
    return this.Prisma.product.update({data,where})
  }

  remove(where: Prisma.ProductWhereUniqueInput) {
    return this.Prisma.product.delete({where})
  }
}
