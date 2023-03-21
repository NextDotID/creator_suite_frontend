import { EthereumAddress } from 'wallet.ts'
export function isValidAddress(address) {
    if (!address) return false
    return EthereumAddress.isValid(address)
  }