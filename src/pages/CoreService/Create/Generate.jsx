import { utils } from 'ethers'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount, useConnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { fetcher } from '../../../helpers/fetcher'

export function Generate() {
    const { isConnected } = useAccount()
    const navigate = useNavigate()

    const { connectAsync } = useConnect({
        connector: new InjectedConnector(),
        onSuccess(result) {
            console.log(result)
        },
    })

    const setup = useCallback(async (signature, pubkey) => {
        await fetcher('/api/core/setup', {
            method: 'POST',
            body: JSON.stringify({
                SUBKEY: {
                    PUBLIC: '',
                    SIGNATURE: signature,
                    AVATAR: pubkey,
                    PRIVATE: '',
                },
                HOST: {
                    DOMAIN: 'mask.io',
                },
            }),
        })
    }, [])

    const { signMessage, signMessageAsync } = useSignMessage()

    const signPubkey = useCallback(async () => {
        const result = await fetcher('/api/core/generate', {
            method: 'POST',
        })
        const alreadySetup = result.status === 500 && result.detail === 'already setup'
        const conflict = result.status === 409 && result.detail === 'Already setup.'
        if (alreadySetup || conflict) {
            navigate('/core-service/create/choose')
            return
        }
        const message = `Subkey certification signature: ${result.SubkeyPublic}`

        const signature = await signMessageAsync({ message })
        const digest = utils.arrayify(utils.hashMessage(message))
        const pubkey = utils.computePublicKey(utils.recoverPublicKey(digest, signature), true)
        const addr = utils.recoverAddress(digest, signature)

        console.log('pubkey', { pubkey, addr })
        await setup(signature, pubkey)
        navigate('/core-service/create/deploy')
    }, [signMessage, setup, navigate])

    return (
        <div className="bg-white py-12 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h2 className="text-2xl font-semibold text-gray-900">Generate</h2>
            </div>
            <div className="mx-auto max-w-2xl py-24 sm:py-24 lg:max-w-7xl">
                <button
                    type="button"
                    className="order-0 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
                    onClick={async () => {
                        if (!isConnected) {
                            await connectAsync()
                        }
                        await signPubkey()
                    }}
                >
                    {isConnected ? 'Generate' : 'Connect and Generate'}
                </button>
            </div>
        </div>
    )
}
