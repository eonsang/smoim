import { IsMimeType, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommonAttachmentDto {
  @ApiProperty({
    example: 'origin/aslkngjkofdnaoksn.png',
    description: 's3 파일 key',
  })
  @IsString()
  key: string;

  @ApiProperty({
    example: 'image/png',
    description: '저장된 파일 타입',
  })
  @IsMimeType()
  type: string;

  @ApiProperty({
    example: '파일 명',
    description: '파일 명',
  })
  @IsString()
  originalName: string;
}
