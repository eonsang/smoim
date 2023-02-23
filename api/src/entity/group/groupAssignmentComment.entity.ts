import { CommonEntity } from '@src/entity/commonEntity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { UserEntity } from '@src/entity/user/user.entity';
import { GroupAssignmentEntity } from '@src/entity/group/groupAssignment.entity';

@Entity('group_assignment_comment')
@Index('group_assignment_fk', ['groupAssignment'])
@Index('user_fk', ['user'])
export class GroupAssignmentCommentEntity extends CommonEntity {
  @ManyToOne(() => GroupAssignmentEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'group_assignment_id',
    referencedColumnName: 'id',
  })
  groupAssignment: GroupAssignmentEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @IsString()
  @Column({
    type: 'text',
  })
  contents: string;
}
