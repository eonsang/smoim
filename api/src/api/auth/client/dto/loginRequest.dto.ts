import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from '@src/entity/user/user.entity';
import { IsString } from 'class-validator';

export class LoginRequestDto extends PickType(UserEntity, [
  'provider',
] as const) {
  @ApiProperty({
    example: 'token',
    description: '구글 토큰',
  })
  @IsString()
  token: string;
}
