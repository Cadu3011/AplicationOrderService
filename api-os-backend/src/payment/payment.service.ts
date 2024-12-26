import { Injectable } from '@nestjs/common';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePaymentDto } from './dto/create-payment.dto';


@Injectable()
export class PaymentService {
  constructor(private readonly Prisma: PrismaService) {}
  
  async create(CreatePaymentDto: CreatePaymentDto) {
    const ordem = await this.Prisma.serviceOrder.findUnique({
      where: { id: CreatePaymentDto.ordemId },
    });

    // Se a ordem não existir, lança um erro
    if (!ordem) {
      throw new Error('Ordem não encontrada!');
    }
    return await this.Prisma.payment.create({
      data: {
        valor:CreatePaymentDto.valor,
        modalidade:CreatePaymentDto.modalidade,  // Referência à Ordem existente
        ordemServico: {
          connect: { id: CreatePaymentDto.ordemId},  // Conectar ao ServiceOrder existente com id 1
        },
      },
     })
  }

  findAll() {
    return this.Prisma.payment.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
