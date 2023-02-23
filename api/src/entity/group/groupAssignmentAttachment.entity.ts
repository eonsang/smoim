import { CommonEntity } from '@src/entity/commonEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IsMimeType, IsNumber, IsString } from 'class-validator';
import { GroupAssignmentEntity } from '@src/entity/group/groupAssignment.entity';

@Entity('group_assignment_attachment')
export class GroupAssignmentAttachmentEntity extends CommonEntity {
  @ManyToOne(() => GroupAssignmentEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'group_assignment_id',
    referencedColumnName: 'id',
  })
  groupAssignment: GroupAssignmentEntity;

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
