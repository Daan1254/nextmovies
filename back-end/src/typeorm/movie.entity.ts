import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Timestamp } from './timestamp.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  thumbnail: string;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({
    default: 0,
  })
  isExplicit: boolean;

  @OneToMany(() => Timestamp, (timestamps) => timestamps.movie)
  timestamps: Timestamp;

  @DeleteDateColumn()
  deletedAt?: Date;
}
