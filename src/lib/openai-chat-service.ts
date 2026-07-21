import type { ChatMessage, ExtractedUserProfile, RankedScheme, SchemeModel } from '@/types'

interface ChatGPTProxyResponse {
  content?: string
  error?: string
}

const CHATGPT_PROXY_URL = '/api/chatgpt'

export async function generateChatGPTSchemeResponse(params: {
  messages: ChatMessage[]
  userProfile: ExtractedUserProfile
  rankedSchemes: RankedScheme[]
  fallbackResponse: string
}): Promise<string> {
  const content = await callChatGPTProxy({
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content: buildSystemPrompt(),
      },
      {
        role: 'user',
        content: JSON.stringify(
          {
            conversation: params.messages.slice(-8).map((message) => ({
              role: message.role,
              content: message.content,
            })),
            extracted_user_profile: params.userProfile,
            ranked_schemes: params.rankedSchemes.slice(0, 6).map(formatSchemeForPrompt),
            required_response_style: {
              sections: [
                'Highly Relevant Schemes',
                'Possibly Relevant Schemes',
                'Additional Information Needed',
              ],
              rules: [
                'Recommend first, even when profile fields are missing.',
                'Do not invent benefits, eligibility rules, deadlines, or links.',
                'Use only ranked_schemes as sources.',
                'Ask follow-up questions only after recommendations.',
                'Keep links and source citations with each scheme.',
                'Use compact card-like formatting with match indicators.',
              ],
            },
          },
          null,
          2,
        ),
      },
    ],
  })

  return content || params.fallbackResponse
}

export async function extractProfileWithChatGPT(query: string): Promise<ExtractedUserProfile | null> {
  const content = await callChatGPTProxy({
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: `Extract a reusable Indian government scheme user profile from the user message.
Return only valid compact JSON with these optional keys:
caste, state, age, gender, occupation, education, income, disabilityStatus, isStudent, isFarmer, isWidow, isMinority, isStartupOwner, skillDevelopmentInterest, bplStatus.
Allowed values:
caste: General, OBC, SC, ST, EWS.
gender: Male, Female, Other.
occupation: Employed, Unemployed, Self-Employed, Student, Retired.
Do not guess missing values.`,
      },
      { role: 'user', content: query },
    ],
  })

  if (!content) return null

  try {
    const json = content.match(/\{[\s\S]*\}/)?.[0] ?? '{}'
    return JSON.parse(json) as ExtractedUserProfile
  } catch {
    return null
  }
}

async function callChatGPTProxy(payload: {
  temperature: number
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[]
}): Promise<string | null> {
  try {
    const response = await fetch(CHATGPT_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) return null

    const data = (await response.json()) as ChatGPTProxyResponse
    return data.content?.trim() || null
  } catch {
    return null
  }
}

function buildSystemPrompt(): string {
  return `You are a ChatGPT-powered Government Scheme Assistant for India.
Your job is to recommend schemes conversationally using the retrieved scheme context.

Behavior:
- Recommendation-first: never block recommendations because income, state, caste, age, or occupation is missing.
- Use partial profile data immediately.
- Separate Highly Relevant Schemes, Possibly Relevant Schemes, and Additional Information Needed.
- Explain confidence using the provided confidenceScore and matchedCriteria.
- Keep the response modern and card-like with concise sections, bullets, and apply links.
- Cite the official source URL provided for each scheme.
- If asked for documents, application process, deadlines, or details, answer from the scheme context.
- Never invent scheme facts, amounts, dates, or official links.`
}

function formatSchemeForPrompt(result: RankedScheme) {
  const scheme: SchemeModel = result.scheme

  return {
    rank: result.rank,
    confidenceScore: result.confidenceScore,
    matchStrength: result.matchStrength,
    matchedCriteria: result.matchedCriteria,
    missingInformation: result.missingInformation,
    disqualifyingCriteria: result.disqualifyingCriteria,
    scheme: {
      id: scheme.id,
      scheme_name: scheme.scheme_name,
      category: scheme.category,
      beneficiaries: scheme.beneficiaries,
      state: scheme.state,
      income_limit: scheme.income_limit,
      age_limit: scheme.age_limit,
      eligibility: scheme.eligibility,
      benefits: scheme.benefits,
      documents: scheme.documents,
      application_process: scheme.application_process,
      apply_link: scheme.apply_link,
      official_link: scheme.official_link,
      source: scheme.source,
      last_date: scheme.last_date,
    },
  }
}
