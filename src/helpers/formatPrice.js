import BigNumber from 'bignumber.js'

export function formatPrice(amount, symbol) {
    const _amount = new BigNumber(amount ?? '0')
    if (_amount.isZero() || _amount.isLessThan(0.01)) return ''
    if (_amount.isLessThan(1)) return `${_amount.toFixed(2)} ${symbol}`
    if (_amount.isLessThan(1000)) return `${_amount.toFixed(1)} ${symbol}`
    if (_amount.isLessThan(1000000)) return `${_amount.div(1000000).toFixed(1)}K ${symbol}`
    return `${_amount.div(1000000).toFixed(1)}M ${symbol}`
}
