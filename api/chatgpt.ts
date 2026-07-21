const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

interface ChatGPTRequest {
  model?: string
  temperature?: number
  messages?: {
    role: 'system' | 'user' | 'assistant'
    content: string
  }[]
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  const model = process.env.OPENAI_MODEL ?? req.body?.model ?? 'chat-latest'

  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured' })
  }

  const body = req.body as ChatGPTRequest

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return res.status(400).json({ error: 'messages are required' })
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: body.temperature ?? 0.2,
        messages: body.messages,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message ?? 'OpenAI request failed',
      })
    }

    return res.status(200).json({
      content: data?.choices?.[0]?.message?.content ?? '',
    })
  } catch {
    return res.status(500).json({ error: 'Unable to reach OpenAI' })
  }
}
