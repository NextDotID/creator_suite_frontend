import useSWR from 'swr'
import { getAllPurchasedCreations } from '../database'

/**
 * Use all purchased creations
 * @param {string} buyer
 * @returns
 */
export function useAllPurchasedCreations(buyer) {
    return useSWR(`useAllPurchasedCreations_${buyer}`, async () => {
        return getAllPurchasedCreations(buyer)
    })
}
