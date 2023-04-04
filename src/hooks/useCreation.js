import useSWR from 'swr'
import { getCreation } from '../database'
import { isValidAddress } from '../helpers/isValidAddress'

export function useCreation(id,creator) {
    return useSWR(
        `useCreation_${id}`,
        async () => {
            if(!id || !isValidAddress(creator)) return null
            return getCreation(id,creator)
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
