import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { APP_PIPE } from '@nestjs/core';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, ProductModule],
  providers:[{ 
    provide: APP_PIPE , useClass: ValidationPipe}]
})
export class AppModule {}
