import useSWR from 'swr'
import { allowance } from '../connections'
import { isValidAddress } from '../helpers/isValidAddress'

export function useAllowance(address, owner, spender) {
    return useSWR(
        `useAllowance_${address}_${owner}_${spender}`,
        async () => {
            if (!isValidAddress(address) || !isValidAddress(owner) || !isValidAddress(spender)) return '0'
            const amount = await allowance(address, owner, spender)
            return amount.toString()
        },
        { suspense: false, revalidateOnFocus: false, revalidateOnMount: true },
    )
}
