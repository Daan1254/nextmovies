import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import logoSVG from '../public/logo.svg'

let navigation = [
  { name: 'Movies', href: '/' },
  { name: 'About Us', href: '#' },
]

export default function Page() {
  return (
    <Popover className="relative bg-black">
      <div className="flex justify-between items-center px-4 pt-4 sm:px-6 md:justify-start md:space-x-10">
        <div>
          <a href="/">
            <span className="sr-only">NextMovies</span>
            <Image
            className="h-16 w-auto"
            src={logoSVG}
            alt='NextMovies Logo' />
          </a>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button className="bg-black rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-12 w-12 text-white" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
          <div className='hidden md:gap-10 md:flex md:items-center md:justify-between'>
            {navigation.map((link) => (
              <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-white">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-white ring-opacity-5 bg-black divide-y-2 divide-gray-50">
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                {navigation.map((link) => (
                  <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-gray-500">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}