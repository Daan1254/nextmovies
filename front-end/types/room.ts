import { Timestamp } from "@/types/timestamp";

export interface Room {
  uuid: string;
  name: string;
  columns: number;
  rows: number;
  timestamps: Timestamp[];
}
