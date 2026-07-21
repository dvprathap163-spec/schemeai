import { INDIAN_STATES } from '@/data/states'
import { getRelevantSchemes } from '@/lib/eligibility-service'
import { extractProfileWithChatGPT, generateChatGPTSchemeResponse } from '@/lib/openai-chat-service'
import { getSchemeByQuery, mergeProfiles } from '@/lib/scheme-service'
import type { ChatMessage, ExtractedUserProfile, RankedScheme, SchemeModel, UserProfile } from '@/types'

export async function sendRagChatMessage(
  messages: ChatMessage[],
  locale: string,
  storedProfile?: UserProfile | null,
): Promise<string> {
  const userMessages = messages.filter((message) => message.role === 'user')
  const lastUserMessage = userMessages.at(-1)

  if (!lastUserMessage) {
    return locale === 'hi' ? 'Please type your question.' : 'Please type your question.'
  }

  const userQuery = lastUserMessage.content
  const baseProfile = storedProfile ? mapUserProfile(storedProfile) : {}
  const memoryProfile = await extractConversationProfile(userMessages)
  const userProfile = mergeProfiles(baseProfile, memoryProfile)
  const namedScheme = getSchemeByQuery(userQuery)

  if (namedScheme && isSchemeDetailQuestion(userQuery)) {
    const rankedScheme = buildSingleSchemeResult(namedScheme)
    const fallbackResponse = formatSchemeDetails(namedScheme, userProfile)

    return generateChatGPTSchemeResponse({
      messages,
      userProfile,
      rankedSchemes: [rankedScheme],
      fallbackResponse,
    })
  }

  const rankedSchemes = await getRelevantSchemes(userProfile, userQuery)
  const usefulSchemes = rankedSchemes
    .filter((result) => result.confidenceScore >= 20)
    .slice(0, 6)

  if (!usefulSchemes.length) {
    return formatNoMatch(userProfile)
  }

  const fallbackResponse = formatRecommendationResponse(userQuery, userProfile, usefulSchemes)

  return generateChatGPTSchemeResponse({
    messages,
    userProfile,
    rankedSchemes: usefulSchemes,
    fallbackResponse,
  })
}

export async function extractUserProfileFromQuery(query: string): Promise<ExtractedUserProfile> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY ?? import.meta.env.VITE_GEMINI_API_KEY

  const chatGPTProfile = await extractProfileWithChatGPT(query)
  if (chatGPTProfile) return mergeProfiles(extractProfileWithRules(query), sanitizeProfile(chatGPTProfile))

  if (apiKey) {
    const llmProfile = await extractProfileWithLlm(query, apiKey)
    if (llmProfile) return mergeProfiles(extractProfileWithRules(query), llmProfile)
  }

  return extractProfileWithRules(query)
}

async function extractConversationProfile(messages: ChatMessage[]): Promise<ExtractedUserProfile> {
  let profile: ExtractedUserProfile = {}

  for (const message of messages) {
    profile = mergeProfiles(profile, await extractUserProfileFromQuery(message.content))
  }

  return profile
}

function mapUserProfile(profile: UserProfile): ExtractedUserProfile {
  return {
    caste: profile.casteCategory,
    state: profile.state,
    age: profile.age,
    gender: profile.gender,
    occupation: profile.employmentStatus,
    education: profile.qualification,
    income: profile.familyIncome,
    disabilityStatus: profile.disabilityStatus,
    isStudent: profile.isStudent,
    isFarmer: profile.isFarmer,
    isWidow: profile.isWidow,
    isMinority: profile.isMinority,
    isSeniorCitizen: profile.isSeniorCitizen,
    isStartupOwner: profile.isStartupOwner,
    skillDevelopmentInterest: profile.skillDevelopmentInterest,
    bplStatus: profile.bplStatus,
  }
}

async function extractProfileWithLlm(
  query: string,
  apiKey: string,
): Promise<ExtractedUserProfile | null> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'system',
            content: `Extract a reusable government scheme user profile from the message.
Return only compact JSON with these optional keys:
caste, state, age, gender, occupation, education, income, disabilityStatus, isStudent, isFarmer, isWidow, isMinority, isStartupOwner, skillDevelopmentInterest, bplStatus.
Use exact values where possible: caste General/OBC/SC/ST/EWS; gender Male/Female/Other; occupation Employed/Unemployed/Self-Employed/Student/Retired.
Map farmers to isFarmer true, students to isStudent true and occupation Student, widows to isWidow true, women entrepreneurs to gender Female and isStartupOwner true.
Do not guess missing values.`,
          },
          { role: 'user', content: query },
        ],
      }),
    })

    if (!response.ok) return null

    const data = (await response.json()) as { choices?: { message?: { content?: string } }[] }
    const content = data.choices?.[0]?.message?.content ?? '{}'
    const json = content.match(/\{[\s\S]*\}/)?.[0] ?? '{}'
    return sanitizeProfile(JSON.parse(json) as ExtractedUserProfile)
  } catch {
    return null
  }
}

