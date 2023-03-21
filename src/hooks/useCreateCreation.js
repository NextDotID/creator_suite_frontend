import useSWRMutation from 'swr/mutation'
import { createCreation, getCount } from '../database'
import { connectIfNeeded, createAsset, getAssetId } from '../connections'
import { isValidAddress } from '../helpers/isValidAddress'
import { isGreaterThan } from '../helpers/isGreaterThan'

async function getNextAvailableCreationId(owner) {
    let creationId = await getCount(owner)

    while (true) {
        const assetId = await getAssetId(owner, creationId)

        // a valid asset id begins from 1, 0 means an empty slot
        if (assetId !== '0') {
            creationId += 1
            continue
        }
        return creationId
    }
}

/**
 * Use to create a creation
 * @param {object} creation
 * @returns
 */
export function useCreateCreation(creation) {
    return useSWRMutation(
        'useCreateCreation',
        async () => {
            await connectIfNeeded()

            const { ownerAddress, paymentTokenAddress, paymentTokenAmount } = creation

            if (!isValidAddress(ownerAddress)) throw new Error('Invalid owner address.')
            if (!isValidAddress(paymentTokenAddress)) throw new Error('Invalid payment token address.')
            if (!isGreaterThan(paymentTokenAmount || 0, 0)) throw new Error('Invalid payment token amount.')

            const creationId = await getNextAvailableCreationId(ownerAddress)
            const transactionHash = await createAsset(creationId, paymentTokenAddress, paymentTokenAmount)

            return createCreation({
                ...creation,
                id: creationId,
                transactionHash,
            })
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
