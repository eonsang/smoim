import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CommonPagingDto {
  @ApiProperty({
    required: false,
    default: 1,
    example: 1,
    description: '페이지',
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  readonly page: number = 1;

  @ApiProperty({
    required: false,
    default: 20,
    example: 20,
    description: '조회 개수',
  })
  @IsNumber()
  @Min(10)
  @Max(50)
  @Type(() => Number)
  @IsOptional()
  readonly size: number = 20;

  get offset() {
    return (this.page - 1) * this.size;
  }

  get limit() {
    return this.size;
  }
}
