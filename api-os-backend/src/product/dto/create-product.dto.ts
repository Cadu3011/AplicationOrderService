import { IsString } from "class-validator";

export class CreateProductDto {
    
    name: string;
    
    price: number;
    quantity: number; 
}
