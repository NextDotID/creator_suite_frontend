import { Creation } from './Creation'
import { Tabs } from '../Tabs'
import { Empty } from '../Empty'
import { Spinner } from '../Spinner'
import { useAllCreations } from '../../hooks/useAllCreations'

export function AllCreations(props) {
    const { data, isValidating } = useAllCreations()
    console.log(data,'data')
    if (isValidating) return <Spinner />
    if (!data.length) return <Empty />

    return (
        <div className="bg-white">
            <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{props.title}</h2>
                    <Tabs />
                </div>

                <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.map((creation) => (
                        <Creation key={creation.id} {...creation} />
                    ))}
                </div>
            </div>
        </div>
    )
}
