'use client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { FontSize } from '@/types'

interface Props {
  content: string
  fontSize?: FontSize
  showLineNumbers?: boolean
}

const fontSizeClass: Record<FontSize, string> = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
}

export default function MarkdownRenderer({
  content,
  fontSize = 'md',
  showLineNumbers = true,
}: Props) {
  return (
    <div
      className={`mv-markdown ${fontSizeClass[fontSize]} ${
        showLineNumbers ? 'show-line-numbers' : ''
      } px-5 py-6`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
