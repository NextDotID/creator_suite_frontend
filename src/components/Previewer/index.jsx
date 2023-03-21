import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { getFileType } from '../../helpers/getFileType'
import { Markdown } from '../Markdown'

export function Previewer(props) {
    const type = getFileType(props.attachment)

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => props.setOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 left-0 right-0 flex max-w-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300 sm:duration-700"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transform transition ease-in-out duration-300 sm:duration-700"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                                    {props.title}
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        onClick={() => props.setOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            {/* Replace with your content */}
                                            <div className="absolute inset-0 px-4 sm:px-6">
                                                <div
                                                    className="h-full border-2 border-solid border-gray-200 flex items-center justify-center"
                                                    aria-hidden="true"
                                                >
                                                    {type === 'img' ? (
                                                        <img
                                                            className="max-w-full max-h-full"
                                                            src={props.attachment.content}
                                                        />
                                                    ) : type === 'txt' || type === 'md' ? (
                                                        <div className="overflow-auto max-h-full px-4 py-4">
                                                            <Markdown>{props.attachment.content}</Markdown>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            {/* /End replace */}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
