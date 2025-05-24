'use client'

import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
  Bars3Icon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Conversations', href: '/conversations', icon: ChatBubbleLeftRightIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile menu */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-[#64748b]">BeyondChats</span>
                    </div>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={`
                                  group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                  ${pathname === item.href
                                    ? 'bg-[#f3f4f6] text-[#64748b]'
                                    : 'text-gray-700 hover:text-[#64748b] hover:bg-[#f3f4f6]'
                                  }
                                `}
                                onClick={() => setSidebarOpen(false)}
                              >
                                <item.icon
                                  className={`h-6 w-6 shrink-0 ${
                                    pathname === item.href ? 'text-[#64748b]' : 'text-gray-400 group-hover:text-[#64748b]'
                                  }`}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Top navigation */}
      <div className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="mr-4 -m-2.5 p-2.5 text-gray-700 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="relative text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400 bg-clip-text text-transparent px-1 py-1 overflow-hidden shine-logo">
                BeyondChats
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center text-sm font-medium 
                  ${pathname === item.href ? 'text-[#64748b]' : 'text-gray-700 hover:text-[#64748b]'}
                `}
              >
                <item.icon
                  className={`h-5 w-5 mr-1.5 flex-shrink-0 ${
                    pathname === item.href ? 'text-[#64748b]' : 'text-gray-400 group-hover:text-[#64748b]'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Right section */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 relative"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              <span className="absolute top-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                type="button"
                className="-m-1.5 flex items-center p-1.5"
                id="user-menu-button"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-[#64748b] flex items-center justify-center text-white font-medium">TC</div>
                <span className="hidden md:flex md:items-center">
                  <span
                    className="ml-2 text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    Tom Cook
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="py-6">
        <div className="px-2 sm:px-4 md:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}

/*
  .shine-logo::after {
    content: '';
    position: absolute;
    top: 0; left: -75%;
    width: 50%; height: 100%;
    background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%);
    animation: shine-move 2.5s infinite;
  }
  @keyframes shine-move {
    0% { left: -75%; }
    100% { left: 125%; }
  }
*/ 