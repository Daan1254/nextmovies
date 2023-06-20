import { Timestamp } from "@/types/timestamp";
import { SeatInterface } from "@/types/seat";

export interface Room {
  uuid: string;
  name: string;
  columns: number;
  rows: number;
  timestamps: Timestamp[];
  seats: SeatInterface[];
}
