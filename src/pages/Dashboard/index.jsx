import { Fragment, Suspense, useState } from 'react'
import { Route, Routes, Navigate, Link } from 'react-router-dom'
import { useAccount, useNetwork } from 'wagmi'
import { polygonMumbai } from '@wagmi/core/chains'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PlusIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Create } from '../../components/Create'
import { Creation } from '../../components/Creation'
import { Spinner } from '../../components/Spinner'
import { AllCreations } from '../../components/Creations/AllCreations'
import { AllPurchasedCreations } from '../../components/Creations/AllPurchasedCreations'
import { AllOwnedCreations } from '../../components/Creations/AllOwnedCreations'
import { connect, disconnect, switchNetwork } from '../../connections'
import { Account } from '../../components/Account'
import { classNames } from '../../helpers/classNames'
import { CreateSuiteLogo } from '../../components/Logo'
import { NavigationIcon } from '../../components/NavigationIcon'

const navigation = [
    { name: 'Creations', to: '/', icon: NavigationIcon },
    { name: 'List Creation', to: '/create', icon: PlusCircleIcon },
]

function getCurrentNavigation() {
    return navigation.find((x) => x.to === window.location.pathname) ?? navigation[0]
}

export function Dashboard(props) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // #region connection
    const { address, isConnected } = useAccount()
    const { chain } = useNetwork()
    // #endregion

    const [currentNavigation, setCurrentNavigation] = useState(getCurrentNavigation())

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
                                    <CreateSuiteLogo />
                                </div>
                                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                                    <nav className="px-2">
                                        <div className="space-y-1">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        currentNavigation.name === item.name
                                                            ? 'bg-gray-100 text-gray-900'
                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                                        'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md',
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                    onClick={() => setCurrentNavigation(item)}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current
                                                                ? 'text-gray-500'
                                                                : 'text-gray-400 group-hover:text-gray-500',
                                                            'mr-3 flex-shrink-0 h-6 w-6',
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </a>
                                            ))}
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
                    <CreateSuiteLogo />
                </div>

                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
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
                    <nav className="mt-6 px-3 flex-1">
                        <div className="space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className={classNames(
                                        currentNavigation.name === item.name
                                            ? 'bg-gray-200 text-gray-900'
                                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                    onClick={() => setCurrentNavigation(item)}
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                            'mr-3 flex-shrink-0 h-6 w-6',
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                    {/* User account */}
                    {isConnected ? <Account address={address} /> : null}
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
                                <Link to="create">
                                    <PlusIcon className="h-6 w-6 stroke-zinc-500 hover:stroke-zinc-900 " />
                                </Link>
                            </button>
                        </div>
                        <div className="flex sm:mt-0 sm:ml-4 items-center">
                            <button
                                type="button"
                                className={`order-0 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:order-1 sm:ml-3 ${
                                    isConnected && chain.id !== polygonMumbai.id
                                        ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                        : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                                }`}
                                onClick={async () => {
                                    if (!isConnected) {
                                        await connect()
                                        return
                                    }

                                    if (chain.id === polygonMumbai.id) await disconnect()
                                    else await switchNetwork()
                                }}
                            >
                                {isConnected
                                    ? chain.id === polygonMumbai.id
                                        ? 'Disconnect'
                                        : 'Wrong Network'
                                    : 'Connect Wallet'}
                            </button>
                        </div>
                    </div>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <AllCreations title="Creations" />
                                </Suspense>
                            }
                        />
                        <Route
                            path="create/"
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <Create />
                                </Suspense>
                            }
                        />
                        <Route
                            path="owned/"
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <AllOwnedCreations title="Owned" owner={address} />
                                </Suspense>
                            }
                        />
                        <Route
                            path="purchased/"
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <AllPurchasedCreations title="Purchased" buyer={address} />
                                </Suspense>
                            }
                        />
                        <Route
                            path=":creationId/"
                            element={
                                <Suspense fallback={<Spinner />}>
                                    <Creation />
                                </Suspense>
                            }
                        />
                        <Route path="/*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}
