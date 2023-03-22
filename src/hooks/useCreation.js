import useSWR from 'swr'
import { getCreation } from '../database'

export function useCreation(id,creator) {
    return useSWR(
        `useCreation_${id}`,
        async () => {
            return getCreation(id,creator)
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
