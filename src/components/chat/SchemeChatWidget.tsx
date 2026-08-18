import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2, MessageCircle, Minimize2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChatInput } from './ChatInput'
import { ChatMessage } from './ChatMessage'
import { useSchemeChat } from '@/hooks/useSchemeChat'

export function SchemeChatWidget() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { messages, loading, error, sendMessage, clearChat } = useSchemeChat()

  // Close fullscreen on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  const handleClose = () => {
    setOpen(false)
    setIsFullscreen(false)
  }

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
          <>
            {/* Backdrop for fullscreen mode */}
            {isFullscreen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
                onClick={() => setIsFullscreen(false)}
              />
            )}

            <motion.div
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={
                isFullscreen
                  ? 'fixed inset-4 z-[60] md:inset-8 lg:inset-16'
                  : 'fixed bottom-36 right-4 z-50 w-[min(100vw-2rem,380px)] md:bottom-24'
              }
            >
              <Card
                className={
                  isFullscreen
                    ? 'flex h-full flex-col overflow-hidden shadow-2xl'
                    : 'flex h-[min(70vh,520px)] flex-col overflow-hidden shadow-xl'
                }
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className={isFullscreen ? 'text-lg font-semibold' : 'font-semibold'}>
                      {t('chat.title')}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {t('chat.subtitle')}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={clearChat}>
                      {t('chat.clear')}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setIsFullscreen((v) => !v)}
                      aria-label={isFullscreen ? 'Minimize chat' : 'Maximize chat'}
                    >
                      {isFullscreen ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleClose}
                      aria-label="Close chat"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-3 overflow-y-auto p-4" role="log">
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} isFullscreen={isFullscreen} />
                  ))}
                  {loading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="inline-flex gap-1">
                        <span className="animate-bounce" style={{ animationDelay: '0ms' }}>●</span>
                        <span className="animate-bounce" style={{ animationDelay: '150ms' }}>●</span>
                        <span className="animate-bounce" style={{ animationDelay: '300ms' }}>●</span>
                      </span>
                      {t('chat.thinking')}
                    </div>
                  )}
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <ChatInput onSend={sendMessage} loading={loading} isFullscreen={isFullscreen} />
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}