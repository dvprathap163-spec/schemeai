import schemeRepository from '@/data/scheme-repository.json'
import type { ExtractedUserProfile, SchemeModel } from '@/types'

const schemes = schemeRepository as SchemeModel[]

export function getAllSchemes(): SchemeModel[] {
  return schemes
}

export function getSchemeById(id: string): SchemeModel | undefined {
  return schemes.find((scheme) => scheme.id === id)
}

export function getSchemeByQuery(query: string): SchemeModel | undefined {
  const normalized = normalize(query)

  return schemes.find((scheme) => {
    const aliases = [
      scheme.id,
      scheme.scheme_name,
      scheme.scheme_name.replace(/[()]/g, ''),
      ...scheme.scheme_name.split(/[-()]/),
      ...scheme.scheme_name.split(/\s+/),
      ...scheme.scheme_name.split(/[^a-zA-Z0-9]+/),
    ].map(normalize)

    return aliases.some((alias) => alias.length > 3 && normalized.includes(alias))
  })
}

export function buildSchemeDocument(scheme: SchemeModel): string {
  return [
    scheme.scheme_name,
    scheme.category,
    scheme.state,
    scheme.beneficiaries.join(' '),
    scheme.eligibility.join(' '),
    scheme.benefits.join(' '),
    scheme.documents.join(' '),
    scheme.application_process.join(' '),
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
