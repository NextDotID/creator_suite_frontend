import useSWR from 'swr'
import { getCreation } from '../database'

export function useCreation(id) {
    return useSWR(
        `useCreation_${id}`,
        async () => {
            return getCreation(id)
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
