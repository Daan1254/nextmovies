import Seat from "@/components/Seat";
import { useState } from "react";
import Image from "next/image";
import { SeatInterface } from "@/types/seat";
import { databaseUrl } from "@/pages/_app";
import { GetServerSideProps } from "next/types";
import { Timestamp } from "@/types/timestamp";
import { Order, OrderStatus } from "@/types/order";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const timestampResponse = await fetch(
    `${databaseUrl}/timestamp/${context.params?.uuid}`
  );

  const timestamp: Timestamp = await timestampResponse.json();

  return {
    props: {
      timestamp,
    },
  };
};

export default function Page({ timestamp }: { timestamp: Timestamp }) {
  const [order, setOrder] = useState<Order>({
    email: "",
    seats: [],
    timestamp: timestamp,
    price: 0,
    status: OrderStatus.PENDING,
    tickets: [],
    user: undefined,
    stripeId: undefined,
  });

  const handleToggle = (seat: SeatInterface) => {
    if (seat.order && seat.order.status !== OrderStatus.FAILED) {
      alert("Seat is not available");
      return;
    }
    if (order.seats.some((reservedSeat) => reservedSeat.uuid === seat.uuid)) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        price: prevOrder.price - timestamp.price,
        seats: prevOrder.seats.filter(
          (reservedSeat) => reservedSeat.uuid !== seat.uuid
        ),
      }));
    } else {
      setOrder((prevOrder) => ({
        ...prevOrder,
        seats: [...prevOrder.seats, seat],
      }));
    }
  };

  const handleOrder = async () => {
    try {
      const response = await fetch(`${databaseUrl}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: order.email,
          seatUuids: order.seats.map((seat) => seat.uuid),
          timestamp: timestamp.uuid,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.message;
        alert(errorMessage);
        return;
      }

      const jsonOrder: { redirectUrl: string } = await response.json();

      window.location.href = jsonOrder.redirectUrl;
    } catch (e) {
      console.error(e);
    }
  };

  function calculateTotalPrice() {
    return ((order.seats.length * timestamp.price) / 100).toFixed(2);
  }

  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    const fieldValue = e.currentTarget.value;

    setOrder((prevOrder) => ({
      ...prevOrder,
      email: fieldValue,
    }));
  }

  return (
    <main className="grid place-items-center">
      <div className="group relative p-8 w-full">
        <Image
          src={timestamp.movie?.thumbnail}
          alt={timestamp.movie?.title}
          width={1000}
          height={1000}
          className="absolute w-full lg:static hidden md:block h-56 object-center object-cover opacity-80"
        />
        <div className="absolute bottom-0 left-0 p-10 text-white text-sm lg:text-base">
          <h3 className="font-medium">{timestamp.movie.title}</h3>
          <p className="mt-1 text-sm italic text-gray-200 line-clamp-3">
            {timestamp.movie.description}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-2 container mx-auto">
        <div className="w-full z-50">
          <div className="grid grid-cols-6 gap-2 w-max mx-auto ">
            {timestamp.room.seats.map((seat, index) => (
              <Seat
                seat={seat}
                key={index}
                onToggle={() => handleToggle(seat)}
              ></Seat>
            ))}
          </div>
          <div className="z-10 no-events screen relative -mt-16 h-32 bg-transparant w-full my-4 flex justify-center  text-center text-xl  border-white border-b-2">
            <h1 className="absolute bottom-0">Screen</h1>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center gap-6 ">
          <h1 className="text-center text-2xl font-semibold">Order Summary</h1>
          <div className="flex flex-col divide-y-2 h-72 max-h-72 overflow-y-scroll">
            {order.seats.map((seat) => (
              <div
                key={seat.uuid}
                className="flex flex-col py-2 justify-between"
              >
                <div className="flex flex-row justify-between items-center">
                  <h1>1x {timestamp.movie.title}</h1>
                  <h1>€{(timestamp.price / 100).toFixed(2)}</h1>
                </div>
                <h1>Rij: {seat.row}</h1>
                <h1>Chair: {seat.column}</h1>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white">Email</label>
            <input
              type="email"
              className="px-1 py-1 bg-black rounded-lg text-white border border-white"
              onChange={handleInput}
            />
          </div>

          <div className="w-full flex justify-center items-center">
            {order.seats.length > 0 && (
              <button
                className="mt-10 text-center border border-white rounded-lg w-max  px-4 py-1 flex flex-row gap-4 hover:border-black hover:bg-white hover:text-black transition-all duration-300"
                onClick={handleOrder}
              >
                Confirm Order (€{calculateTotalPrice()})
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
