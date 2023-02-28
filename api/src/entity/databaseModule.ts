import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../configuration/validation';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        namingStrategy: new SnakeNamingStrategy(),
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get('DB_SYNC'),
        entities: [`dist/src/entity/**/*.entity.{ts,js}`],
        logging: configService.get('DB_LOGGING'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
