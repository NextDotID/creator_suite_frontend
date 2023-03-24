import { useEnsAvatar, useEnsName } from 'wagmi'
import { mainnet } from '@wagmi/chains'
import { useBlockie } from '../../hooks/useBlockie'
import { formatEthereumAddress } from '../../helpers/formatEthereumAddress'

export function Avatar({ address }) {
    const ownerBlockie = useBlockie(address)
    const { data: ensName } = useEnsName({ chainId: mainnet.id, address })
    const { data: ensAvatar } = useEnsAvatar({ chainId: mainnet.id, address })

    return (
        <img
            className="h-6 w-6 flex-shrink-0 rounded-full bg-gray-300 mr-1"
            src={ensAvatar || ownerBlockie}
            title={ensName || formatEthereumAddress(address)}
            alt={ensName || formatEthereumAddress(address)}
        />
    )
}
