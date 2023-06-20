import { Room } from "@/types/room";
import { Order } from "@/types/order";

export interface SeatInterface {
  uuid: string;
  column: number;
  row: number;
  order: Order;
  room: Room;
}
