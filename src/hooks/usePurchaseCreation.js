import useSWRMutation from 'swr/mutation'
import { getCreation, purchaseCreation } from '../database'
import { allowance, approve, balanceOf, connectIfNeeded, getAssetId, isQualified, purchaseAsset } from '../connections'
import { isGreaterThanOrEqualTo } from '../helpers/isGreaterThanOrEqualTo'
import { getSubscriptionContractAddress } from '../helpers/getSubscriptionContractAddress'
import { isZero } from '../helpers/isZero'

const MAX_UINT256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

/**
 * Use to purchase a creation
 * @param {string} creationId
 * @param {string} buyer the buyer address
 * @returns
 */
export function usePurchaseCreation(creationId, buyer) {
    return useSWRMutation(
        'usePurchaseCreation',
        async () => {
            await connectIfNeeded()

            const creation = await getCreation(creationId)
            const { paymentTokenAddress, paymentTokenAmount } = creation

            const assetId = await getAssetId(creation.ownerAddress, creationId)
            if (isZero(assetId)) throw new Error('Cannot find asset.')

            const balance = await balanceOf(paymentTokenAddress, buyer)
            if (!isGreaterThanOrEqualTo(balance, paymentTokenAmount)) throw new Error('Insufficient balance.')

            const subscriptionContractAddress = getSubscriptionContractAddress()
            const amount = await allowance(paymentTokenAddress, buyer, subscriptionContractAddress)
            if (!isGreaterThanOrEqualTo(amount, paymentTokenAmount)) {
                await approve(paymentTokenAddress, subscriptionContractAddress, MAX_UINT256)
            }

            const qualified = await isQualified(buyer, assetId)
            if (qualified) throw new Error('Already purchased.')

            const transactionHash = await purchaseAsset(assetId)
            return purchaseCreation(creationId, buyer, transactionHash)
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
