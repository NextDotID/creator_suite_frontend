import { EthereumAddress } from 'wallet.ts'

/**
 * Validate an Ethereum address
 * @param {string} address
 * @returns
 */
export function isValidAddress(address) {
    if (!address) return false
    return EthereumAddress.isValid(address)
}
