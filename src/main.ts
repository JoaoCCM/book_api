import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Book API')
    .setDescription(`REST API for book's project`)
    .setVersion('1.0')
    .addTag('Book API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup('api-docs', app, document);

  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(helmet());
  app.enableCors();

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
