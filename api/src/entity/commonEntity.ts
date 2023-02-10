import {
  CreateDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocalDateTime } from '@js-joda/core';
import { bigintTransfomer } from '@src/entity/transfomer/bigintTransfomer';

export class CommonEntity {
  @Generated('increment')
  @PrimaryColumn('bigint', { transformer: [bigintTransfomer] })
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: LocalDateTime;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: LocalDateTime;
}
