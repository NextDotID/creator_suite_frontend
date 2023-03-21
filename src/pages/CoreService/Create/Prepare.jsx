import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetcher } from '../../../helpers/fetcher'

export function Prepare() {
    const navigate = useNavigate()
    const [name, setName] = useState('auth')
    const deploy = useCallback(async () => {
        const res = await fetcher(`/api/service/${name}/prepare`, {
            method: 'POST',
            body: JSON.stringify({
                Source: 'https://github.com/hmqgg/auth-server-demo-template/archive/refs/heads/main.zip',
            }),
        })
        navigate('/core-service/create/create', {
            state: {
                name,
                injections: res.Injections,
            },
        })
    }, [name])

    return (
        <div className="bg-white py-12 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h2 className="text-2xl font-semibold text-gray-900">Prepare</h2>
            </div>
            <form className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <div className="mt-1 flex rounded-md max-w-lg">
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(evt) => setName(evt.target.value)}
                                        autoComplete="name"
                                        placeholder="Input Service Name"
                                        className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={(evt) => {
                                evt.preventDefault()
                                deploy()
                            }}
                        >
                            Prepare
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
