import { PickType } from '@nestjs/swagger';
import { UserEntity } from '@src/entity/user/user.entity';

export class CreateUserDto extends PickType(UserEntity, [
  'provider',
  'providerId',
  'email',
  'nickname',
] as const) {}
