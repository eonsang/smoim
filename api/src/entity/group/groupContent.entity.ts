import { CommonEntity } from '@src/entity/commonEntity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { GroupEntity } from '@src/entity/group/group.entity';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { LocalDateTime } from '@js-joda/core';
import { LocalDateTimeTransformer } from '@src/entity/transfomer/localDateTimeTransformer';

@Entity('group_content')
@Index('pk', ['id'], { unique: true })
@Index('group_fk', ['group'])
export class GroupContentEntity extends CommonEntity {
  @ManyToOne(() => GroupEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'group_id',
    referencedColumnName: 'id',
  })
  group: GroupEntity;

  @IsString()
  @Column({
    length: 255,
    nullable: false,
  })
  title: string;

  @IsString()
  @Column({
    length: 255,
    nullable: false,
  })
  subTitle: string;

  @IsString()
  @Column({
    length: 255,
    nullable: false,
  })
  thumbnail: string;

  @IsString()
  @Column({
    type: 'text',
    nullable: false,
  })
  information: string;

  @IsString()
  @Column({
    type: 'text',
    nullable: false,
  })
  notice: string;

  @IsBoolean()
  @Column({
    type: 'boolean',
    default: false,
  })
  isOpened: boolean;

  @IsBoolean()
  @Column({
    type: 'boolean',
    default: false,
  })
  isApproval: boolean;

  @IsNumber()
  @Column({
    type: 'int',
    default: 10,
  })
  maxUser: number;

  @IsNumber()
  @Column({
    type: 'int',
    default: 1,
  })
  minUser: number;

  @Column({
    type: 'date',
    nullable: false,
    transformer: new LocalDateTimeTransformer(),
  })
  startDate: LocalDateTime;

  @Column({
    type: 'date',
    nullable: false,
    transformer: new LocalDateTimeTransformer(),
  })
  endDate: LocalDateTime;
}
