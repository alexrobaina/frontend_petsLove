import { FC, useCallback, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import FadeIn from '../../components/FadeIn'
import { Header } from '../../components/common/Header'
import { getCookie } from '../../utils/getCookie'

import { markdownEN, markdownES, markdownFR } from './constants'

export const TermsPage: FC = () => {
  const [markdown, setMarkdown] = useState('')
  const lang = getCookie('i18next')

  const getLanguage = useCallback(() => {
    switch (lang) {
      case 'en':
        console.log('asgfasgasgasgasas')
        setMarkdown(markdownEN)
        break
      case 'es':
        setMarkdown(markdownES)
        break
      case 'fr':
        setMarkdown(markdownFR)
        break
      default:
        setMarkdown(markdownEN) // Default to English if no match
        break
    }
  }, [lang])

  useEffect(() => {
    getLanguage()
  }, [getLanguage, lang])

  const customRenderers = {
    h1: ({ ...props }) => <h1 className="text-4xl font-bold mb-4" {...props} />,
    h2: ({ ...props }) => (
      <h2 className="text-3xl font-semibold mb-3" {...props} />
    ),
    p: ({ ...props }) => (
      <p className="text-lg mb-2 leading-relaxed" {...props} />
    ),
    ul: ({ ...props }) => (
      <ul className="list-disc list-inside mb-4" {...props} />
    ),
    li: ({ ...props }) => <li className="mb-1" {...props} />,
    a: ({ ...props }) => (
      <a className="text-blue-500 hover:underline" {...props} />
    ),
    blockquote: ({ ...props }) => (
      <blockquote
        className="border-l-4 border-gray-300 pl-4 italic text-gray-700"
        {...props}
      />
    ),
  }

  return (
    <div className="pb-32">
      <header className="flex gap-5">
        <Header buttonBack />
      </header>
      <FadeIn className="container mx-auto py-10">
        {markdown && (
          <ReactMarkdown
            components={customRenderers}
            remarkPlugins={[remarkGfm]}
          >
            {markdown}
          </ReactMarkdown>
        )}
      </FadeIn>
    </div>
  )
}
