import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntityModule } from '@src/entity/user/user.modue';

@Module({
  imports: [UserEntityModule],
  controllers: [UserController],
  providers: [UserService],
})
export class ClientUserModule {}
