import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
  private readonly client: Redis;
  constructor(private readonly redisService: RedisService) {
    this.client = redisService.getClient();
  }

  //
}
