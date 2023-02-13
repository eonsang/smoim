import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigurationModule } from '@src/configuration/configuration.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@src/configuration/validation';
import { RedisCacheService } from '@src/utils/redisCache/redisCache.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService<EnvironmentVariables>) {
        return {
          errorLog: true,
          readyLog: true,
          config: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        };
      },
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
