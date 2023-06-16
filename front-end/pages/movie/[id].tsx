import Thumbnail from "@/public/thumbnail.jpeg"
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from '@heroicons/react/24/solid'

export interface Movie{
  uuid: string;
  name: string;
  description: string;
  isExplicit: boolean;
  timestamps: Timestamp[];
}

export interface Timestamp{
  uuid: string;
  startDate: Date;
  endDate: Date;
  price: number;
  movie: Movie | null;
  // orders: Order[];
  room: Room;
}

export interface Room{
  uuid: string;
  name: string;
  columns: number;
  rows: number;
  timestamps: Timestamp[] | null;
}

const movie: Movie = {
  uuid: '1',
  name: 'Star Wars: The Rise of Tabbonemok.',
  description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium illo iste dicta, repellat, odio sapiente eveniet libero praesentium, nemo voluptatem similique nam nostrum amet quos debitis odit quam ullam consequuntur!',
  isExplicit: true,
  timestamps: [
      {
          uuid: "1",
          startDate: new Date('June 16, 2023 20:00:00'),
          endDate: new Date('June 16, 2023 23:00:00'),
          price: 20,
          movie: null,
          room: {
              uuid: "1",
              name: "Zaal 1",
              columns: 10,
              rows: 10,
              timestamps: null
          }
      },
      {
          uuid: "2",
          startDate: new Date('June 16, 2023 23:30:00'),
          endDate: new Date('June 17, 2023 03:00:00'),
          price: 20,
          movie: null,
          room: {
              uuid: "2",
              name: "Zaal 2",
              columns: 5,
              rows: 5,
              timestamps: null
          }
      },
      {
          uuid: "3",
          startDate: new Date('June 17, 2023 20:00:00'),
          endDate: new Date('June 17, 2023 23:00:00'),
          price: 20,
          movie: null,
          room: {
              uuid: "1",
              name: "Zaal 1",
              columns: 10,
              rows: 10,
              timestamps: null
          }
      },
  ],
};


function GroupByDay(timestamps: Timestamp[]) {
  return timestamps.reduce<Record<string, Timestamp[]>>((groups, timestamp) => {
    const day = timestamp.startDate.toDateString();
    if(!groups[day]) {
      groups[day] = [];
    }
    groups[day].push(timestamp);
    return groups;
  }, {});
}

function FormatTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default function Page() {
  const groupedTimestamps = GroupByDay(movie.timestamps);

  return (
    <main className="container mx-auto flex flex-col sm:grid sm:grid-cols-2 gap-4 p-6">
      <div className="relative">
        <Image
          src={Thumbnail}
          alt='stur wurs'
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-96 object-center object-cover rounded-lg opacity-70 lg:opacity-100"
        />
        <div className="absolute bottom-0 left-0 p-2 lg:static">
          <h1 className="text-3xl">{movie.name}</h1>
          <p>{movie.description}</p>
        </div>
      </div>
      <div className="border-b border-white h-max pb-1">
        {Object.keys(groupedTimestamps).map(day => (
            <div className="border-t border-white py-2" key={day}>
                <h3>{day}</h3>
                <div className="flex flex-row gap-4">
                    {groupedTimestamps[day].map(timestamp => (
                        <Link key={timestamp.uuid} href={'google.com'}>
                            <div className="border border-white rounded-lg w-max px-4 py-1 flex flex-row gap-4 hover:border-black hover:bg-white hover:text-black transition-all duration-300">
                                <div>
                                    <p>{FormatTime(timestamp.startDate)} - {FormatTime(timestamp.endDate)}</p>
                                    <p>{timestamp.room.name}</p>
                                </div>
                                <ChevronRightIcon className="w-6"></ChevronRightIcon>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </main>
    )
}