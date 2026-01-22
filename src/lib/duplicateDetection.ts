import { supabase } from './supabase'
import type { Memorial } from '../types/memorial'

export interface DuplicateMatch {
  memorial: Memorial
  score: number
  matchedFields: string[]
}

// Normalize string for comparison (remove diacritics, lowercase)
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
}

// Calculate Levenshtein distance for fuzzy matching
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

// Calculate string similarity (0-1)
function stringSimilarity(a: string, b: string): number {
  const normA = normalizeString(a)
  const normB = normalizeString(b)

  if (normA === normB) return 1

  const maxLen = Math.max(normA.length, normB.length)
  if (maxLen === 0) return 1

  const distance = levenshteinDistance(normA, normB)
  return 1 - distance / maxLen
}

// Check if dates match (exact or within tolerance)
function datesMatch(date1: string | null | undefined, date2: string | null | undefined): boolean {
  if (!date1 || !date2) return false
  return date1 === date2
}

// Calculate overall similarity score
function calculateSimilarity(
  input: {
    first_name: string
    last_name: string
    birth_date?: string
    death_date: string
    birth_place?: string
    death_place?: string
  },
  memorial: Memorial
): { score: number; matchedFields: string[] } {
  const matchedFields: string[] = []
  let totalScore = 0
  let weights = 0

  // Name matching (high weight)
  const firstNameSim = stringSimilarity(input.first_name, memorial.first_name)
  const lastNameSim = stringSimilarity(input.last_name, memorial.last_name)
  const nameSim = (firstNameSim + lastNameSim) / 2

  if (nameSim > 0.8) {
    matchedFields.push('ime')
    totalScore += nameSim * 40
  }
  weights += 40

  // Date of death matching (high weight)
  if (datesMatch(input.death_date, memorial.death_date)) {
    matchedFields.push('datum smrti')
    totalScore += 30
  }
  weights += 30

  // Date of birth matching (medium weight)
  if (input.birth_date && memorial.birth_date) {
    if (datesMatch(input.birth_date, memorial.birth_date)) {
      matchedFields.push('datum rodjenja')
      totalScore += 20
    }
  }
  weights += 20

  // Place matching (lower weight)
  if (input.birth_place && memorial.birth_place) {
    const placeSim = stringSimilarity(input.birth_place, memorial.birth_place)
    if (placeSim > 0.7) {
      matchedFields.push('mesto rodjenja')
      totalScore += placeSim * 5
    }
  }
  weights += 5

  if (input.death_place && memorial.death_place) {
    const placeSim = stringSimilarity(input.death_place, memorial.death_place)
    if (placeSim > 0.7) {
      matchedFields.push('mesto smrti')
      totalScore += placeSim * 5
    }
  }
  weights += 5

  return {
    score: Math.round((totalScore / weights) * 100),
    matchedFields,
  }
}

export async function findPotentialDuplicates(input: {
  first_name: string
  last_name: string
  birth_date?: string
  death_date: string
  birth_place?: string
  death_place?: string
}): Promise<DuplicateMatch[]> {
  if (!input.first_name || !input.last_name || !input.death_date) {
    return []
  }

  // Search for memorials with similar names
  // Using ILIKE for case-insensitive partial matching
  const normalizedFirst = normalizeString(input.first_name)
  const normalizedLast = normalizeString(input.last_name)

  const { data: memorials, error } = await supabase
    .from('memorials')
    .select('*')
    .or(`first_name.ilike.%${normalizedFirst}%,last_name.ilike.%${normalizedLast}%`)
    .limit(50)

  if (error || !memorials) {
    return []
  }

  // Calculate similarity for each memorial
  const matches: DuplicateMatch[] = memorials
    .map(memorial => {
      const { score, matchedFields } = calculateSimilarity(input, memorial)
      return { memorial, score, matchedFields }
    })
    .filter(match => match.score >= 50) // Only return matches with 50%+ similarity
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, 5) // Limit to top 5 matches

  return matches
}

export function getSimilarityLabel(score: number): string {
  if (score >= 90) return 'Veoma visoka podudarnost'
  if (score >= 75) return 'Visoka podudarnost'
  if (score >= 60) return 'Srednja podudarnost'
  return 'Niska podudarnost'
}

export function getSimilarityColor(score: number): string {
  if (score >= 90) return 'text-red-700 bg-red-100'
  if (score >= 75) return 'text-orange-700 bg-orange-100'
  if (score >= 60) return 'text-yellow-700 bg-yellow-100'
  return 'text-gray-700 bg-gray-100'
}
