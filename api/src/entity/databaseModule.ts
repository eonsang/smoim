import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../configuration/validation';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get('DB_SYNC'),
        entities: [`${__dirname}/../../dist/entity/**/*.entity.{ts,js}`],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
