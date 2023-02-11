import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from '@src/entity/user/user.entity';
import { IsString } from 'class-validator';

export class UpdateMyInfoRequestDto extends PickType(UserEntity, [
  'nickname',
] as const) {}
