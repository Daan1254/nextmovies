import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Timestamp } from './timestamp.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    enum: OrderStatus,
  })
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(() => Timestamp, (timestamp) => timestamp.orders)
  timestamp: Timestamp;
}
