import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'
import { DocumentPlusIcon, PlusIcon } from '@heroicons/react/24/outline'

export function Empty() {
    const { isConnected } = useAccount()
    return (
        <div className="bg-white py-12 sm:py-12">
            <div className="mx-auto max-w-2xl py-24 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="text-center">
                    <DocumentPlusIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No creations</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {isConnected
                            ? 'Get started by listing your creations.'
                            : 'Please connect a wallet to list your creations.'}
                    </p>
                    {isConnected ? (
                        <div className="mt-6">
                            <Link to="/creation/create">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                    Create
                                </button>
                            </Link>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
