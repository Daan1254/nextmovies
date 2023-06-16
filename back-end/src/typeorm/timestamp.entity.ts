import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Order } from './order.entity';

@Entity()
export class Timestamp {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => Movie, (movie) => movie.timestamps)
  movie: Movie;

  @OneToMany(() => Order, (order) => order.timestamp)
  orders: Order[];
}
