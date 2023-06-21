import { Order } from "@/types/order";

export interface Ticket {
  uuid: string;
  order: Order;
  placidId: string;
  url: string;
}
