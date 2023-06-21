import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Timestamp } from './timestamp.entity';
import { Seat } from './seat.entity';
import { Ticket } from './ticket.entity';
import { DeleteDateColumn } from 'typeorm/decorator/columns/DeleteDateColumn';

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

  @Column()
  price: number;

  @Column({
    nullable: true,
  })
  stripeId?: string;

  @OneToMany(() => Ticket, (ticket) => ticket.order)
  tickets: Ticket[];

  @OneToMany(() => Seat, (seat) => seat.order)
  seats: Seat[];

  @ManyToOne(() => Timestamp, (timestamp) => timestamp.orders)
  timestamp: Timestamp;

  @DeleteDateColumn()
  deletedAt?: Date;
}
