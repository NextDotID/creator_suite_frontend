import useSWR from 'swr'
import { balanceOf } from '../connections'
import { isValidAddress } from '../helpers/isValidAddress'

export function useBalanceOf(address, owner) {
    return useSWR(
        `useBalanceOf_${address}_${owner}`,
        async () => {
            if (!isValidAddress(address) || !isValidAddress(owner)) return '0'
            const balance = await balanceOf(address, owner)
            return balance.toString()
        },
        { suspense: false, revalidateOnFocus: false, revalidateOnMount: true },
    )
}
