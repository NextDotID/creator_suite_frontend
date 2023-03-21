import BigNumber from 'bignumber.js'

/** a >= b */
export function isGreaterThanOrEqualTo(a, b) {
    return new BigNumber(a).isGreaterThanOrEqualTo(b)
}
