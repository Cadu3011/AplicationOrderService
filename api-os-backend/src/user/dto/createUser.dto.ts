import { Role } from "@prisma/client";
import { IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";

export class CreateUsersDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsAlphanumeric()
    @IsNotEmpty()
    pasword: string;
    @IsString()
    @IsNotEmpty()
    roles: Role 
}