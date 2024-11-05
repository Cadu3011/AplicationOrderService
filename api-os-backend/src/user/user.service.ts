import { Inject, Injectable ,NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
    @Inject()
    private readonly Prisma: PrismaService
    
  
     async User(UserWhereUniqueInput:Prisma.UserWhereUniqueInput):Promise<Omit< User,'pasword'>>{
        return this.Prisma.user.findUnique({where:UserWhereUniqueInput, select:{id:true,name:true,pasword:false,createdAt:true,updatedAt:true}})
     }
     async createUser (data: Prisma.UserCreateInput){
        const hashPassword = await bcrypt.hash(data.pasword,10)
        return this.Prisma.user.create({data:{...data, pasword: hashPassword}})
     }
     async updateUser(params:{ where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput}):Promise<User>{
        const{where, data} = params 
        return this.Prisma.user.update({data , where})
     }
     async deleteUser(where:Prisma.UserWhereUniqueInput):Promise<User>{
            return this.Prisma.user.delete({where})
     }
    
}
