import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { mainnet, polygon, polygonMumbai } from '@wagmi/chains'

const { provider, webSocketProvider } = configureChains(
    [mainnet, polygon, polygonMumbai],
    [
        // options:
        // d74bd8586b9e44449cef131d39ceeefb
        // d65858b010d249419cf8687eca12b094
        // a9d66980bf334e59a42ca19095f3daeb
        // f39cc8734e294fba9c3938486df2b1bc
        // 659123dd11294baf8a294d7a11cec92c
        infuraProvider({
            apiKey: 'd74bd8586b9e44449cef131d39ceeefb',
        }),
    ],
)

const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
})

export function WagmiProvider(props) {
    return <WagmiConfig client={client}>{props.children}</WagmiConfig>
}
