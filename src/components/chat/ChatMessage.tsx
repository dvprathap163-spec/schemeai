import type { ChatMessage as ChatMessageType } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  message: ChatMessageType
  isFullscreen?: boolean
}

export function ChatMessage({ message, isFullscreen }: Props) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'rounded-2xl px-3 py-2 whitespace-pre-wrap',
          isFullscreen ? 'max-w-[70%] text-base' : 'max-w-[85%] text-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground',
        )}
      >
        {message.content}
      </div>
    </div>
  )
}