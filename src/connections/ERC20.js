import { prepareWriteContract, readContract, writeContract } from '@wagmi/core'
import { polygonMumbai } from '@wagmi/core/chains'
import ERC20ABI from '../abis/ERC20.json'
import { isValidAddress } from '../helpers/isValidAddress'

/**
 * Return the balance of the owner on the ERC20 contract
 */
export async function balanceOf(address, owner) {
    if (!isValidAddress(address)) throw new Error('Not a valid contract address.')
    if (!isValidAddress(owner)) throw new Error('Not a valid owner address.')

    const balance = await readContract({
        chainId: polygonMumbai.id,
        address,
        abi: ERC20ABI,
        functionName: 'balanceOf',
        args: [owner],
    })
    return balance.toString()
}

/**
 * Return the allowance of the owner on the spender
 * @param {string} address
 * @param {string} owner
 * @returns
 */
export async function allowance(address, owner, spender) {
    if (!isValidAddress(address)) throw new Error('Not a valid contract address.')
    if (!isValidAddress(owner)) throw new Error('Not a valid owner address.')
    if (!isValidAddress(spender)) throw new Error('Not a valid spender address.')
    console.log(address, owner,spender)
    const amount = await readContract({
        chainId: polygonMumbai.id,
        address,
        abi: ERC20ABI,
        functionName: 'allowance',
        args: [owner, spender],
        overrides: {
            from: owner,
        },
    })
    return amount.toString()
}

/**
 * Approve amount of tokens for spender
 * @param {string} address
 * @param {string} spender
 * @param {string} amount
 * @returns
 */
export async function approve(address, spender, amount) {
    if (!isValidAddress(spender)) throw new Error('Not a valid spender address.')

    const config = await prepareWriteContract({
        chainId: polygonMumbai.id,
        address,
        abi: ERC20ABI,
        functionName: 'approve',
        args: [spender, amount],
    })
    const { hash, wait } = await writeContract(config)

    await wait()
    return hash
}
