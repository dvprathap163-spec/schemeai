
import { buildSchemeDocument, getAllSchemes } from '@/lib/scheme-service'
import type { SchemeModel } from '@/types'

export interface VectorSearchResult {
  scheme: SchemeModel
  score: number
}

const VECTOR_SIZE = 384

export async function searchSchemesByVector(query: string, limit = 6): Promise<VectorSearchResult[]> {
  return searchSchemesLocally(query, limit)
}

export function searchSchemesLocally(query: string, limit = 6): VectorSearchResult[] {
  const queryVector = createHashedEmbedding(query)

  return getAllSchemes()
    .map((scheme) => ({
      scheme,
      score: cosineSimilarity(queryVector, createHashedEmbedding(buildSchemeDocument(scheme))),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

export function createHashedEmbedding(text: string): number[] {
  const vector = Array.from({ length: VECTOR_SIZE }, () => 0)
  const tokens = text.toLowerCase().match(/[a-z0-9]+/g) ?? []

  for (const token of tokens) {
    const index = hashToken(token) % VECTOR_SIZE
    vector[index] += token.length > 3 ? 1 : 0.5
  }

  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1
  return vector.map((value) => value / magnitude)
}

function hashToken(token: string): number {
  let hash = 2166136261
  for (let i = 0; i < token.length; i += 1) {
    hash ^= token.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return Math.abs(hash)
}

function cosineSimilarity(a: number[], b: number[]): number {
  return a.reduce((sum, value, index) => sum + value * (b[index] ?? 0), 0)
}
