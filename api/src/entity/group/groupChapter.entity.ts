import { CommonEntity } from '@src/entity/commonEntity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { GroupContentEntity } from '@src/entity/group/groupContent.entity';
import { GroupEntity } from '@src/entity/group/group.entity';
import { LocalDateTime } from '@js-joda/core';
import { LocalDateTransformer } from '@src/entity/transfomer/localDateTransformer';
import { LocalDateTimeTransformer } from '@src/entity/transfomer/localDateTimeTransformer';

@Entity('group_chapter')
@Index('pk', ['id'], { unique: true })
@Index('group_fk', ['group'])
export class GroupChapterEntity extends CommonEntity {
  @ManyToOne(() => GroupEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'group_id',
    referencedColumnName: 'id',
  })
  group: GroupEntity;

  @IsNumber()
  @Column({
    type: 'int',
    default: 1,
  })
  order: number;

  @IsString()
  @Column()
  title: string;

  @IsString()
  @Column({
    type: 'text',
  })
  information: string;

  @IsString()
  @Column({
    type: 'text',
  })
  assignment: string;

  @Column({
    type: 'datetime',
    nullable: false,
    transformer: new LocalDateTimeTransformer(),
  })
  date: LocalDateTime;
}
