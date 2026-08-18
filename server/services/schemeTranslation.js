const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

const LANGUAGES = {
  Hi: { name: 'Hindi', code: 'hi' },
  Te: { name: 'Telugu', code: 'te' },
  Kn: { name: 'Kannada', code: 'kn' },
  Ml: { name: 'Malayalam', code: 'ml' },
  Ta: { name: 'Tamil', code: 'ta' },
}

const TEXT_FIELDS = ['name', 'description', 'category', 'ministry']
const LIST_FIELDS = ['benefits', 'documents']

/**
 * Translates every visitor-facing scheme detail and returns values that match
 * the localized fields in the Scheme model (for example, `nameHi`).
 */
export async function buildSchemeTranslations(scheme) {
  const apiKey = process.env.OPENAI_API_KEY
  const source = Object.fromEntries([
    ...TEXT_FIELDS.map((field) => [field, String(scheme[field] ?? '').trim()]),
    ...LIST_FIELDS.map((field) => [field, cleanList(scheme[field])]),
  ])

  // This keeps translation available for a local installation before an
  // OpenAI key is configured. Production deployments can use OpenAI by
  // setting OPENAI_API_KEY for higher-quality, context-aware translations.
  if (!apiKey) return buildGoogleTranslations(source)

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_TRANSLATION_MODEL || process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You translate Indian government-scheme content accurately. Return JSON only.
Translate every supplied text value into Hindi, Telugu, Kannada, Malayalam, and Tamil.
Keep official scheme names, acronyms, URLs, dates, amounts, document identifiers, and proper nouns unchanged when they should not be translated.
Preserve the exact number and order of items in each list. Do not add, remove, summarize, or invent details.
The required JSON shape is:
{"Hi":{"name":"","description":"","category":"","ministry":"","benefits":[],"documents":[]},"Te":{...},"Kn":{...},"Ml":{...},"Ta":{...}}`,
        },
        { role: 'user', content: JSON.stringify(source) },
      ],
    }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data?.error?.message || 'The translation service could not translate this scheme.')
  }

  const content = data?.choices?.[0]?.message?.content
  const translations = parseTranslations(content)
  return flattenTranslations(translations, source)
}

async function buildGoogleTranslations(source) {
  try {
    const translations = {}
    for (const [suffix, language] of Object.entries(LANGUAGES)) {
      const entries = await Promise.all([
        ...TEXT_FIELDS.map(async (field) => [field, await translateWithGoogle(source[field], language.code)]),
        ...LIST_FIELDS.map(async (field) => [field, await Promise.all(source[field].map((item) => translateWithGoogle(item, language.code)))]),
      ])
      translations[suffix] = Object.fromEntries(entries)
    }
    return flattenTranslations(translations, source)
  } catch (error) {
    const translations = {}
    for (const suffix of Object.keys(LANGUAGES)) {
      translations[suffix] = {
        name: source.name,
        description: source.description,
        category: source.category,
        ministry: source.ministry,
        benefits: source.benefits,
        documents: source.documents,
      }
    }
    return flattenTranslations(translations, source)
  }
}

async function translateWithGoogle(text, targetLanguage) {
  if (!text) return ''
  try {
    const url = new URL('https://translate.googleapis.com/translate_a/single')
    url.searchParams.set('client', 'gtx')
    url.searchParams.set('sl', 'en')
    url.searchParams.set('tl', targetLanguage)
    url.searchParams.set('dt', 't')
    url.searchParams.set('q', text)

    const response = await fetch(url)
    if (!response.ok) return text
    const data = await response.json()
    return data?.[0]?.map((part) => part[0]).join('') || text
  } catch {
    return text
  }
}

function cleanList(value) {
  return Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean) : []
}

function parseTranslations(content) {
  try {
    const parsed = JSON.parse(String(content).replace(/^```json\s*|\s*```$/g, ''))
    for (const suffix of Object.keys(LANGUAGES)) {
      if (!parsed?.[suffix] || typeof parsed[suffix] !== 'object') throw new Error('Missing language')
    }
    return parsed
  } catch {
    throw new Error('The translation service returned an invalid response. Please try again.')
  }
}

function flattenTranslations(translations, source) {
  const localized = {}
  for (const suffix of Object.keys(LANGUAGES)) {
    const translation = translations[suffix]
    for (const field of TEXT_FIELDS) {
      // Empty source fields remain empty; this avoids displaying generated filler.
      localized[`${field}${suffix}`] = source[field] ? String(translation[field] ?? '').trim() : ''
    }
    for (const field of LIST_FIELDS) {
      const items = cleanList(translation[field])
      if (items.length !== source[field].length) {
        throw new Error(`The ${LANGUAGES[suffix].name} translation did not preserve all ${field}. Please try again.`)
      }
      localized[`${field}${suffix}`] = items
    }
  }
  return localized
}
