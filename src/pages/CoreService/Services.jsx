import { useState, useMemo } from 'react'
import useSWR from 'swr'
import classnames from 'classnames'
import {
    ArrowRightOnRectangleIcon,
    ArrowTrendingUpIcon,
    MagnifyingGlassIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { fetcher } from '../../helpers/fetcher'

export const Services = ({ className, ...rest }) => {
    const { data, error } = useSWR('/api/service', fetcher)

    const [keyword, setKeyword] = useState('')

    const services = useMemo(() => {
        const list = data?.Services ?? []
        if (!keyword) return list
        return list.filter((x) => x.Name.includes(keyword))
    }, [keyword, data?.Services])

    return (
        <div className={classnames('py-6', className)} {...rest}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 md:px-8">
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6 flex">
                        <h2 className="text-1xl font-semibold text-gray-900">Services</h2>
                        <div className="relative mt-1 rounded-md shadow-sm ml-auto">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                value={keyword}
                                type="search"
                                name="search"
                                className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Search"
                                onChange={(evt) => setKeyword(evt.currentTarget.value)}
                            />
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <div className="px-6 lg:px-8">
                            <div className="flow-root">
                                {error?.message ? (
                                    <div className="text-red-900 font-bold">⚠️ {error.message}</div>
                                ) : null}
                                <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead>
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                                    >
                                                        Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Running
                                                    </th>
                                                    <th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-0">
                                                        <span className="sr-only">Actions</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {services.map((service) => (
                                                    <tr key={service.name}>
                                                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                            {service.Name}
                                                        </td>
                                                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                                            {service.IsRunning ? 'Yes' : 'No'}
                                                        </td>
                                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                                                            <span className="isolate inline-flex rounded-md shadow-sm">
                                                                <button
                                                                    type="button"
                                                                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                                >
                                                                    <ArrowRightOnRectangleIcon
                                                                        className="h-6 w-6"
                                                                        aria-hidden="true"
                                                                    />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                                >
                                                                    <TrashIcon
                                                                        color="#f00"
                                                                        className="h-6 w-6"
                                                                        aria-hidden="true"
                                                                    />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                                >
                                                                    <ArrowTrendingUpIcon
                                                                        className="h-6 w-6"
                                                                        aria-hidden="true"
                                                                    />
                                                                </button>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
