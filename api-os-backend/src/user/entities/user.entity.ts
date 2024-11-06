import { Role, User } from "@prisma/client";
export class Users implements User{
    name: string;
    id: number;
    roles: Role;
    pasword: string;
    createdAt: Date;
    updatedAt: Date;
}
