import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEligibility } from '@/contexts/EligibilityContext'
import { sendSchemeChatMessage } from '@/lib/scheme-chat'
import type { ChatMessage } from '@/types'

function createMessage(role: ChatMessage['role'], content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: Date.now(),
  }
}

export function useSchemeChat() {
  const { i18n, t } = useTranslation()
  const { profile } = useEligibility()
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createMessage('assistant', t('chat.welcome')),
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim()
      if (!trimmed || loading) return

      const nextMessages = [...messages, createMessage('user', trimmed)]
      setMessages(nextMessages)
      setLoading(true)
      setError(null)

      try {
        const reply = await sendSchemeChatMessage(nextMessages, i18n.language, profile)
        setMessages((prev) => [...prev, createMessage('assistant', reply)])
      } catch {
        setError(t('chat.error'))
      } finally {
        setLoading(false)
      }
    },
    [messages, loading, i18n.language, profile, t],
  )

  const clearChat = useCallback(() => {
    setMessages([createMessage('assistant', t('chat.welcome'))])
    setError(null)
  }, [t])

  return { messages, loading, error, sendMessage, clearChat }
}