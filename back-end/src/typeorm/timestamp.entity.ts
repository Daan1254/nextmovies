import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Order } from './order.entity';
import { Room } from './room.entity';
import { DeleteDateColumn } from 'typeorm/decorator/columns/DeleteDateColumn';

@Entity()
export class Timestamp {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  price: number;

  @ManyToOne(() => Movie, (movie) => movie.timestamps)
  movie: Movie;

  @OneToMany(() => Order, (order) => order.timestamp)
  orders: Order[];

  @ManyToOne(() => Room, (room) => room.timestamps)
  room: Room;

  @DeleteDateColumn()
  deletedAt?: Date;
}
