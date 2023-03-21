import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import TOKEN_LIST from '../../constants/TokenList.json'
import { classNames } from '../../helpers/classNames'
import { isSameAddress } from '../../helpers/isSameAddress'

export function TokenListMenu(props) {
    const tokens = TOKEN_LIST['Mumbai']
    const selectedToken = tokens.find((x) => isSameAddress(x.address, props.selectedTokenAddress)) ?? tokens[0]

    const onSelect = (token) => {
        props.onChange(token)
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            {
                <div>
                    <Menu.Button className="group flex items-center w-full rounded-l-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        <img className="w-5 h-5 mr-2" src={selectedToken.logoURI} alt={selectedToken.symbol} />
                        <span>{selectedToken.symbol}</span>
                    </Menu.Button>
                </div>
            }
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="w-40 absolute right-0 left-0 z-10 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {tokens.map((x) => {
                            return (
                                <Menu.Item key={x.address} onClick={() => onSelect(x)}>
                                    {({ active }) => (
                                        <Link
                                            to="/creation/create"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm',
                                            )}
                                        >
                                            <div className="flex items-center">
                                                <img className="w-5 h-5 mr-2" src={x.logoURI} alt={x.symbol} />
                                                <span>{x.name}</span>
                                            </div>
                                        </Link>
                                    )}
                                </Menu.Item>
                            )
                        })}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
