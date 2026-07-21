import { Send } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props {
  onSend: (text: string) => void
  loading: boolean
}

const quickQuestions = [
  'chat.quick1',
  'chat.quick2',
  'chat.quick3',
] as const

export function ChatInput({ onSend, loading }: Props) {
  const { t } = useTranslation()
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onSend(text)
    setText('')
  }

  return (
    <div className="space-y-2 border-t p-3">
      <div className="flex flex-wrap gap-2">
        {quickQuestions.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onSend(t(key))}
            disabled={loading}
            className="rounded-full border px-2 py-1 text-xs hover:bg-muted"
          >
            {t(key)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('chat.placeholder')}
          disabled={loading}
        />
        <Button type="submit" size="icon" disabled={loading || !text.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}