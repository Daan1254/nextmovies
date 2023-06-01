import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @OneToMany(() => User, (user) => user.order)
  user: User;
}
