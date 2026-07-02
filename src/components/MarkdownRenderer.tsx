'use client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { FontSize } from '@/types'

interface Props {
  content: string
  fontSize?: FontSize
}

const fontSizeClass: Record<FontSize, string> = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
}

export default function MarkdownRenderer({ content, fontSize = 'md' }: Props) {
  return (
    <div className={`mv-markdown ${fontSizeClass[fontSize]} px-5 py-6 flex-1 overflow-y-auto`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
