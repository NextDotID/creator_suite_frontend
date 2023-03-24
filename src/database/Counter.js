import { createInstance } from 'localforage'
import { formatEthereumAddress } from '../helpers/formatEthereumAddress'

const INITIAL_COUNT = 1

const counterStore = createInstance({
    name: 'Counter',
    version: 3,
})

export async function getCount(owner) {
    const key = formatEthereumAddress(owner)
    const counter = await counterStore.getItem(key)

    if (counter === null) {
        await counterStore.setItem(key, INITIAL_COUNT)
    }
    return counterStore.getItem(key)
}

export async function commitCount(owner) {
    const key = formatEthereumAddress(owner)
    const count = await getCount(key)
    return counterStore.setItem(key, count + 1)
}
