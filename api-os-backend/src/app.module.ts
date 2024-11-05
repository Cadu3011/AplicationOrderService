import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { APP_PIPE } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, AdminModule],
  providers:[{ 
    provide: APP_PIPE , useClass: ValidationPipe}]
})
export class AppModule {}
