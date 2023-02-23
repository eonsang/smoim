import { CommonEntity } from '@src/entity/commonEntity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { GroupContentEntity } from '@src/entity/group/groupContent.entity';

@Entity('group_content_chapter')
@Index('pk', ['id'], { unique: true })
@Index('group_content_fk', ['groupContent'])
export class GroupContentChapterEntity extends CommonEntity {
  @ManyToOne(() => GroupContentEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'group_content_id',
    referencedColumnName: 'id',
  })
  groupContent: GroupContentEntity;

  @IsNumber()
  @Column({
    type: 'int',
    default: 1,
  })
  order: number;

  @IsString()
  @Column()
  title: string;

  @IsString()
  @Column({
    type: 'text',
  })
  information: string;

  @IsString()
  @Column({
    type: 'text',
  })
  assignment: string;
}
