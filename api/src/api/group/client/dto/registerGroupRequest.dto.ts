import { LocalDate, LocalDateTime } from '@js-joda/core';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CommonAttachmentDto } from '@src/dtos/commonAttachment.dto';

export class RegisterGroupContentAttachmentDto extends CommonAttachmentDto {}

export class RegisterGroupChapterAttachmentDto extends CommonAttachmentDto {}

export class RegisterGroupChapterDto {
  @ApiProperty({
    example: '챕터 제목',
    description: '챕터 제목',
  })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    example: 1,
    description: '챕터 순서',
  })
  @IsNumber()
  order: number;

  @ApiProperty({
    example: '챕터 내용',
    description: '챕터 내용',
  })
  @IsString()
  information: string;

  @ApiProperty({
    example: '과제 내용',
    description: '챕터 과제',
  })
  @IsString()
  assignment: string;

  @ApiProperty({
    example: '2023-02-31T20:00:00',
    description: '스터디 진행 일시',
  })
  @Transform(({ value }) => {
    return LocalDateTime.parse(value);
  })
  date: LocalDateTime;

  @ApiProperty({ type: [RegisterGroupChapterAttachmentDto] })
  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => RegisterGroupChapterAttachmentDto)
  attachments: RegisterGroupChapterAttachmentDto[];
}

export class RegisterGroupRequestDto {
  @ApiProperty({
    example: '2023-02-01',
    description: '스터디 시작일',
  })
  @Transform(({ value }) => {
    return LocalDate.parse(value);
  })
  startDate: LocalDate;

  @ApiProperty({
    example: '2023-02-31',
    description: '스터디 종료일',
  })
  @Transform(({ value }) => {
    return LocalDate.parse(value);
  })
  endDate: LocalDate;

  @ApiProperty({
    example: 'html text...',
    description: '스터디 상세 내용',
  })
  @IsString()
  information: string;

  @ApiProperty({
    example: false,
    description: '승인 여부',
  })
  @IsBoolean()
  readonly isApproval: boolean = false;

  @ApiProperty({
    example: 10,
    description: '스터디 최대 인원',
  })
  @IsNumber()
  readonly maxUser: number = 10;

  @ApiProperty({
    example: 1,
    description: '스터디 최소 인원',
  })
  @IsNumber()
  readonly minUser: number = 1;

  @ApiProperty({
    example: true,
    description: '공개 스터디 여부',
  })
  @IsBoolean()
  readonly isOpened: boolean = true;

  @ApiProperty({
    example: 'html text...',
    description: '유의사항',
  })
  @IsString()
  notice: string;

  @ApiProperty({
    example: '부제목',
    description: '부제목',
  })
  @IsString()
  subTitle: string;

  @ApiProperty({
    example: '제목',
    description: '제목',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'presigned url 상세 키',
    description: 'presigned url key',
  })
  @IsString()
  thumbnail: string;

  @ApiProperty({ type: [RegisterGroupContentAttachmentDto] })
  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => RegisterGroupContentAttachmentDto)
  attachments: RegisterGroupContentAttachmentDto[];

  @ApiProperty({ type: [RegisterGroupChapterDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RegisterGroupChapterDto)
  chapters: RegisterGroupChapterDto[];
}
