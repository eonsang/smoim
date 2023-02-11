import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(compression());
  app.use(helmet());

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: process.env.NODE_ENV === 'production',
      // exceptionFactory?: (errors: ValidationError[]) => any;
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Smoim')
    .setDescription('smoim Api document')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}

bootstrap();
