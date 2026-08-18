import type { QueryIntent } from '@/lib/chatbot-service'
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
  queryIntent?: QueryIntent
}): Promise<string> {
  const intent = params.queryIntent ?? 'recommendation'

  const content = await callChatGPTProxy({
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content: buildSystemPrompt(intent),
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
            query_intent: intent,
            ranked_schemes: params.rankedSchemes.slice(0, 6).map(formatSchemeForPrompt),
            required_response_style: buildResponseStyle(intent),
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

function buildSystemPrompt(intent: QueryIntent): string {
  const base = `You are a ChatGPT-powered Government Scheme Assistant for India.
Your job is to answer user questions about government schemes using the retrieved scheme context.

CRITICAL RULE — Answer ONLY what the user asked:
- If the user asks about documents, list ONLY the required documents.
- If the user asks about eligibility, explain ONLY the eligibility criteria.
- If the user asks about benefits, describe ONLY the benefits.
- If the user asks how to apply, explain ONLY the application process.
- If the user asks about deadlines, state ONLY the deadline information.
- Do NOT dump all scheme details for every question.
- Keep responses concise and directly relevant to the question.
- Only provide a full overview when the user asks "tell me about" or asks for "details" or "overview".`

  const intentGuidance: Record<QueryIntent, string> = {
    documents: '\n\nThe user is asking about DOCUMENTS. List only the required documents. Do not include eligibility, benefits, or application steps.',
    eligibility: '\n\nThe user is asking about ELIGIBILITY. Explain only who qualifies, age limits, income limits, and category requirements. Do not list documents or application steps.',
    benefits: '\n\nThe user is asking about BENEFITS. Describe only what the beneficiary receives (money, subsidies, services). Do not list documents or eligibility.',
    application_process: '\n\nThe user is asking HOW TO APPLY. Explain only the step-by-step application process and provide the apply link. Do not list documents or eligibility.',
    deadline: '\n\nThe user is asking about DEADLINES. State only the last date to apply or indicate if the deadline is rolling/ongoing. Do not list other details.',
    overview: '\n\nThe user wants a FULL OVERVIEW. Provide a comprehensive summary including benefits, eligibility, documents, and how to apply — but keep it organized and concise.',
    recommendation: '\n\nThe user wants SCHEME RECOMMENDATIONS. Recommend relevant schemes based on their profile. Use card-like formatting with match indicators, but keep each scheme summary brief.',
  }

  return base + (intentGuidance[intent] || '') + `

Additional behavior:
- Recommendation-first: never block recommendations because profile fields are missing.
- Use partial profile data immediately.
- Never invent scheme facts, amounts, dates, or official links.
- Cite the official source URL provided for each scheme.
- Ask follow-up questions only after answering the user's question.`
}

function buildResponseStyle(intent: QueryIntent) {
  if (intent === 'recommendation') {
    return {
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
    }
  }

  return {
    rules: [
      'Answer ONLY the specific question asked.',
      'Do not include unrelated scheme sections.',
      'Keep the response concise and focused.',
      'Use only ranked_schemes as sources.',
      'Do not invent facts, amounts, dates, or links.',
      'Include the apply/official link only when relevant to the question.',
    ],
  }
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
