import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate,
      envFilePath: `${__dirname}/../../env/.env.${process.env.NODE_ENV}`,
    }),
  ],
})
export class ConfigurationModule {}
