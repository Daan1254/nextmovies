import { Entity } from 'typeorm/decorator/entity/Entity';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { Order } from './order.entity';
import { Column } from 'typeorm/decorator/columns/Column';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Order, (order) => order.tickets)
  order: Order;

  @Column({
    nullable: false,
  })
  placidId: string;

  @Column({
    nullable: true,
  })
  url?: string;
}
