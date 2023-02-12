import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from '@src/entity/user/user.entity';
import { IsString } from 'class-validator';

export class SignUpRequestDto extends PickType(UserEntity, [
  'provider',
  'nickname',
] as const) {
  @ApiProperty({
    example: 'token',
    description: '인증 토큰',
  })
  @IsString()
  token: string;
}
