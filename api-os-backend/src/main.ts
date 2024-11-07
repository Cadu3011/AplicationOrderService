import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  // Ativar CORS
  app.enableCors({
    origin: '*', // Substitua pelo domínio de seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(3000);
}
bootstrap();
