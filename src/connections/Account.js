import {
    getAccount,
    getNetwork,
    connect as wagmiConnect,
    disconnect as wagmiDisconnect,
    switchNetwork as wagmiSwitchNetwork,
} from '@wagmi/core'
import { polygonMumbai } from '@wagmi/core/chains'
import { InjectedConnector } from '@wagmi/core/connectors/injected'
import { delay } from '../helpers/delay'

function createConnector() {
    return new InjectedConnector({
        chains: [polygonMumbai],
    })
}

export async function connect() {
    await wagmiConnect({
        chainId: polygonMumbai.id,
        connector: createConnector(),
    })
}

export async function disconnect() {
    await wagmiDisconnect()
}

export async function addNetwork() {
    const connector = createConnector()
    const provider = await connector.getProvider()
    await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
                chainId: '0x13881',
                chainName: 'Mumbai',
                nativeCurrency: {
                    name: 'Matic',
                    symbol: 'MATIC',
                    decimals: 18,
                },
                rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
                blockExplorerUrls: ['https://mumbai.polygonscan.com'],
            },
        ],
    })
}

export async function switchNetwork() {
    try {
        await wagmiSwitchNetwork({ chainId: polygonMumbai.id })
    } catch {
        await addNetwork()
    } finally {
        // mm needs a duration for syncing state
        await delay(1500)

        const { chain } = getNetwork()
        if (chain.id !== polygonMumbai.id) throw new Error('Failed to switch to mumbai network.')
    }
}

/**
 * Connect to the primary network if needed
 */
export async function connectIfNeeded() {
    const { isConnected } = getAccount()
    if (!isConnected) await connect()

    const { chain } = getNetwork()
    if (chain.id !== polygonMumbai.id) await switchNetwork()
}
