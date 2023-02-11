import { Column, Entity, Index } from 'typeorm';
import { CommonEntity } from '@src/entity/commonEntity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MaxLength } from 'class-validator';
import { convert, LocalDateTime } from '@js-joda/core';
import { LocalDateTimeTransformer } from '@src/entity/transfomer/localDateTimeTransformer';
import { Transform } from 'class-transformer';

export enum UserProviderEnum {
  google = 'google',
}

@Index(['email'])
@Index(['providerId', 'provider'])
@Entity({ name: 'user' })
export class UserEntity extends CommonEntity {
  @ApiProperty({
    example: '홍길동',
    description: '닉네임',
  })
  @MaxLength(50)
  @IsString()
  @Column({ length: 50, nullable: false, unique: true })
  nickname: string;

  @ApiProperty({
    example: 'hongildong@gmail.com',
    description: '이메일',
  })
  @IsEmail()
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    example: 'google',
    description: '가입한 SNS',
  })
  @IsEnum(UserProviderEnum)
  @Column({
    type: 'enum',
    enum: UserProviderEnum,
    nullable: false,
  })
  provider: UserProviderEnum;

  @ApiProperty({
    example: 'asdgawegsdg',
    description: '가입한 SNS pk',
  })
  @IsString()
  @Column({
    unique: true,
    nullable: false,
  })
  providerId: string;

  @IsString()
  @Column({
    length: 32,
    type: 'char',
  })
  sessionId: string;

  @Column({ type: 'timestamp', transformer: new LocalDateTimeTransformer() })
  @Transform(({ value }) => convert(value).toDate())
  lastLogin: LocalDateTime;
}
