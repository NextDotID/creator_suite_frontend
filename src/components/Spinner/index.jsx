export function Spinner() {
    return (
        <div className="bg-white py-12 sm:py-12">
            <div className="mx-auto max-w-2xl py-24 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="flex justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    )
}
