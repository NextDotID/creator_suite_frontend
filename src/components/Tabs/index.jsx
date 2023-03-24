import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const tabs = [
    { name: 'as icon', href: '#', current: true, icon: Squares2X2Icon },
    { name: 'as list', href: '#', current: false, icon: ListBulletIcon },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Tabs() {
    if (tabs.length) return <div />

    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    defaultValue={tabs.find((tab) => tab.current).name}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <nav className="flex space-x-4" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <a
                            key={tab.name}
                            href={tab.href}
                            className={classNames(
                                tab.current ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700',
                                'px-3 py-2 font-medium text-sm rounded-md',
                            )}
                            aria-current={tab.current ? 'page' : undefined}
                        >
                            <tab.icon
                                className={classNames(
                                    tab.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                                    '-ml-0.5 h-5 w-5',
                                )}
                                aria-hidden="true"
                            />
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    )
}
