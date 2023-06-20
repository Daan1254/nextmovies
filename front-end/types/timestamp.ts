import { Movie } from "@/types/movie";
import { Room } from "@/types/room";

export interface Timestamp {
  uuid: string;
  startDate: Date;
  endDate: Date;
  price: number;
  movie: Movie | null;
  // orders: Order[];
  room: Room;
}
