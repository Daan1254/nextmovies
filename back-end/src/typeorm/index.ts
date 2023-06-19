import { Order } from './order.entity';
import { User } from './user.entity';
import { Movie } from './movie.entity';
import { Seat } from './seat.entity';
import { Room } from './room.entity';
import { Timestamp } from './timestamp.entity';
import { Settings } from './settings.module';

const entities = [User, Order, Movie, Seat, Room, Timestamp, Settings];

export { User, Order, Movie, Seat, Room, Settings };
export default entities;
