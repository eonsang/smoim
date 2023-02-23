import { CommonEntity } from '@src/entity/commonEntity';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  Index,
  DeleteDateColumn,
} from 'typeorm';
import { UserEntity } from '@src/entity/user/user.entity';

@Entity('group')
@Index('pk', ['id'], { unique: true })
@Index('user_fk', ['user'])
export class GroupEntity extends CommonEntity {
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
