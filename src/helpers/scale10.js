import BigNumber from 'bignumber.js'

/** scale 10 ** n * m */
export function scale10(m, n = 1) {
    const x = new BigNumber(1).shiftedBy(n)
    return n === 1 ? x : x.multipliedBy(m)
}
