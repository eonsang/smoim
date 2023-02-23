import { CommonEntity } from '@src/entity/commonEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '@src/entity/user/user.entity';
import { GroupEntity } from '@src/entity/group/group.entity';
import { IsEnum } from 'class-validator';

export enum GroupJoinStatus {
  pending,
  resolve,
  reject,
}
@Entity('group_join')
export class GroupJoinEntity extends CommonEntity {
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @ManyToOne(() => GroupEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'group_id',
    referencedColumnName: 'id',
  })
  group: GroupEntity;

  @IsEnum(GroupJoinStatus)
  @Column({
    type: 'enum',
    enum: GroupJoinStatus,
    default: GroupJoinStatus.pending,
  })
  isApproval: GroupJoinStatus;
}
