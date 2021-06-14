import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });

  app.use(compression())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(helmet())
  app.enableCors()

  await app.listen(3000);
}
bootstrap();
