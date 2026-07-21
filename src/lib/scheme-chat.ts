import { sendRagChatMessage } from '@/lib/chatbot-service'
import type { ChatMessage, UserProfile } from '@/types'

export async function sendSchemeChatMessage(
  messages: ChatMessage[],
  locale: string,
  profile?: UserProfile | null,
): Promise<string> {
  return sendRagChatMessage(messages, locale, profile)
}
