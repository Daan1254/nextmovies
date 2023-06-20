import { User } from "@/types/user";
import { SeatInterface } from "@/types/seat";
import { Timestamp } from "@/types/timestamp";

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

export interface Order {
  uuid?: string;
  status: OrderStatus;
  user?: User;
  price: number;
  email: string;
  stripeId?: string;
  seats: SeatInterface[];
  timestamp: Timestamp;
}
