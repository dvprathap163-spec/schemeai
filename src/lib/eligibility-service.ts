import { buildProfileQuery, buildSchemeDocument } from '@/lib/scheme-service'
import { searchSchemesByVector } from '@/lib/vector-search-service'
import type { ExtractedUserProfile, RankedScheme, SchemeModel } from '@/types'

const WEIGHTS = {
  occupation: 40,
  caste: 30,
  state: 15,
  income: 15,
  age: 10,
  gender: 10,
  semantic: 20,
}

export async function getRelevantSchemes(
  userProfile: ExtractedUserProfile,
  userQuery = '',
): Promise<RankedScheme[]> {
  const query = buildProfileQuery(userProfile, userQuery)
  const semanticMatches = await searchSchemesByVector(query, 12)

  return semanticMatches
    .map(({ scheme, score }) => {
      const relevance = scoreSchemeRelevance(scheme, userProfile, userQuery, score)

      return {
        scheme,
        rank: 0,
        semanticScore: score,
        eligibilityScore: relevance.confidenceScore / 100,
        confidenceScore: relevance.confidenceScore,
        matchStrength: getMatchStrength(relevance.confidenceScore),
        eligible: relevance.confidenceScore >= 70 && relevance.disqualifyingCriteria.length === 0,
        matchedCriteria: relevance.matchedCriteria,
        missingInformation: relevance.missingInformation,
        disqualifyingCriteria: relevance.disqualifyingCriteria,
      }
    })
    .sort((a, b) => b.confidenceScore - a.confidenceScore)
    .map((result, index) => ({ ...result, rank: index + 1 }))
}

