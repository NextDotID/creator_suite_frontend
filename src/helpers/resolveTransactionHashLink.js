import { polygonMumbai } from '@wagmi/chains'

export function resolveTransactionHashLink(chainId, transactionHash) {
    switch (chainId) {
        case polygonMumbai.id:
            return `https://mumbai.polygonscan.com/tx/${transactionHash}`
        default:
            return ''
    }
}
