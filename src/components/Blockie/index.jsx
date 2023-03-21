import { useMemo } from 'react'
import makeBlockie from 'ethereum-blockies-base64'
import { isValidAddress } from '../../helpers/isValidAddress'

export function Blockie(props) {
    const { className, address } = props
    const url = useMemo(() => {
        if (!isValidAddress(address)) return
        return makeBlockie(address)
    }, [address])

    if (!url) return null
    return <img className={className} src={url} />
}
