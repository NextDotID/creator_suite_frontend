import { prepareWriteContract, readContract, writeContract } from '@wagmi/core'
import { polygonMumbai } from '@wagmi/core/chains'
import ContractSubscriptionABI from '../abis/ContentSubscription.json'
import { isValidAddress } from '../helpers/isValidAddress'
import { getSubscriptionContractAddress } from '../helpers/getSubscriptionContractAddress'

/**
 * Compute asset id from the creator address and content id
 * @param {string} creator
 * @param {string} contentId
 * @returns
 */
export async function getAssetId(creator, contentId) {
    if (!isValidAddress(creator)) throw new Error('Not a valid creator address.')
    const assetId = await readContract({
        chainId: polygonMumbai.id,
        address: getSubscriptionContractAddress(),
        abi: ContractSubscriptionABI,
        functionName: 'getAssetId',
        args: [creator, contentId],
    })
    return assetId.toString()
}

/**
 * Detect ownership of the given asset
 * @param {string} owner
 * @param {string} assetId
 * @returns
 */
export function isQualified(owner, assetId) {
    if (!isValidAddress(owner)) throw new Error('Not a valid owner address.')
    return readContract({
        chainId: polygonMumbai.id,
        address: getSubscriptionContractAddress(),
        abi: ContractSubscriptionABI,
        functionName: 'isQualified',
        args: [owner, assetId],
    })
}

/**
 * Create a asset on SC
 * @param {string} contentId
 * @param {string} paymentTokenAddress
 * @param {string} paymentTokenAmount
 * @returns
 */
export async function createAsset(contentId, paymentTokenAddress, paymentTokenAmount) {
    if (!isValidAddress(paymentTokenAddress)) throw new Error('Not a valid payment token address.')
    const config = await prepareWriteContract({
        chainId: polygonMumbai.id,
        address: getSubscriptionContractAddress(),
        abi: ContractSubscriptionABI,
        functionName: 'createAsset',
        args: [contentId, paymentTokenAddress, paymentTokenAmount],
    })
    const { hash, wait,error } = await writeContract(config)
    console.log(hash, error,' transwell')
    await wait()
    return hash
}

/**
 * Purchase a asset on SC
 * @param {string} assetId
 * @returns
 */
export async function purchaseAsset(assetId) {
    const config = await prepareWriteContract({
        chainId: polygonMumbai.id,
        address: getSubscriptionContractAddress(),
        abi: ContractSubscriptionABI,
        functionName: 'purchaseAsset',
        args: [assetId],
    })
    const { hash, wait } = await writeContract(config)

    await wait()
    return hash
}

/**
 * Withdraw asset from SC
 * @param {string} paymentTokenAddress
 * @param {string} paymentTokenAmount
 * @returns
 */
export async function withdrawToken(paymentTokenAddress, paymentTokenAmount) {
    if (!isValidAddress(paymentTokenAddress)) throw new Error('Not a valid payment token address.')
    const config = await prepareWriteContract({
        chainId: polygonMumbai.id,
        address: getSubscriptionContractAddress(),
        abi: ContractSubscriptionABI,
        functionName: 'purchaseAsset',
        args: [paymentTokenAddress, paymentTokenAmount],
    })
    const { hash, wait } = await writeContract(config)

    await wait()
    return hash
}
