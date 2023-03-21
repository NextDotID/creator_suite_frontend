import { EthereumAddress } from 'wallet.ts'
import { isValidAddress } from './isValidAddress'

/**
 * Format an Ethereum address
 * @param {string} address
 * @param {number} size
 * @returns
 */
export function formatEthereumAddress(address, size = 0) {
    if (!isValidAddress(address)) return address
    const address_ = EthereumAddress.checksumAddress(address)
    if (size === 0 || size >= 20) return address_
    return `${address_.slice(0, Math.max(0, 2 + size))}...${address_.slice(-size)}`
}
