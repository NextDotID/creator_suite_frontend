import { useEnsName } from 'wagmi'
import { mainnet } from '@wagmi/chains'
import { Avatar } from '../Avatar'
import { formatEthereumAddress } from '../../helpers/formatEthereumAddress'

export function Account({ address }) {
    const { data: ensName } = useEnsName({ chainId: mainnet.id, address: address })

    return (
        <div className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 focus:outline-none">
            <span className="flex w-full items-center justify-between">
                <span className="flex w-full items-center justify-between space-x-3">
                    <Avatar address={address} />
                    <span className="flex w-full flex-col">
                        {ensName ? <span className="truncate text-sm font-medium text-gray-900">{ensName}</span> : null}
                        <span className="truncate text-sm text-gray-500">{formatEthereumAddress(address, 4)}</span>
                    </span>
                </span>
            </span>
        </div>
    )
}
