import BigNumber from 'bignumber.js'

/**
 * 10 ** n
 */
export function pow10(n) {
    return new BigNumber(10).pow(n)
}
