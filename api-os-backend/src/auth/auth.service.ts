import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
    @Inject()
    private readonly prisma: PrismaService

    @Inject() 
    private readonly jtwService:JwtService
  
    async signin(params:Prisma.UserCreateManyInput):Promise<{access_token:String}>{ 
        const user = await this.prisma.user.findFirstOrThrow({where:{name:params.name ,id:params.id,roles:params.roles}})
        if(!user)throw new NotFoundException("user not found")
        const passwordMatch = await bcrypt.compare(params.pasword, user.pasword)
        if(!passwordMatch) throw new UnauthorizedException("Invalid credentials")
        const payload = { sub: user.id ,roles:user.roles}
        return { access_token: await this.jtwService.signAsync(payload) }
    }
}
