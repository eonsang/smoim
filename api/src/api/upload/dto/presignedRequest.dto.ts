import { IsMimeType, IsNumber, IsString, Max } from 'class-validator';
import * as mime from 'mime-types';
import { uid } from 'uid';
import { ApiProperty } from '@nestjs/swagger';

export const presignedMaxFileSize = 5 * 1000 ** 2; // 50m
export class PresignedRequestDto {
  @ApiProperty({
    example: 'image/png',
    description: '파일 타입',
  })
  @IsMimeType()
  type: string;

  @ApiProperty({
    example: 3200000,
    description: '파일 사이즈',
  })
  @IsNumber()
  @Max(presignedMaxFileSize)
  size: number;

  get fileKey(): string {
    const type = mime.extension(this.type);
    return `${uid(32)}.${type}`;
  }
}
