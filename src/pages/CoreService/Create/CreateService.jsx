import { useCallback, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetcher } from '../../../helpers/fetcher'

export function CreateService() {
    const { state } = useLocation()
    const navigate = useNavigate()

    const { name, injections } = state ?? {}
    const [prompts, setPrompts] = useState({})

    useEffect(() => {
        if (!injections) {
            navigate('/core-service/create/prepare', { replace: true })
        }
    }, [!injections])

    const create = useCallback(async () => {
        await fetcher(`/api/service/${name}/create`, {
            method: 'POST',
            body: JSON.stringify({
                Prompts: prompts,
            }),
        })
        // TODO Check result
        navigate('/core-service')
    }, [name, prompts, navigate])

    const isInvalid = Object.values(prompts).filter((x) => !x).length > 0

    console.log('injections', injections)

    if (!injections) return null

    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h2 className="text-2xl font-semibold text-gray-900">Create</h2>
            </div>
            <form className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200">
                    {injections.map((injection) => {
                        const key = injection.Key
                        return (
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6" key={key}>
                                <div className="sm:col-span-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        {key}
                                    </label>
                                    <div className="mt-1 flex rounded-md max-w-lg">
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={prompts[key]}
                                            onChange={(evt) => {
                                                setPrompts((map) => ({ ...map, [key]: evt.target.value }))
                                            }}
                                            autoComplete="name"
                                            placeholder={`Input ${key}`}
                                            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm invalid:border-red-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            disabled={isInvalid}
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:shadow-none"
                            onClick={create}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
