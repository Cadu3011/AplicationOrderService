import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Res, UseGuards ,ValidationPipe,NotFoundException, Req} from '@nestjs/common';
import { UserService } from './user.service';
import {Prisma ,Role,User as UserModel}from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUsersDto } from './dto/createUser.dto';
import { UpdateUsersDto } from './dto/updateUser.dto';
import { Roles } from 'src/auth/roles.decorator';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
   
    @Post()
    async signupUser(@Body(new ValidationPipe())  createUsersDto: CreateUsersDto):Promise<UserModel>{
        return this.userService.createUser(createUsersDto)
    }
    @Get(':id')
    async getUser(@Param('id' ,new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number ,@Req() request: Request):Promise<Omit< UserModel , 'pasword'> |Object>{
        return this.userService.User({id})
    }
    
    @Get()
    async getAllUsers(){
        return this.userService.findAllUsers()
    }
    @Get(':nome')
    async filterUser(@Param('nome') nome: string){
        return this.userService.filterUserByName(nome)
    }
   
    @Patch(':id')
    async updateUser(@Body(new ValidationPipe()) userData: UpdateUsersDto, @Param('id' ,new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number):Promise<UserModel>{
        return this.userService.updateUser({where: {id},data: userData})
    }
    
    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    async deleteUser(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number):Promise<UserModel>{
            return this.userService.deleteUser({id})
        
    }
}
 