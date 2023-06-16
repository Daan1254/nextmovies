import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  row: number;

  @Column()
  column: number;

  @ManyToOne(() => Room, (room) => room.seats)
  room: Room;
}
