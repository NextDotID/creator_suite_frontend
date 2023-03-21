import { useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import { DocumentPlusIcon } from '@heroicons/react/24/outline'
import TokenList from '../../constants/TokenList.json'
import { CreatedNotification } from '../CreatedNotification'
import { useCreateCreation } from '../../hooks/useCreateCreation'
import { isZero } from '../../helpers/isZero'
import { isValidAddress } from '../../helpers/isValidAddress'
import { TokenListMenu } from '../TokenListMenu'
import { scale10 } from '../../helpers/scale10'

const defaultPaymentToken = TokenList['Mumbai'][0]

export function Create() {
    const [success, setSuccess] = useState(false)
    const [showCreatedNotification, setShowCreatedNotification] = useState(false)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [paymentToken, setPaymentToken] = useState(defaultPaymentToken)
    const [paymentTokenAmount, setPaymentTokenAmount] = useState('')
    const [attachments, setAttachments] = useState([])

    const { address } = useAccount()

    const [submitted, setSubmitted] = useState(false)

    const validationMessage = useMemo(() => {
        if (!name) return 'Please enter creation name.'
        if (!paymentToken.address) return 'Please select the price token.'
        if (!isValidAddress(paymentToken.address)) return 'Please select a valid price token.'
        if (isZero(paymentTokenAmount)) return 'Please enter price.'
        if (!attachments.length) return 'Please upload your creation.'
        const attachment = attachments[0]
        if (
            !attachment.name.endsWith('.md') &&
            !attachment.name.endsWith('.pdf') &&
            !attachment.content.includes('text/') &&
            !attachment.content.includes('image/') &&
            !attachment.content.includes('application/pdf')
        )
            return 'The given attachment not supported.'
        return ''
    }, [name, paymentToken, paymentTokenAmount, attachments])

    const creation = useMemo(() => {
        return {
            name,
            description,
            ownerAddress: address,
            paymentTokenAddress: paymentToken.address,
            paymentTokenAmount: scale10(paymentTokenAmount, paymentToken.decimals).toFixed(),
            attachments,
        }
    }, [address, name, description, paymentToken, paymentTokenAmount, attachments])

    const { trigger, isMutating } = useCreateCreation(creation)

    return (
        <>
            <CreatedNotification
                success={success}
                show={showCreatedNotification}
                setShow={setShowCreatedNotification}
            />
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <form className="space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div>
                            <div>
                                <h3 className="text-2xl font-medium leading-6 text-gray-900">List for sale</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Your creation will be stored in an encrypted form on the server and can only be
                                    viewed by anyone who makes a payment through a smart contract.
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1 flex rounded-md max-w-lg">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="name"
                                            placeholder="Item name"
                                            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        The description will be included on the creation's detail page.{' '}
                                        <a
                                            className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                                            href="https://www.markdownguide.org/"
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            Markdown
                                        </a>{' '}
                                        syntax is supported.
                                    </p>
                                </div>

                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="price"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Set price
                                    </label>
                                    <div className="mt-1 sm:col-span-2">
                                        <div className="flex max-w-lg rounded-md">
                                            <div className="block rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                                <TokenListMenu
                                                    selectedTokenAddress={paymentToken.address}
                                                    onChange={(token) => {
                                                        setPaymentToken(token)
                                                    }}
                                                />
                                            </div>
                                            <input
                                                type="number"
                                                name="price"
                                                id="price"
                                                autoComplete="price"
                                                placeholder="Amount"
                                                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm focus:z-10"
                                                value={paymentTokenAmount}
                                                onChange={(event) => setPaymentTokenAmount(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                                        Upload your creation
                                    </label>
                                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                        <div className="space-y-1 text-center">
                                            <DocumentPlusIcon
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                            />
                                            <div className="flex justify-center text-sm text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={(event) => {
                                                            event.preventDefault()
                                                            event.stopPropagation()

                                                            // no file
                                                            const file = event.target.files[0]
                                                            if (!file) return

                                                            // read as base64
                                                            const reader = new FileReader()

                                                            reader.addEventListener('loadend', () => {
                                                                setAttachments([
                                                                    {
                                                                        name: file.name,
                                                                        content: reader.result,
                                                                    },
                                                                ])
                                                            })
                                                            reader.readAsDataURL(file)
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {attachments.length
                                                    ? attachments[0].name
                                                    : 'PDF, Markdown, PNG, JPG, GIF up to 10MB'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end">
                            {
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:shadow-none"
                                    disabled={!!validationMessage || isMutating}
                                    onClick={async (ev) => {
                                        ev.preventDefault()
                                        ev.stopPropagation()

                                        setSubmitted(true)

                                        try {
                                            await trigger()
                                            setSuccess(true)

                                            // reset
                                            setName('')
                                            setDescription('')
                                            setPaymentToken(defaultPaymentToken)
                                            setPaymentTokenAmount('')
                                            setAttachments([])
                                            setSubmitted(false)
                                        } catch {
                                            setSuccess(false)
                                        } finally {
                                            setShowCreatedNotification(true)
                                        }
                                    }}
                                >
                                    {isMutating
                                        ? 'Listing...'
                                        : submitted
                                        ? validationMessage || 'Complete Listing'
                                        : 'Complete Listing'}
                                </button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
