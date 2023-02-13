import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ClientUserModule } from './client/user.module';
import { RedisCacheModule } from '@src/utils/redisCache/redisCache.module';

@Module({
  imports: [
    ClientUserModule,
    RouterModule.register([
      {
        path: '/client',
        module: ClientUserModule,
      },
    ]),
  ],
  providers: [],
  exports: [],
})
export class UserModule {}
