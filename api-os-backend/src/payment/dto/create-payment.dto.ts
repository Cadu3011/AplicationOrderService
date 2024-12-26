import {Modality} from '@prisma/client'
export class CreatePaymentDto {
    valor: number
    modalidade: Modality
    ordemId: number
}
