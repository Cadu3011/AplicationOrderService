import { IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";

export class CreateUsersDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsAlphanumeric()
    @IsNotEmpty()
    pasword: string;
    @IsString()
    acess_level:string
}