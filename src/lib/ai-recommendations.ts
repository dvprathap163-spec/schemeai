import type { EligibilityResult, UserProfile } from '@/types'

export interface AIRecommendation {
  schemeId: string
  reason: string
  priority: 'high' | 'medium' | 'low'
}

export async function getAIRecommendations(
  profile: UserProfile,
  results: EligibilityResult[],
): Promise<AIRecommendation[]> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY ?? import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    return generateLocalRecommendations(profile, results)
  }

  try {
    const prompt = `You are a government scheme advisor for India. Based on this user profile and eligible schemes, provide top 3 personalized recommendations with brief reasons.

Profile: ${JSON.stringify(profile)}
Eligible Schemes: ${results.map((r) => r.scheme.name).join(', ')}

Respond in JSON array format: [{"schemeId": "...", "reason": "...", "priority": "high|medium|low"}]`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) throw new Error('AI API failed')

    const data = await response.json() as { choices: { message: { content: string } }[] }
    const content = data.choices[0]?.message?.content ?? '[]'
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as AIRecommendation[]
    }
  } catch {
    // fallback to local
  }

  return generateLocalRecommendations(profile, results)
}

function generateLocalRecommendations(
  profile: UserProfile,
  results: EligibilityResult[],
): AIRecommendation[] {
  const recommendations: AIRecommendation[] = []

  const eligible = results.filter((r) => r.status === 'eligible')

  if (profile.isStudent && eligible.some((r) => r.scheme.category === 'Education')) {
    const edu = eligible.find((r) => r.scheme.category === 'Education')
    if (edu) {
      recommendations.push({
        schemeId: edu.scheme.id,
        reason: 'As a student, education scholarships can significantly reduce your financial burden.',
        priority: 'high',
      })
    }
  }

  if (profile.bplStatus && eligible.some((r) => r.scheme.category === 'Health')) {
    const health = eligible.find((r) => r.scheme.category === 'Health')
    if (health) {
      recommendations.push({
        schemeId: health.scheme.id,
        reason: 'BPL families benefit from free health insurance coverage up to ₹5 lakh.',
        priority: 'high',
      })
    }
  }

  if (profile.isFarmer && eligible.some((r) => r.scheme.category === 'Agriculture')) {
    const agri = eligible.find((r) => r.scheme.category === 'Agriculture')
    if (agri) {
      recommendations.push({
        schemeId: agri.scheme.id,
        reason: 'Direct income support of ₹6,000/year through PM-KISAN.',
        priority: 'high',
      })
    }
  }

  for (const r of eligible.slice(0, 3)) {
    if (!recommendations.find((rec) => rec.schemeId === r.scheme.id)) {
      recommendations.push({
        schemeId: r.scheme.id,
        reason: `High match score (${Math.round(r.score)}%) based on your profile criteria.`,
        priority: r.score > 90 ? 'high' : 'medium',
      })
    }
  }

  return recommendations.slice(0, 3)
}
