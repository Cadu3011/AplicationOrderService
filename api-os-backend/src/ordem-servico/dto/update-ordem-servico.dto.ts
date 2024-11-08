import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdemServicoDto } from './create-ordem-servico.dto';

export class UpdateOrdemServicoDto extends PartialType(CreateOrdemServicoDto) {}
