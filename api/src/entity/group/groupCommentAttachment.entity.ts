import { CommonEntity } from '@src/entity/commonEntity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { IsMimeType, IsString } from 'class-validator';
import { GroupCommentEntity } from '@src/entity/group/groupComment.entity';

@Entity('group_comment_attachment')
@Index('pk', ['id'], { unique: true })
@Index('group_comment_fk', ['groupComment'])
export class GroupCommentAttachmentEntity extends CommonEntity {
  @ManyToOne(() => GroupCommentEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'group_comment_id',
    referencedColumnName: 'id',
  })
  groupComment: GroupCommentEntity;

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
