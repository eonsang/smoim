import {
  CreateDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocalDateTime } from '@js-joda/core';
import { bigintTransfomer } from '@src/entity/transfomer/bigintTransfomer';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommonEntity {
  @ApiProperty({
    example: 1,
    description: 'pk',
  })
  @Generated('increment')
  @PrimaryColumn('bigint', { transformer: [bigintTransfomer] })
  id: number;

  @ApiProperty({
    example: '2022-02-12T03:03:03T',
    description: '생성일',
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    example: '2022-02-12T03:03:03T',
    description: '수정일',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
