import { CommonEntity } from '@src/entity/commonEntity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { GroupEntity } from '@src/entity/group/group.entity';
import { IsString } from 'class-validator';
import { UserEntity } from '@src/entity/user/user.entity';

@Entity('group_comment')
@Index('pk', ['id'], { unique: true })
@Index('group_fk', ['group'])
export class GroupCommentEntity extends CommonEntity {
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
    type: 'text',
  })
  contents: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;
}
