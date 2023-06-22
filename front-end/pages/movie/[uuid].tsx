import Image from "next/image";
import { Movie } from "@/types/movie";
import { Timestamp } from "@/types/timestamp";
import { databaseUrl } from "@/pages/_app";
import { GetServerSideProps } from "next/types";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const movieResponse = await fetch(
    `${databaseUrl}/movie/${context.params?.uuid}`
  );

  const movie: Movie = await movieResponse.json();

  return {
    props: {
      movie,
    },
  };
};

function groupByDay(timestamps: Timestamp[]) {
  return timestamps?.reduce<Record<string, Timestamp[]>>(
    (groups, timestamp) => {
      const date = new Date(timestamp.startDate);
      const day = date.toDateString();
      if (!groups[day]) {
        groups[day] = [];
      }
      groups[day].push(timestamp);
      return groups;
    },
    {}
  );
}

function FormatTime(dateString: string) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function Page({ movie }: { movie: Movie }) {
  console.log(movie);
  const groupedTimestamps = groupByDay(movie.timestamps);

  return (
    <main className="container mx-auto flex flex-col sm:grid sm:grid-cols-2 gap-4 p-6">
      <div className="relative">
        <Image
          src={movie.thumbnail}
          alt={movie.title}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-96 object-center object-cover rounded-lg opacity-70 lg:opacity-100"
        />
        <div className="absolute bottom-0 left-0 p-2 lg:static">
          <h1 className="text-3xl">{movie.title}</h1>
          <p>{movie.description}</p>
        </div>
      </div>
      <div className="border-b border-white h-max pb-1">
        {Object.keys(groupedTimestamps)
          .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
          .map((day) => (
            <div className="border-t border-white py-2" key={day}>
              <h3>{day}</h3>
              <div className="flex flex-col md:flex-row gap-4">
                {groupedTimestamps[day].map((timestamp) => (
                  <Link
                    key={timestamp.uuid}
                    href={{ pathname: `timestamp/${timestamp.uuid}` }}
                  >
                    <div className="border border-white rounded-lg w-max px-4 py-1 flex flex-row gap-4 hover:border-black hover:bg-white hover:text-black transition-all duration-300">
                      <div>
                        <p>
                          {FormatTime(timestamp.startDate)} -{" "}
                          {FormatTime(timestamp.endDate)}
                        </p>
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
  );
}
