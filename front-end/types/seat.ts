import { Room } from "@/types/room";

export interface SeatInterface {
  uuid: string;
  column: number;
  row: number;
  // order: Order;
  room: Room;
}
