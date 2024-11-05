import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Res, UseGuards ,ValidationPipe,NotFoundException, Req} from '@nestjs/common';
import { UserService } from './user.service';
import {Prisma ,User as UserModel}from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUsersDto } from './dto/createUser.dto';
import { UpdateUsersDto } from './dto/updateUser.dto';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @UseGuards(AuthGuard)
    @Post()
    async signupUser(@Body(new ValidationPipe())  createUsersDto: CreateUsersDto):Promise<UserModel>{
        return this.userService.createUser(createUsersDto)
    }
 
    @UseGuards(AuthGuard)
    @Get(':id')
    async getUser(@Param('id' ,new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number ,@Req() request: Request):Promise<Omit< UserModel , 'pasword'> |Object>{
        return this.userService.User({id})
    }
    
    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateUser(@Body(new ValidationPipe()) userData: UpdateUsersDto, @Param('id' ,new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number):Promise<UserModel>{
        return this.userService.updateUser({where: {id},data: userData})
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number):Promise<UserModel>{
            return this.userService.deleteUser({id})
        
    }
}
 