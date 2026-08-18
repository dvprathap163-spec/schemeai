import type { EligibilityResult, SchemeRules, UserProfile, Scheme } from '@/types'

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
      const equivalentCategories: Record<string, string[]> = {
        PVTG: ['PVTG', 'ST'],
        DNT: ['DNT', 'OBC'],
      }
      const profileCategories = equivalentCategories[profile.casteCategory] ?? [profile.casteCategory]
      if ((ruleValue as string[]).some((category) => profileCategories.includes(category))) {
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

    case 'artisanOnly':
      if (!ruleValue || profile.isArtisan) {
        if (ruleValue) matched.push('Artisan status')
        return true
      }
      missed.push('Must be an artisan / craftsman')
      return false

    case 'husbandryOrFisheriesOnly':
      if (!ruleValue || profile.isAnimalHusbandryOrFisheries) {
        if (ruleValue) matched.push('Animal husbandry / fisheries status')
        return true
      }
      missed.push('Must be involved in animal husbandry or fisheries')
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
  const rules = scheme.rules || {}
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

  return {
    scheme,
    status,
    score: Math.min(100, score + 5),
    matchedCriteria,
    missedCriteria,
  }
}

export function evaluateAllSchemes(schemes: Scheme[], profile: UserProfile): EligibilityResult[] {
  const eligibleResults = schemes
    .map((scheme) => evaluateScheme(scheme, profile))
    // A partial result means at least one mandatory scheme requirement was not
    // met. Do not show it as an application recommendation.
    .filter((r) => r.status === 'eligible')

  // When a person has told us their primary group (for example, student),
  // prioritise schemes designed for that group. Generic income-only schemes
  // such as housing should not drown out scholarships in the results.
  const profileSpecificResults = eligibleResults.filter((result) =>
    isProfileSpecificScheme(result.scheme, profile),
  )
  const results = profileSpecificResults.length > 0 ? profileSpecificResults : eligibleResults

  return results
    .sort((a, b) => {
      const matchedRuleDifference = b.matchedCriteria.length - a.matchedCriteria.length
      if (matchedRuleDifference !== 0) return matchedRuleDifference
      return b.scheme.popularity - a.scheme.popularity
    })
}

function isProfileSpecificScheme(scheme: Scheme, profile: UserProfile): boolean {
  const rules = scheme.rules ?? {}

  return (
    (profile.isStudent && rules.studentOnly === true) ||
    (profile.isFarmer && rules.farmerOnly === true) ||
    (profile.isWidow && rules.widowOnly === true) ||
    (profile.isSeniorCitizen && rules.seniorCitizenOnly === true) ||
    (profile.isMinority && rules.minorityOnly === true) ||
    (profile.isStartupOwner && rules.startupOwnerOnly === true) ||
    (profile.skillDevelopmentInterest && rules.skillDevelopmentOnly === true) ||
    (profile.disabilityStatus && rules.disabilityOnly === true) ||
    (profile.isArtisan && rules.artisanOnly === true) ||
    (profile.isAnimalHusbandryOrFisheries && rules.husbandryOrFisheriesOnly === true)
  )
}