export function scoreSchemeRelevance(
  scheme: SchemeModel,
  profile: ExtractedUserProfile,
  userQuery = '',
  semanticScore = 0,
): Omit<RankedScheme, 'scheme' | 'rank' | 'semanticScore' | 'eligibilityScore' | 'eligible'> {
  const matchedCriteria: string[] = []
  const missingInformation: string[] = []
  const disqualifyingCriteria: string[] = []
  const filters = scheme.filters
  let score = Math.min(WEIGHTS.semantic, Math.round(semanticScore * WEIGHTS.semantic))

  const keywordScore = getKeywordScore(scheme, userQuery)
  if (keywordScore > 0) {
    score += keywordScore
    matchedCriteria.push('Query context matches this scheme')
  }

  if (profile.occupation) {
    if (filters.occupation?.includes(profile.occupation)) {
      score += WEIGHTS.occupation
      matchedCriteria.push(`Occupation match: ${profile.occupation}`)
    } else if (profile.occupation === 'Student' && filters.studentOnly) {
      score += WEIGHTS.occupation
      matchedCriteria.push('Occupation match: Student')
    }
  } else if (filters.occupation?.length || filters.studentOnly) {
    missingInformation.push('occupation')
  }

  if (profile.isStudent) {
    if (filters.studentOnly || scheme.category === 'Education') {
      score += WEIGHTS.occupation
      matchedCriteria.push('Student profile matches education scheme')
    }
  } else if (filters.studentOnly) {
    missingInformation.push('student status')
  }

  if (profile.isFarmer) {
    if (filters.farmerOnly || scheme.category === 'Agriculture') {
      score += WEIGHTS.occupation
      matchedCriteria.push('Farmer profile matches agriculture scheme')
    }
  } else if (filters.farmerOnly) {
    missingInformation.push('farmer status')
  }

  if (profile.isWidow) {
    if (filters.widowOnly || scheme.category === 'Women') {
      score += WEIGHTS.occupation
      matchedCriteria.push('Widow status matches welfare scheme')
    }
  } else if (filters.widowOnly) {
    missingInformation.push('widow status')
  }

  if (profile.isStartupOwner) {
    if (filters.startupOwnerOnly || scheme.category === 'Startup') {
      score += WEIGHTS.occupation
      matchedCriteria.push('Entrepreneur profile matches startup scheme')
    }
  } else if (filters.startupOwnerOnly) {
    missingInformation.push('entrepreneur/startup status')
  }

  if (profile.skillDevelopmentInterest) {
    if (filters.skillDevelopmentOnly || scheme.category === 'Skill Development') {
      score += WEIGHTS.occupation
      matchedCriteria.push('Skill development interest matches scheme')
    }
  } else if (filters.skillDevelopmentOnly) {
    missingInformation.push('skill development interest')
  }

  if (profile.caste) {
    if (filters.caste?.includes(profile.caste)) {
      score += WEIGHTS.caste
      matchedCriteria.push(`Category match: ${profile.caste}`)
    } else if (filters.caste?.length) {
      disqualifyingCriteria.push(`Category may need ${filters.caste.join(', ')}`)
    }
  } else if (filters.caste?.length) {
    missingInformation.push('caste/category')
  }

  if (profile.state) {
    if (scheme.state === 'Central') {
      score += WEIGHTS.state
      matchedCriteria.push(`Central scheme available for ${profile.state}`)
    } else if (filters.state?.includes(profile.state) || scheme.state === profile.state) {
      score += WEIGHTS.state
      matchedCriteria.push(`State match: ${profile.state}`)
    } else {
      disqualifyingCriteria.push(`State-specific scheme for ${scheme.state}`)
    }
  } else if (scheme.state !== 'Central' || filters.state?.length) {
    missingInformation.push('state')
  }

  if (profile.income !== undefined) {
    if (filters.income === undefined || profile.income <= filters.income) {
      score += WEIGHTS.income
      if (filters.income !== undefined) {
        matchedCriteria.push(`Income appears within Rs. ${filters.income.toLocaleString('en-IN')} limit`)
      }
    } else {
      disqualifyingCriteria.push(`Income may exceed Rs. ${filters.income.toLocaleString('en-IN')} limit`)
    }
  } else if (filters.income !== undefined) {
    missingInformation.push('annual family income')
  }

  if (profile.age !== undefined) {
    if (isAgeInRange(profile.age, filters.age)) {
      score += WEIGHTS.age
      if (filters.age) matchedCriteria.push(`Age match: ${profile.age}`)
    } else if (filters.age) {
      disqualifyingCriteria.push(`Age may need ${formatAgeRange(filters.age.min, filters.age.max)}`)
    }
  } else if (filters.age) {
    missingInformation.push('age')
  }

  if (profile.gender) {
    if (!filters.gender?.length || filters.gender.includes(profile.gender)) {
      score += WEIGHTS.gender
      if (filters.gender?.length) matchedCriteria.push(`Gender match: ${profile.gender}`)
    } else {
      disqualifyingCriteria.push(`Gender may need ${filters.gender.join(' or ')}`)
    }
  } else if (filters.gender?.length) {
    missingInformation.push('gender')
  }

  if (profile.disabilityStatus) {
    if (filters.disabilityStatus || scheme.category === 'Social Welfare') {
      score += WEIGHTS.occupation
      matchedCriteria.push('Disability status matches welfare scheme')
    }
  } else if (filters.disabilityStatus) {
    missingInformation.push('disability status')
  }

  if (profile.bplStatus) {
    if (filters.bplOnly || scheme.category === 'Health' || scheme.category === 'Housing') {
      score += WEIGHTS.income
      matchedCriteria.push('BPL/low-income status matches scheme')
    }
  } else if (filters.bplOnly) {
    missingInformation.push('BPL status')
  }

  if (profile.isMinority) {
    if (filters.minorityOnly || scheme.beneficiaries.some((item) => item.toLowerCase().includes('minority'))) {
      score += WEIGHTS.caste
      matchedCriteria.push('Minority status matches scheme')
    }
  } else if (filters.minorityOnly) {
    missingInformation.push('minority status')
  }

  const confidenceScore = Math.max(0, Math.min(100, Math.round(score)))

  return {
    confidenceScore,
    matchStrength: getMatchStrength(confidenceScore),
    matchedCriteria: [...new Set(matchedCriteria)],
    missingInformation: [...new Set(missingInformation)],
    disqualifyingCriteria: [...new Set(disqualifyingCriteria)],
  }
}

function getKeywordScore(scheme: SchemeModel, userQuery: string): number {
  const tokens = new Set(userQuery.toLowerCase().match(/[a-z0-9]+/g) ?? [])
  if (!tokens.size) return 0

  const document = buildSchemeDocument(scheme).toLowerCase()
  const hits = [...tokens].filter((token) => token.length > 3 && document.includes(token)).length
  return Math.min(15, hits * 5)
}

function getMatchStrength(score: number): RankedScheme['matchStrength'] {
  if (score >= 65) return 'strong'
  if (score >= 35) return 'possible'
  return 'low'
}

function isAgeInRange(age: number, range?: { min?: number; max?: number }): boolean {
  if (!range) return true
  return (range.min === undefined || age >= range.min) && (range.max === undefined || age <= range.max)
}

function formatAgeRange(min?: number, max?: number): string {
  if (min !== undefined && max !== undefined) return `${min}-${max}`
  if (min !== undefined) return `${min}+`
  return `up to ${max}`
}
