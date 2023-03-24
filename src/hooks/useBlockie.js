import makeBlockie from 'ethereum-blockies-base64'
import { isValidAddress } from '../helpers/isValidAddress'

/**
 * Blokie in base64
 * @param {string} address
 */
export function useBlockie(address) {
    if (!isValidAddress(address)) return
    return makeBlockie(address)
}
