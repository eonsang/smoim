import { CommonEntity } from '@src/entity/commonEntity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { IsMimeType, IsString } from 'class-validator';
import { GroupContentChapterEntity } from '@src/entity/group/groupContentChapter.entity';

@Entity('group_content_chapter_attachment')
@Index('pk', ['id'], { unique: true })
@Index('group_content_chapter_fk', ['groupContentChapter'])
export class GroupContentChapterAttachmentEntity extends CommonEntity {
  @ManyToOne(() => GroupContentChapterEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'group_content_chapter_id',
    referencedColumnName: 'id',
  })
  groupContentChapter: GroupContentChapterEntity;

  @IsMimeType()
  @Column({
    length: 10,
    nullable: false,
  })
  fileType: string;

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
}
