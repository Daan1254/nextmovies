import { Order } from "@/types/order";

export interface User {
  uuid: string;
  email: string;
  order: Order;
}
