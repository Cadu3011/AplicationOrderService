import { User } from "@prisma/client";
export class Users implements User{
    name: string;
    id: number;
    acess_level: string;
    pasword: string;
    createdAt: Date;
    updatedAt: Date;
}
