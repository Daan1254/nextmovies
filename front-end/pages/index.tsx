import Image from "next/image";
import PromotedMovie from "@/public/banner.jpg"
import Thumbnail from "@/public/thumbnail.jpeg"
import Link from "next/link";
const movies = [
  {
    uuid: 1,
    name: 'Star Wars: The Rise of Tabbonemok.',
    href: '#',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium illo iste dicta, repellat, odio sapiente eveniet libero praesentium, nemo voluptatem similique nam nostrum amet quos debitis odit quam ullam consequuntur!',
    imageSrc: Thumbnail,
    imageAlt: 'Star Wars Movie Thumbnail',
  },
  {
    uuid: 2,
    name: 'Star Wars: The Rise of Tabbonemok.',
    href: '#',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium illo iste dicta, repellat, odio sapiente eveniet libero praesentium, nemo voluptatem similique nam nostrum amet quos debitis odit quam ullam consequuntur!',
    imageSrc: Thumbnail,
    imageAlt: 'Star Wars Movie Thumbnail',
  },
  {
    uuid: 3,
    name: 'Star Wars: The Rise of Tabbonemok.',
    href: '#',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium illo iste dicta, repellat, odio sapiente eveniet libero praesentium, nemo voluptatem similique nam nostrum amet quos debitis odit quam ullam consequuntur!',
    imageSrc: Thumbnail,
    imageAlt: 'Star Wars Movie Thumbnail',
  },
  {
    uuid: 4,
    name: 'Star Wars: The Rise of Tabbonemok.',
    href: '#',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium illo iste dicta, repellat, odio sapiente eveniet libero praesentium, nemo voluptatem similique nam nostrum amet quos debitis odit quam ullam consequuntur!',
    imageSrc: Thumbnail,
    imageAlt: 'Star Wars Movie Thumbnail',
  },
  {
    uuid: 5,
    name: 'Star Wars: The Rise of Tabbonemok.',
    href: '#',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium illo iste dicta, repellat, odio sapiente eveniet libero praesentium, nemo voluptatem similique nam nostrum amet quos debitis odit quam ullam consequuntur!',
    imageSrc: Thumbnail,
    imageAlt: 'Star Wars Movie Thumbnail',
  },
  {
    uuid: 6,
    name: 'Star Wars: The Rise of Tabbonemok.',
    href: '#',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium illo iste dicta, repellat, odio sapiente eveniet libero praesentium, nemo voluptatem similique nam nostrum amet quos debitis odit quam ullam consequuntur!',
    imageSrc: Thumbnail,
    imageAlt: 'Star Wars Movie Thumbnail',
  },
  {
    uuid: 7,
    name: 'Star Wars: The Rise of Tabbonemok.',
    href: '#',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium illo iste dicta, repellat, odio sapiente eveniet libero praesentium, nemo voluptatem similique nam nostrum amet quos debitis odit quam ullam consequuntur!',
    imageSrc: Thumbnail,
    imageAlt: 'Star Wars Movie Thumbnail',
  },
  {
    uuid: 8,
    name: 'Star Wars: The Rise of Tabbonemok.',
    href: '#',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium illo iste dicta, repellat, odio sapiente eveniet libero praesentium, nemo voluptatem similique nam nostrum amet quos debitis odit quam ullam consequuntur!',
    imageSrc: Thumbnail,
    imageAlt: 'Star Wars Movie Thumbnail',
  },
  {
    uuid: 9,
    name: 'Star Wars: The Rise of Tabbonemok.',
    href: '#',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium illo iste dicta, repellat, odio sapiente eveniet libero praesentium, nemo voluptatem similique nam nostrum amet quos debitis odit quam ullam consequuntur!',
    imageSrc: Thumbnail,
    imageAlt: 'Star Wars Movie Thumbnail',
  },
]
export default function Home() {
  return (
    <main className="container mx-auto">
      <Image
        src={PromotedMovie}
        alt="Promoted Movie"
        width={0}
        height={0}
        sizes="100vw"
        className="py-8 hidden md:block w-full h-full object-center object-cover rounded-lg mx-auto"
      />
      <div className="p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {movies.map(movie => (
          <Link
            key={movie.uuid}
            href={{ pathname: `/movie/${movie.uuid}` }}
            className="group relative h-48 min-h-full col-span-2 md:col-span-3 lg:col-span-1 lg:h-full"
          >
            <Image
              src={movie.imageSrc}
              alt={movie.imageAlt}
              width={0}
              height={0}
              sizes="100vw"
              className="absolute lg:static inset-0 w-full h-full object-center object-cover group-hover:opacity-50 opacity-80 rounded-lg"
            />
            <div className="absolute bottom-0 left-0 p-2 text-white text-sm lg:text-base">
              <h3 className="font-medium">{movie.name}</h3>
              <p className="mt-1 text-sm italic text-gray-200 line-clamp-3">
                {movie.description}
              </p>
            </div>
          </Link>
        ))}
      </div>


    </main>
  )
}