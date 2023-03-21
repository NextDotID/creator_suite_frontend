import { isValidAddress } from './isValidAddress'

/**
 * Compare two address
 * @param {string} a
 * @param {string} b
 * @returns
 */
export function isSameAddress(a, b) {
    if (!a || !b) return false
    if (!isValidAddress(a) || !isValidAddress(b)) return false
    return a.toLowerCase() === b.toLowerCase()
}