function extractProfileWithRules(query: string): ExtractedUserProfile {
  const lower = query.toLowerCase()
  const profile: ExtractedUserProfile = {}
  const state = INDIAN_STATES.find((item) => lower.includes(item.toLowerCase()))
  const ageMatch =
    lower.match(/\b(?:i am|i'm|age|aged)\s*(\d{1,2})\b/) ??
    lower.match(/\b(\d{1,2})\s*(?:years?|yrs?)\s*old\b/)
  const incomeMatch = lower.match(/(?:income|earn|earns|earning|salary|family income)[^\d]*(\d+(?:,\d+)*(?:\.\d+)?)\s*(lakh|lac|k|thousand)?/)

  if (state) profile.state = state
  if (ageMatch) profile.age = Number(ageMatch[1])
  if (incomeMatch) profile.income = parseIncome(incomeMatch[1], incomeMatch[2])
  if (/\bobc\b/.test(lower)) profile.caste = 'OBC'
  if (/\bsc\b|scheduled caste/.test(lower)) profile.caste = 'SC'
  if (/\bst\b|scheduled tribe/.test(lower)) profile.caste = 'ST'
  if (/\bews\b/.test(lower)) profile.caste = 'EWS'
  if (/\bgeneral\b/.test(lower)) profile.caste = 'General'
  if (/\bfemale\b|\bwoman\b|\bwomen\b|\bgirl\b/.test(lower)) profile.gender = 'Female'
  if (/\bmale\b|\bman\b|\bboy\b/.test(lower)) profile.gender = 'Male'
  if (/\bstudent\b|studying|college|school|btech|engineering|mtech|graduate|scholarship/.test(lower)) {
    profile.occupation = 'Student'
    profile.isStudent = true
  }
  if (/\bfarmer\b|farming|agriculture|landholding|pm kisan|kisan\b/.test(lower)) profile.isFarmer = true
  if (/\bwidow\b|widowed\b/.test(lower)) {
    profile.isWidow = true
    profile.gender = profile.gender ?? 'Female'
  }
  if (/\bminority\b|muslim|christian|sikh|buddhist|jain|parsi/.test(lower)) profile.isMinority = true
  if (/\bdisabled\b|disability|divyang/.test(lower)) profile.disabilityStatus = true
  if (/\bbpl\b|below poverty|low income/.test(lower)) profile.bplStatus = true
  if (/\bstartup\b|entrepreneur|business owner|women entrepreneur|woman entrepreneur/.test(lower)) {
    profile.isStartupOwner = true
    profile.occupation = 'Self-Employed'
  }
  if (/\bskill\b|training|upskill/.test(lower)) profile.skillDevelopmentInterest = true

  const educationMatch = query.match(/\b(BTech|MTech|MBA|MBBS|BSc|BA|BCom|MSc|MA|12th|10th|PhD|Graduate|Engineering)\b/i)
  if (educationMatch) profile.education = educationMatch[1]

  return sanitizeProfile(profile)
}

function sanitizeProfile(profile: ExtractedUserProfile): ExtractedUserProfile {
  return Object.fromEntries(
    Object.entries(profile).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  ) as ExtractedUserProfile
}

function parseIncome(amount: string, unit?: string): number {
  const value = Number(amount.replace(/,/g, ''))
  if (unit === 'lakh' || unit === 'lac') return value * 100000
  if (unit === 'k' || unit === 'thousand') return value * 1000
  return value
}

function isSchemeDetailQuestion(query: string): boolean {
  return /detail|benefit|document|apply|application|process|last date|deadline|eligib|how can i get|how to get/i.test(query)
}

function buildSingleSchemeResult(scheme: SchemeModel): RankedScheme {
  return {
    scheme,
    rank: 1,
    semanticScore: 1,
    eligibilityScore: 1,
    confidenceScore: 100,
    matchStrength: 'strong',
    eligible: true,
    matchedCriteria: ['User asked about this scheme directly'],
    missingInformation: [],
    disqualifyingCriteria: [],
  }
}

function formatRecommendationResponse(
  userQuery: string,
  profile: ExtractedUserProfile,
  results: RankedScheme[],
): string {
  const strong = results.filter((result) => result.matchStrength === 'strong').slice(0, 3)
  const possible = results
    .filter((result) => result.matchStrength === 'possible' || (result.matchStrength === 'low' && strong.length === 0))
    .slice(0, strong.length ? 3 : 4)
  const title = getRecommendationTitle(userQuery, profile)
  const sections: string[] = [`${title}\n━━━━━━━━━━━━━━━━━━`]

  if (strong.length) {
    sections.push(['HIGHLY RELEVANT SCHEMES', ...strong.map(formatSchemeCard)].join('\n\n'))
  }

  if (possible.length) {
    sections.push(['POSSIBLY RELEVANT SCHEMES', ...possible.map(formatSchemeCard)].join('\n\n'))
  }

  sections.push(formatMissingInfo(results, profile))

  return sections.join('\n\n━━━━━━━━━━━━━━━━━━\n\n')
}

function formatSchemeCard(result: RankedScheme): string {
  const scheme = result.scheme
  const marker = result.matchStrength === 'strong' ? '✓ Strong Match' : '◐ Possible Match'
  const cautions = result.disqualifyingCriteria.length
    ? `\nCheck carefully:\n${result.disqualifyingCriteria.map((item) => `• ${item}`).join('\n')}`
    : ''

  return [
    `🏆 ${scheme.scheme_name}`,
    `${marker} · Confidence ${result.confidenceScore}%`,
    '',
    'Why this matches:',
    formatBullets(result.matchedCriteria.length ? result.matchedCriteria.slice(0, 4) : ['Semantic search found this scheme relevant to your query.']),
    '',
    'Benefits:',
    formatBullets(scheme.benefits.slice(0, 3)),
    '',
    'Eligibility:',
    formatBullets(scheme.eligibility.slice(0, 3)),
    '',
    'Documents:',
    formatBullets(scheme.documents.slice(0, 5)),
    '',
    `Apply: ${scheme.apply_link}`,
    `Source: ${scheme.source} (${scheme.official_link})`,
    scheme.last_date ? `Last date: ${scheme.last_date}` : 'Last date: Check official portal for the latest deadline.',
    cautions,
  ]
    .filter(Boolean)
    .join('\n')
}

function formatSchemeDetails(scheme: SchemeModel, profile: ExtractedUserProfile): string {
  const knownContext = [
    profile.caste ? `Category: ${profile.caste}` : '',
    profile.state ? `State: ${profile.state}` : '',
    profile.occupation ? `Occupation: ${profile.occupation}` : '',
    profile.isFarmer ? 'Farmer' : '',
    profile.isWidow ? 'Widow' : '',
  ].filter(Boolean)

  return [
    `🏆 ${scheme.scheme_name}`,
    '━━━━━━━━━━━━━━━━━━',
    knownContext.length ? `Based on your profile: ${knownContext.join(', ')}` : 'Here are the scheme details from the repository.',
    '',
    'Benefits:',
    formatBullets(scheme.benefits),
    '',
    'Eligibility:',
    formatBullets(scheme.eligibility),
    '',
    'Required documents:',
    formatBullets(scheme.documents),
    '',
    'Application process:',
    formatBullets(scheme.application_process.map((step, index) => `${index + 1}. ${step}`)),
    '',
    `Apply: ${scheme.apply_link}`,
    `Source: ${scheme.source} (${scheme.official_link})`,
    scheme.last_date ? `Last date: ${scheme.last_date}` : 'Last date: Check official portal for the latest deadline.',
  ].join('\n')
}

function formatMissingInfo(results: RankedScheme[], profile: ExtractedUserProfile): string {
  const missing = [
    ...new Set(results.flatMap((result) => result.missingInformation)),
  ].filter((field) => isActuallyMissing(field, profile)).slice(0, 5)

  if (!missing.length) {
    return '💡 Additional Information Needed\nNo extra information is needed for this first recommendation pass. Please verify final eligibility on the official portal before applying.'
  }

  return [
    '💡 Additional Information Needed',
    'These recommendations are based on what you shared. To improve accuracy, you can tell me:',
    formatBullets(missing),
  ].join('\n')
}

function formatNoMatch(profile: ExtractedUserProfile): string {
  const known = Object.keys(profile).length
    ? `I used your available profile details: ${Object.entries(profile).map(([key, value]) => `${key}: ${value}`).join(', ')}.`
    : 'I do not have profile details yet.'

  return [
    'I could not find a strong scheme match yet.',
    known,
    '',
    'Share any one or two details and I will recommend schemes immediately:',
    formatBullets(['student/farmer/entrepreneur/widow status', 'state', 'caste/category', 'annual family income', 'age']),
  ].join('\n')
}

function getRecommendationTitle(query: string, profile: ExtractedUserProfile): string {
  if (profile.isStudent || /student|scholarship|engineering|btech/i.test(query)) return '🎓 STUDENT SCHEMES FOR YOU'
  if (profile.isFarmer || /farmer|kisan/i.test(query)) return '🌾 FARMER SCHEMES FOR YOU'
  if (profile.isWidow) return '🛡️ WIDOW WELFARE SCHEMES FOR YOU'
  if (profile.isStartupOwner || /entrepreneur|startup|business/i.test(query)) return '🚀 BUSINESS AND STARTUP SCHEMES FOR YOU'
  if (profile.gender === 'Female' || /women|woman/i.test(query)) return '👩 WOMEN-FOCUSED SCHEMES FOR YOU'
  return '🏛️ GOVERNMENT SCHEMES FOR YOU'
}

function formatBullets(items: string[]): string {
  return items.map((item) => `• ${item}`).join('\n')
}

function isActuallyMissing(field: string, profile: ExtractedUserProfile): boolean {
  if (field.includes('income')) return profile.income === undefined
  if (field.includes('state')) return !profile.state
  if (field.includes('caste') || field.includes('category')) return !profile.caste
  if (field.includes('age')) return profile.age === undefined
  if (field.includes('gender')) return !profile.gender
  if (field.includes('occupation')) return !profile.occupation && !profile.isFarmer && !profile.isWidow
  if (field.includes('student')) return profile.isStudent === undefined
  if (field.includes('farmer')) return profile.isFarmer === undefined
  return true
}
