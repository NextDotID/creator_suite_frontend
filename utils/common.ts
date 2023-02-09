import { EthereumAddress } from 'wallet.ts'
export function isValidAddress(address?: string) {
    if (!address) return false
    return EthereumAddress.isValid(address)
  }