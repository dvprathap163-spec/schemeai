import type { ExtractedUserProfile, Scheme } from '@/types'
import { schemes as defaultSchemes } from '@/data/schemes'

let schemes: Scheme[] = [...defaultSchemes]

export function getAllSchemes(): Scheme[] {
  return schemes
}

export function setAllSchemes(newSchemes: any[]): void {
  schemes = newSchemes.map((dbScheme) => {
    const dbId = dbScheme.id || dbScheme._id
    const hardcoded = defaultSchemes.find((h) => h.id === dbId || h.slug === dbScheme.slug)
    return {
      ...dbScheme,
      id: dbId || hardcoded?.id || '',
      rules: dbScheme.rules || hardcoded?.rules || {},
    } as Scheme
  })
}

export function getSchemeById(id: string): Scheme | undefined {
  return schemes.find((scheme) => scheme.id === id)
}

export function getSchemeByQuery(query: string): Scheme | undefined {
  const normalized = normalize(query)

  return schemes.find((scheme) => {
    const aliases = [
      scheme.id,
      scheme.name,
      scheme.name.replace(/[()]/g, ''),
      ...scheme.name.split(/[-()]/),
      ...scheme.name.split(/\s+/),
      ...scheme.name.split(/[^a-zA-Z0-9]+/),
    ].map(normalize)

    return aliases.some((alias) => alias.length > 3 && normalized.includes(alias))
  })
}

export function buildSchemeDocument(scheme: Scheme): string {
  return [
    scheme.name,
    scheme.category,
    scheme.description,
    scheme.benefits.join(' '),
    scheme.documents.join(' '),
  ].join(' ')
}

export function buildProfileQuery(profile: ExtractedUserProfile, userQuery = ''): string {
  return [
    userQuery,
    profile.caste,
    profile.state,
    profile.gender,
    profile.occupation,
    profile.education,
    profile.isStudent ? 'student scholarship education college' : '',
    profile.isFarmer ? 'farmer agriculture landholding' : '',
    profile.isWidow ? 'widow pension women' : '',
    profile.isMinority ? 'minority scholarship' : '',
    profile.isStartupOwner ? 'startup entrepreneur business loan' : '',
    profile.skillDevelopmentInterest ? 'skill training employment' : '',
    profile.disabilityStatus ? 'disability pension social welfare' : '',
    profile.bplStatus ? 'bpl low income welfare health housing' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

export function mergeProfiles(
  base?: ExtractedUserProfile | null,
  extracted?: ExtractedUserProfile | null,
): ExtractedUserProfile {
  return {
    ...base,
    ...Object.fromEntries(
      Object.entries(extracted ?? {}).filter(([, value]) => value !== undefined && value !== null && value !== ''),
    ),
  }
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()
}
