import { Column, Entity } from 'typeorm';
import { CommonEntity } from '@src/entity/commonEntity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MaxLength } from 'class-validator';

export enum UserProfileEnum {
  google = 'google',
}

@Entity({ name: 'user' })
export class UserEntity extends CommonEntity {
  @ApiProperty({
    example: '홍길동',
    description: '닉네임',
  })
  @MaxLength(50)
  @IsString()
  @Column({ length: 50 })
  nickname: string;

  @ApiProperty({
    example: 'hongildong@gmail.com',
    description: '이메일',
  })
  @IsEmail()
  @Column()
  email: string;

  @ApiProperty({
    example: 'GOOGLE',
    description: '가입한 SNS',
  })
  @IsEnum(UserProfileEnum)
  @Column({
    type: 'enum',
    enum: UserProfileEnum,
  })
  provider: UserProfileEnum;

  @ApiProperty({
    example: '123123123',
    description: '가입한 SNS pk',
  })
  @IsString()
  @Column()
  providerId: string;
}
