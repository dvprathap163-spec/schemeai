import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChatInput } from './ChatInput'
import { ChatMessage } from './ChatMessage'
import { useSchemeChat } from '@/hooks/useSchemeChat'

export function SchemeChatWidget() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const { messages, loading, error, sendMessage, clearChat } = useSchemeChat()

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-lg md:bottom-6"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('chat.open')}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-36 right-4 z-50 w-[min(100vw-2rem,380px)] md:bottom-24"
          >
            <Card className="flex h-[min(70vh,520px)] flex-col overflow-hidden shadow-xl">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div>
                  <p className="font-semibold">{t('chat.title')}</p>
                  <p className="text-xs text-muted-foreground">{t('chat.subtitle')}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={clearChat}>
                  {t('chat.clear')}
                </Button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-4" role="log">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {loading && (
                  <p className="text-sm text-muted-foreground">{t('chat.thinking')}</p>
                )}
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>

              <ChatInput onSend={sendMessage} loading={loading} />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}