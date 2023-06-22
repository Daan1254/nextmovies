import { useState } from "react";
import { SeatInterface } from "@/types/seat";
import { OrderStatus } from "@/types/order";

export default function Seat({
  onToggle,
  seat,
}: {
  onToggle: () => void;
  seat: SeatInterface;
}) {
  const [reserved, setReserved] = useState<boolean>(false);
  return (
    <div
      onClick={() => {
        onToggle(), setReserved(!reserved);
      }}
      className={`h-12 w-16 rounded-t-2xl  cursor-pointer 
        ${reserved ? "bg-blue-300" : "bg-gray-300 hover:bg-blue-200"}
        ${
          seat.order && seat.order.status !== OrderStatus.FAILED
            ? "bg-red-300 hover:bg-red-300"
            : ""
        }
        transition-all duration-200`}
    ></div>
  );
}
