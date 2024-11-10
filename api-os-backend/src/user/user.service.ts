import { Inject, Injectable ,NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
    @Inject()
    private readonly Prisma: PrismaService
    
  
     async User(UserWhereUniqueInput:Prisma.UserWhereUniqueInput):Promise<Omit< User,'pasword'>>{
        return this.Prisma.user.findUnique({where:UserWhereUniqueInput, select:{id:true,name:true,pasword:false,roles:true,createdAt:true,updatedAt:true}})
     }
     async findAllUsers() {
      return this.Prisma.user.findMany({
        select: {
          id: true,
          name: true,
          roles: true,
        },
      });
    }
     async createUser (data: Prisma.UserCreateInput){
        const hashPassword = await bcrypt.hash(data.pasword,10)
        return this.Prisma.user.create({data:{...data, pasword: hashPassword}})
     }
     async updateUser(params:{ where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput}):Promise<User>{
         if (params.data.pasword) {
            params.data.pasword = await bcrypt.hash(params.data.pasword.toString(), 10);
         }
        const{where, data} = params 
        return this.Prisma.user.update({data , where})
     }
     async deleteUser(where:Prisma.UserWhereUniqueInput):Promise<User>{
            return this.Prisma.user.delete({where})
     }
     
    
}
