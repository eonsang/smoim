import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntityModule } from '@src/entity/user/user.modue';
import { VerifySnsTokenModule } from '@src/utils/verifySnsToken/verifySnsToken.module';
import { AuthTokenModule } from '@src/utils/authToken/authToken.module';
import { RedisCacheModule } from '@src/utils/redisCache/redisCache.module';

@Module({
  imports: [
    UserEntityModule,
    VerifySnsTokenModule,
    AuthTokenModule,
    RedisCacheModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class ClientUserModule {}
