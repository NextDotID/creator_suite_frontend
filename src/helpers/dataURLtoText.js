import { dataURLtoBlob } from './dataURLtoBlob'

export function dataURLtoText(dataURL) {
    return new Promise((resolve, reject) => {
        try {
            const blob = dataURLtoBlob(dataURL)
            const reader = new FileReader()

            reader.onloadend = () => {
                resolve(reader.result)
            }
            reader.onerror = () => {
                reject(reader.error)
            }

            reader.readAsText(blob)
        } catch (error) {
            reject(error)
        }
    })
}
