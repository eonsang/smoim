import { Column, Entity } from 'typeorm';
import { CommonEntity } from '@src/entity/commonEntity';

@Entity({ name: 'user' })
export class User extends CommonEntity {
  @Column()
  nickname: string;
}
