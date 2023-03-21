export function Dots(props) {
    return (
        <button
            className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 py-4 px-10 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:shadow-none"
            disabled
        >
            <div className="w-1 h-1 rounded-full bg-white mx-1 animate-pulse"></div>
            <div className="w-1 h-1 rounded-full bg-white mx-1 animate-pulse"></div>
            <div className="w-1 h-1 rounded-full bg-white mx-1 animate-pulse"></div>
        </button>
    )
}
