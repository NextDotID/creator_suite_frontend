import { useNavigate } from 'react-router-dom'

const files = [
    {
        title: 'Auth Service',
        source: 'https://picsum.photos/500/300',
    },
    {
        title: 'Auth Service 2',
        source: 'https://picsum.photos/500/300?2',
    },
]
export function Choose() {
    const navigate = useNavigate()
    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <ul
                role="list"
                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
                {files.map((file) => (
                    <li
                        key={file.source}
                        className="relative"
                        onClick={() => {
                            navigate('/core-service/create/prepare')
                        }}
                    >
                        <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                            <img
                                src={file.source}
                                width={280}
                                height={168}
                                alt=""
                                className="pointer-events-none object-cover group-hover:opacity-75"
                            />
                            <button type="button" className="absolute inset-0 focus:outline-none">
                                <span className="sr-only">View details for {file.title}</span>
                            </button>
                        </div>
                        <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                            {file.title}
                        </p>
                        <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                            Self-hosted service that provides authentication and authorization for web apps and dApps.
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
