import CONTENT_SUBSCRIPTION from '../constants/ContentSubscription.json'
import { isValidAddress } from './isValidAddress'

export function getSubscriptionContractAddress() {
    const address = CONTENT_SUBSCRIPTION['Mumbai']
    if (!isValidAddress(address)) throw new Error('Invalid contract address.')
    return address
}
