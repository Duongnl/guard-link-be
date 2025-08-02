import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'; // npm i --save @nestjs/config
import { ValidationPipe } from '@nestjs/common'; // npm i --save class-validator class-transformer

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // lay bien moi truong trong .env
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  // khai bao de dung validate
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  app.setGlobalPrefix('api') // dat /api cho moi api
  await app.listen(port);
}
bootstrap();
