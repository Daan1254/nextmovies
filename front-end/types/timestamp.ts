import { Movie } from "@/types/movie";
import { Room } from "@/types/room";

export interface Timestamp {
  uuid: string;
  startDate: string;
  endDate: string;
  price: number;
  movie: Movie;
  // orders: Order[];
  room: Room;
}
