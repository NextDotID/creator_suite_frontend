import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { TableCellsIcon, PlusIcon, DocumentPlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { Link, matchPath, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { formatEthereumAddress } from '../../helpers/formatEthereumAddress'
import { useBlockie } from '../../hooks/useBlockie'
import { Create } from './Create'
import { Services } from './Services'
import logo from './nextid.svg'

const navigation = [
    { name: 'Services', route: '/core-service', icon: TableCellsIcon },
    { name: 'Create', route: '/core-service/create', icon: DocumentPlusIcon },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function CoreService() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()

    const { address, isConnected } = useAccount()
    const addressBlockie = useBlockie(address)
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })

    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()

    return (
        <div className="min-h-full">
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex flex-shrink-0 items-center px-4">
                                    <img className="h-8 w-auto" src={logo} alt="Core Service" />
                                </div>
                                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                                    <nav className="px-2">
                                        <div className="space-y-1">
                                            {navigation.map((item) => {
                                                const match = matchPath(item.route, location.pathname)
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        to={item.route}
                                                        className={classNames(
                                                            match
                                                                ? 'bg-gray-100 text-gray-900'
                                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                                            'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md',
                                                        )}
                                                        aria-current={match ? 'page' : undefined}
                                                    >
                                                        <item.icon
                                                            className={classNames(
                                                                match
                                                                    ? 'text-gray-500'
                                                                    : 'text-gray-400 group-hover:text-gray-500',
                                                                'mr-3 flex-shrink-0 h-6 w-6',
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4">
                <div className="flex flex-shrink-0 items-center px-6">
                    <img className="h-8 w-auto" src={logo} alt="Core Service" />
                    <h1 className="text-2xl ml-3">Core Service</h1>
                </div>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
                    {/* User account dropdown */}
                    <Menu as="div" className="relative inline-block px-3 text-left">
                        {isConnected ? (
                            <div>
                                <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                    <span className="flex w-full items-center justify-between">
                                        <span className="flex min-w-0 items-center justify-between space-x-3">
                                            <img
                                                className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                                                src={ensAvatar || addressBlockie}
                                                alt={ensName}
                                            />
                                            <span className="flex min-w-0 flex-1 flex-col">
                                                {ensName ? (
                                                    <span className="truncate text-sm font-medium text-gray-900">
                                                        {ensName}
                                                    </span>
                                                ) : null}
                                                <span className="truncate text-sm text-gray-500">
                                                    {formatEthereumAddress(address, 4)}
                                                </span>
                                            </span>
                                        </span>
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Menu.Button>
                            </div>
                        ) : null}
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to="/creation/create"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                )}
                                            >
                                                Create
                                            </Link>
                                        )}
                                    </Menu.Item>{' '}
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to="/creation/purchased"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                )}
                                            >
                                                Purchased
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                )}
                                            >
                                                Support
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    {/* Sidebar Search */}
                    <div className="mt-5 px-3">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                                aria-hidden="true"
                            >
                                <MagnifyingGlassIcon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="block w-full rounded-md border-gray-300 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    {/* Navigation */}
                    <nav className="mt-6 px-3">
                        <div className="space-y-1" data-path={location.pathname}>
                            {navigation.map((item) => {
                                const match = matchPath(item.route, location.pathname)
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.route}
                                        className={classNames(
                                            match
                                                ? 'bg-gray-200 text-gray-900'
                                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                                        )}
                                        aria-current={match ? 'page' : undefined}
                                    >
                                        <item.icon
                                            className={classNames(
                                                match ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                'mr-3 flex-shrink-0 h-6 w-6',
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </nav>
                </div>
            </div>
            {/* Main column */}
            <div className="flex flex-col lg:pl-64">
                <main className="flex-1">
                    {/* Page title & actions */}
                    <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 flex items-center">
                        <div className="min-w-0 flex-1">
                            <button
                                type="button"
                                className="flex items-center justify-center border border-gray-300 rounded-md transition hover:bg-zinc-900/5 px-1 py-1"
                                aria-label="List a creation"
                            >
                                <Link to="/core-service/create">
                                    <PlusIcon className="h-6 w-6 stroke-zinc-500 hover:stroke-zinc-900 " />
                                </Link>
                            </button>
                        </div>
                        <div className="flex sm:mt-0 sm:ml-4 items-center">
                            <button
                                type="button"
                                className="order-0 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
                                onClick={() => {
                                    if (isConnected) disconnect()
                                    else connect()
                                }}
                            >
                                {isConnected ? 'Disconnect' : 'Connect Wallet'}
                            </button>
                        </div>
                    </div>
                    <Routes>
                        <Route path="/" element={<Services />} />
                        <Route path="/create/*" element={<Create />} />
                        <Route path="/services/" element={<Services />} />
                        <Route path="/*" element={<Navigate to="/creation" />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}
