import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserEntity } from '@src/entity/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ type: UserEntity })
  @Type(() => UserEntity)
  user: UserEntity;

  @ApiProperty({
    example: 'access token...',
    description: 'accessToken',
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    example: 'refresh token...',
    description: 'refreshToken',
  })
  @IsString()
  refreshToken: string;
}
