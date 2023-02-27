import { CommonEntity } from '@src/entity/commonEntity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IsMimeType, IsString } from 'class-validator';
import { GroupChapterEntity } from '@src/entity/group/groupChapter.entity';

@Entity('group_chapter_attachment')
@Index('pk', ['id'], { unique: true })
@Index('group_chapter_fk', ['groupChapter'])
export class GroupChapterAttachmentEntity extends CommonEntity {
  @ManyToOne(() => GroupChapterEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'group_chapter_id',
    referencedColumnName: 'id',
  })
  groupChapter: GroupChapterEntity;

  @IsMimeType()
  @Column({
    length: 10,
    nullable: false,
  })
  type: string;

  @IsString()
  @Column({
    nullable: false,
  })
  originalName: string;

  @IsString()
  @Column({
    nullable: false,
  })
  key: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
