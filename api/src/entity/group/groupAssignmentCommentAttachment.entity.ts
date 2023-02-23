import { CommonEntity } from '@src/entity/commonEntity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { IsMimeType, IsNumber, IsString } from 'class-validator';
import { GroupAssignmentCommentEntity } from '@src/entity/group/groupAssignmentComment.entity';

@Entity('group_assignment_comment_attachment')
@Index('pk', ['id'], { unique: true })
@Index('group_assignment_comment_fk', ['groupAssignmentComment'])
export class GroupAssignmentCommentAttachmentEntity extends CommonEntity {
  @ManyToOne(() => GroupAssignmentCommentEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'group_assignment_comment_id',
    referencedColumnName: 'id',
  })
  groupAssignmentComment: GroupAssignmentCommentEntity;

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

  @IsNumber()
  @Column({
    type: 'int',
    nullable: false,
  })
  size: number;

  @IsString()
  @Column({
    nullable: false,
  })
  key: string;
}
