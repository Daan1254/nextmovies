import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next/types";
import { databaseUrl } from "@/pages/_app";
import { Movie } from "@/types/movie";
import { Settings } from "@/types/settings";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [moviesResponse, settingsResponse] = await Promise.all([
    fetch(`${databaseUrl}/movie`),
    fetch(`${databaseUrl}/settings`),
  ]);

  const movies: Movie[] = await moviesResponse.json();
  const settings: Settings = await settingsResponse.json();

  return {
    props: {
      movies,
      settings,
    },
  };
};

export default function Home({
  movies,
  settings,
}: {
  movies: Movie[];
  settings: Settings;
}) {
  return (
    <>
      {settings?.featuredMovie && (
        <div className="relative">
          <Image
            src={settings?.featuredMovie?.thumbnail}
            alt={settings?.featuredMovie?.uuid}
            width={2048}
            height={646}
            className="mb-8 hidden md:block w-full max-h-96 object-cover"
            style={{
              zIndex: 1,
            }}
          />
          <div
            className="absolute hidden md:block top-0 left-0 w-full h-48 bg-gradient-to-b from-black to-transparent"
            style={{
              zIndex: 2,
            }}
          ></div>
        </div>
      )}
      <div className="container mx-auto flex-1">
        <div className="p-8  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {movies.length > 0 ? (
            movies.map((movie: Movie) => (
              <Link
                key={movie.uuid}
                href={{ pathname: `/movie/${movie.uuid}` }}
                className="group relative h-48 min-h-full col-span-2 md:col-span-3 lg:col-span-1 lg:h-full"
              >
                <Image
                  src={movie.thumbnail}
                  alt={movie.uuid}
                  width={646}
                  height={2048}
                  className="aspect-[2/3] absolute lg:static inset-0 w-full h-full object-center object-cover group-hover:opacity-50 opacity-80 rounded-lg"
                />
                <div className="absolute bottom-0 left-0 p-2 text-white text-sm lg:text-base">
                  <h3 className="font-medium">{movie.name}</h3>
                  <p className="mt-1 text-sm italic text-gray-200 line-clamp-3">
                    {movie.description}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <h1>No movies found...</h1>
          )}
        </div>
      </div>
    </>
  );
}
