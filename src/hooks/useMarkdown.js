import useSWR from 'swr'
import { dataURLtoText } from '../helpers/dataURLtoText'

export function useMarkdown(content) {
    return useSWR(
        `useMarkdown_${content.length}`,
        async () => {
            if (!content.startsWith('data:')) return content
            return dataURLtoText(content)
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
