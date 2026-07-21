import type { EligibilityResult, Scheme, SchemeRules, UserProfile } from '@/types'

function checkRule(
  ruleKey: keyof SchemeRules,
  ruleValue: unknown,
  profile: UserProfile,
  matched: string[],
  missed: string[],
): boolean {
  if (ruleValue === undefined) return true

  switch (ruleKey) {
    case 'minAge':
      if (profile.age >= (ruleValue as number)) {
        matched.push(`Age ≥ ${ruleValue}`)
        return true
      }
      missed.push(`Minimum age ${ruleValue} required (you are ${profile.age})`)
      return false

    case 'maxAge':
      if (profile.age <= (ruleValue as number)) {
        matched.push(`Age ≤ ${ruleValue}`)
        return true
      }
      missed.push(`Maximum age ${ruleValue} required (you are ${profile.age})`)
      return false

    case 'incomeLimit':
      if (profile.familyIncome <= (ruleValue as number)) {
        matched.push(`Income within ₹${(ruleValue as number).toLocaleString('en-IN')} limit`)
        return true
      }
      missed.push(`Income must be ≤ ₹${(ruleValue as number).toLocaleString('en-IN')}`)
      return false

    case 'categories':
      if ((ruleValue as string[]).includes(profile.casteCategory)) {
        matched.push(`Category: ${profile.casteCategory}`)
        return true
      }
      missed.push(`Category must be one of: ${(ruleValue as string[]).join(', ')}`)
      return false

    case 'studentOnly':
      if (!ruleValue || profile.isStudent) {
        if (ruleValue) matched.push('Student status')
        return true
      }
      missed.push('Must be a student')
      return false

    case 'bplOnly':
      if (!ruleValue || profile.bplStatus) {
        if (ruleValue) matched.push('BPL status')
        return true
      }
      missed.push('BPL status required')
      return false

    case 'farmerOnly':
      if (!ruleValue || profile.isFarmer) {
        if (ruleValue) matched.push('Farmer status')
        return true
      }
      missed.push('Must be a farmer')
      return false

    case 'widowOnly':
      if (!ruleValue || profile.isWidow) {
        if (ruleValue) matched.push('Widow status')
        return true
      }
      missed.push('Widow status required')
      return false

    case 'seniorCitizenOnly':
      if (!ruleValue || profile.isSeniorCitizen || profile.age >= 60) {
        if (ruleValue) matched.push('Senior citizen')
        return true
      }
      missed.push('Senior citizen status required')
      return false

    case 'minorityOnly':
      if (!ruleValue || profile.isMinority) {
        if (ruleValue) matched.push('Minority community')
        return true
      }
      missed.push('Minority community status required')
      return false

    case 'startupOwnerOnly':
      if (!ruleValue || profile.isStartupOwner) {
        if (ruleValue) matched.push('Startup owner')
        return true
      }
      missed.push('Startup owner status required')
      return false

    case 'skillDevelopmentOnly':
      if (!ruleValue || profile.skillDevelopmentInterest) {
        if (ruleValue) matched.push('Skill development interest')
        return true
      }
      missed.push('Skill development interest required')
      return false

    case 'disabilityOnly':
      if (!ruleValue || profile.disabilityStatus) {
        if (ruleValue) matched.push('Disability status')
        return true
      }
      missed.push('Disability status required')
      return false

    case 'genders':
      if ((ruleValue as string[]).includes(profile.gender)) {
        matched.push(`Gender: ${profile.gender}`)
        return true
      }
      missed.push(`Gender must be: ${(ruleValue as string[]).join(' or ')}`)
      return false

    case 'states':
      if ((ruleValue as string[]).includes(profile.state)) {
        matched.push(`State: ${profile.state}`)
        return true
      }
      missed.push(`Available in: ${(ruleValue as string[]).join(', ')}`)
      return false

    case 'areaTypes':
      if ((ruleValue as string[]).includes(profile.areaType)) {
        matched.push(`Area: ${profile.areaType}`)
        return true
      }
      missed.push(`Area type must be: ${(ruleValue as string[]).join(' or ')}`)
      return false

    case 'qualifications':
      if ((ruleValue as string[]).includes(profile.qualification)) {
        matched.push(`Qualification: ${profile.qualification}`)
        return true
      }
      missed.push(`Qualification must be: ${(ruleValue as string[]).join(', ')}`)
      return false

    case 'employmentStatuses':
      if ((ruleValue as string[]).includes(profile.employmentStatus)) {
        matched.push(`Employment: ${profile.employmentStatus}`)
        return true
      }
      missed.push(`Employment must be: ${(ruleValue as string[]).join(', ')}`)
      return false

    default:
      return true
  }
}

export function evaluateScheme(scheme: Scheme, profile: UserProfile): EligibilityResult {
  const matchedCriteria: string[] = []
  const missedCriteria: string[] = []
  const rules = scheme.rules
  const ruleKeys = Object.keys(rules) as (keyof SchemeRules)[]
  let passed = 0
  const total = ruleKeys.length

  for (const key of ruleKeys) {
    const passedRule = checkRule(key, rules[key], profile, matchedCriteria, missedCriteria)
    if (passedRule) passed++
  }

  const score = total > 0 ? Math.round((passed / total) * 100) : 100
  let status: EligibilityResult['status'] = 'not_eligible'

  if (passed === total) {
    status = 'eligible'
  } else if (score >= 60) {
    status = 'partial'
  }

  const relevanceBoost = scheme.featured ? 5 : 0
  const popularityBoost = scheme.popularity * 0.1

  return {
    scheme,
    status,
    score: Math.min(100, score + relevanceBoost + popularityBoost),
    matchedCriteria,
    missedCriteria,
  }
}

export function evaluateAllSchemes(schemes: Scheme[], profile: UserProfile): EligibilityResult[] {
  return schemes
    .map((scheme) => evaluateScheme(scheme, profile))
    .filter((r) => r.status !== 'not_eligible')
    .sort((a, b) => {
      const statusOrder = { eligible: 0, partial: 1, not_eligible: 2 }
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status]
      }
      return b.score - a.score
    })
}
