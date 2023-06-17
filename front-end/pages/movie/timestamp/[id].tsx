import Seat from "@/components/Seat";
import { useState } from "react";
import Thumbnail from "@/public/thumbnail-2.jpeg"
import Image from "next/image";

export interface Room{
    uuid: string;
    name: string;
    columns: number;
    rows: number;
    timestamps: null;
}

export interface Seat{
    uuid: string,
    column: number;
    row: number;
    // order: Order;
    room: Room;
}

const room: Room = {
    uuid: "1",
    name: "Zaal 1",
    columns: 6,
    rows: 6,
    timestamps: null
}
const seats: Seat[] = Array.from({length: 36}, (_, index) => {
    const column = (index % 6) + 1;
    const row = Math.floor(index / 6) + 1;

    return {
        uuid: `${index}`,
        column: column,
        row: row,
        room: room,
    }
})

export default function Page() {
    const [reservedSeats, setReservedSeats] = useState<Seat[]>([]);
    
    const handleToggle = (seat: Seat) => {
        if (reservedSeats.some(reservedSeat => reservedSeat.uuid === seat.uuid)) {
            setReservedSeats(reservedSeats.filter(reservedSeat => reservedSeat.uuid !== seat.uuid));
        } else {
            setReservedSeats([...reservedSeats, seat]);
        }
    };

    const handleOrder = () => {
        const orderSeats: Seat[] = reservedSeats.map((seat: Seat) => {
            return {
                uuid: seat.uuid,
                column: seat.column,
                row: seat.row,
                room: seat.room,
            }
        });
        console.log(orderSeats)
    };

    return (
        <main className="grid place-items-center">
            <div className="group relative p-8">
                <Image
                src={Thumbnail}
                alt="Promoted Movie"
                width={0}
                height={0}
                sizes="100vw"
                className="absolute lg:static inset-0 hidden md:block h-56 object-center object-cover rounded-lg mx-auto opacity-80"
                />
                <div className="absolute bottom-0 left-0 p-10 text-white text-sm lg:text-base">
                    <h3 className="font-medium">Star Wars: The Rise of Tabbonemok.</h3>
                    <p className="mt-1 text-sm italic text-gray-200 line-clamp-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium illo iste dicta, repellat, odio sapiente eveniet libero praesentium, nemo voluptatem similique nam nostrum amet quos debitis odit quam ullam consequuntur!
                    </p>
                </div>
            </div>
            <div style={{display: 'grid', gap: '0.5rem', gridTemplateColumns: `repeat(${room.columns}, 1fr)`}}>
                {seats.map((seat, index) => (
                    <Seat key={seat.uuid} onToggle={() => handleToggle(seat)}></Seat>
                ))}
            </div>
            <div className="w-2/3">
                <div className="my-4 border-b border-white text-center text-xl">
                    Scherm
                </div>
                <button className="ml-auto border border-white rounded-lg w-max mb-16 px-4 py-1 flex flex-row gap-4 hover:border-black hover:bg-white hover:text-black transition-all duration-300" onClick={handleOrder}>Reserve Seats</button>
            </div>
        </main>
    )
}