import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Seat } from './seat.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  columns: number;

  @Column()
  rows: number;

  @OneToMany(() => Seat, (seat) => seat.room)
  seats: Seat[];
}
