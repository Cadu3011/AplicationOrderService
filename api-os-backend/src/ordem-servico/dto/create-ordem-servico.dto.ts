import {Status } from "@prisma/client"

export class CreateOrdemServicoDto {
    description: string
    status: Status
    operatorId:number
    
}
