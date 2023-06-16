import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entity';
import { Order } from './order.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  row: number;

  @Column()
  column: number;

  @ManyToOne(() => Order, (order) => order.seats)
  order: Order;

  @ManyToOne(() => Room, (room) => room.seats)
  room: Room;
}
