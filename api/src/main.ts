import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import {
  TimeoutInterceptor,
  TransformResponseInterceptor,
} from '@src/interceptor';

let isDisableKeepAlive = false;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(compression());
  app.use(helmet());

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: process.env.NODE_ENV === 'production',
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException(
          errors.map((error) => {
            console.log(error);
            return {
              property: error.property,
              value: error.value,
              reason: error.constraints,
            };
          }),
        ),
    }),
  );

  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new TransformResponseInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  const apiDocPath = '/api/docs';
  app.use(
    [apiDocPath],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Smoim')
    .setDescription('smoim Api document')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(apiDocPath, app, document);

  const server = await app.listen(process.env.PORT, () => {
    if (process.send) {
      process.send('ready');
    }

    app.use(function (req, res, next) {
      if (isDisableKeepAlive) {
        res.set('Connection', 'close');
      }
      return next();
    });
  });

  process.on('SIGINT', function () {
    isDisableKeepAlive = true;
    server.close(function (err) {
      process.exit(err ? 1 : 0);
    });
  });
}

bootstrap();
