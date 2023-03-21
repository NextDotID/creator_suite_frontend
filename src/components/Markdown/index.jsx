import ReactMarkdown from 'react-markdown'
import RemarkGfm from 'remark-gfm'
import RehypeRaw from 'rehype-raw'
import { useMarkdown } from '../../hooks/useMarkdown'
import { Spinner } from '../Spinner'

export function Markdown(props) {
    const { data: markdown, isValidating } = useMarkdown(props.children)

    if (isValidating) return <Spinner />
    if (!markdown) return <p className="text-gray-500">Something went wrong.</p>

    return (
        <ReactMarkdown
            className="markdown-body"
            remarkPlugins={[[RemarkGfm, { singleTilde: false }]]}
            rehypePlugins={[RehypeRaw]}
            linkTarget="_blank"
        >
            {markdown}
        </ReactMarkdown>
    )
}
