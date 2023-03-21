import useSWRMutation from 'swr/mutation'
import { approve, connectIfNeeded } from '../connections'

export function useApprove(address, spender, amount) {
    return useSWRMutation(
        'useApprove',
        async () => {
            await connectIfNeeded()

            return approve(address, spender, amount)
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
