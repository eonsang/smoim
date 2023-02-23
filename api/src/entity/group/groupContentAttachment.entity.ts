import { CommonEntity } from '@src/entity/commonEntity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { IsMimeType, IsString } from 'class-validator';
import { GroupContentEntity } from '@src/entity/group/groupContent.entity';

@Entity('group_content_attachment')
@Index('pk', ['id'], { unique: true })
@Index('group_content_fk', ['groupContent'])
export class GroupContentAttachmentEntity extends CommonEntity {
  @ManyToOne(() => GroupContentEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'group_content_id',
    referencedColumnName: 'id',
  })
  groupContent: GroupContentEntity;

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
