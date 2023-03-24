import BigNumber from 'bignumber.js'

/** a > b */
export function isGreaterThan(a, b) {
    return new BigNumber(a).isGreaterThan(b)
}
