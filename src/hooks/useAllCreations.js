import useSWR from 'swr'
import { getAllCreations } from '../database'

export function useAllCreations() {
    return useSWR(
        'useAllCreations',
        async () => {
            return getAllCreations()
        },
        { suspense: true, revalidateOnFocus: false, revalidateOnMount: true },
    )
}
