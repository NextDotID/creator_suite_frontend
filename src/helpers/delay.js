/**
 * Delay to resolve a Promise
 * @param duration
 * @returns
 */
export function delay(duration = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined)
        }, duration)
    })
}
