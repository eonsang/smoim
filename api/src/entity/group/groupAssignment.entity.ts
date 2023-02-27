import { CommonEntity } from '@src/entity/commonEntity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { GroupEntity } from '@src/entity/group/group.entity';
import { UserEntity } from '@src/entity/user/user.entity';
import { GroupChapterEntity } from '@src/entity/group/groupChapter.entity';
import { IsString } from 'class-validator';

@Entity('group_assignment')
@Index('pk', ['id'], { unique: true })
@Index('group_fk', ['group'])
@Index('user_fk', ['user'])
@Index('group_chapter_fk', ['groupChapter'])
export class GroupAssignmentEntity extends CommonEntity {
  @ManyToOne(() => GroupEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'group_id',
    referencedColumnName: 'id',
  })
  group: GroupEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @ManyToOne(() => GroupChapterEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'group_chapter_id',
    referencedColumnName: 'id',
  })
  groupChapter: GroupChapterEntity;

  @IsString()
  @Column({
    type: 'text',
  })
  contents: string;
}
