import { supabase } from './supabase'
import type { Memorial, CreateMemorialInput, UpdateMemorialInput } from '../types/memorial'
import { placeholderMemorials } from '../data/placeholders'

// Privremeno koristi placeholder podatke dok se ne popuni baza
const USE_PLACEHOLDERS = true

// Konvertuj placeholder u Memorial tip
function toMemorial(p: typeof placeholderMemorials[0]): Memorial {
  return {
    id: p.id,
    user_id: 'placeholder-user',
    first_name: p.first_name,
    last_name: p.last_name,
    maiden_name: null,
    birth_date: p.birth_date,
    death_date: p.death_date,
    birth_place: p.birth_place,
    death_place: p.death_place,
    burial_place: null,
    father_name: null,
    mother_name: null,
    mother_maiden_name: null,
    biography: p.biography,
    profile_image_url: p.profile_image_url,
    cover_image_url: p.cover_image_url,
    is_public: p.is_public,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    // Donation fields
    family_donations_enabled: false,
    stripe_account_id: null,
    stripe_onboarding_complete: false,
    donation_goal: null,
    donation_message: null,
    charity_donations_enabled: false,
    charity_id: null,
    charity_name: null,
    charity_donation_url: null,
  }
}

export async function createMemorial(input: CreateMemorialInput, userId: string): Promise<{ data: Memorial | null, error: Error | null }> {
  const { data, error } = await supabase
    .from('memorials')
    .insert({
      ...input,
      user_id: userId,
      is_public: true,
    })
    .select()
    .single()

  return { data, error }
}

export async function getMemorialById(id: string): Promise<{ data: Memorial | null, error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const memorial = placeholderMemorials.find(m => m.id === id)
    return { data: memorial ? toMemorial(memorial) : null, error: memorial ? null : new Error('Memorijal nije pronađen') }
  }

  const { data, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}

export async function getMemorials(): Promise<{ data: Memorial[] | null, error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const memorials = placeholderMemorials.filter(m => m.is_public).map(toMemorial)
    return { data: memorials, error: null }
  }

  const { data, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function getUserMemorials(userId: string): Promise<{ data: Memorial[] | null, error: Error | null }> {
  const { data, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function updateMemorial(
  id: string,
  input: UpdateMemorialInput,
  userId: string
): Promise<{ data: Memorial | null, error: Error | null }> {
  // First verify the user owns this memorial
  const { data: existing, error: fetchError } = await supabase
    .from('memorials')
    .select('user_id')
    .eq('id', id)
    .single()

  if (fetchError || !existing) {
    return { data: null, error: new Error('Memorijal nije pronaden') }
  }

  if (existing.user_id !== userId) {
    return { data: null, error: new Error('Nemate dozvolu da izmenite ovaj memorijal') }
  }

  const { data, error } = await supabase
    .from('memorials')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function getRecentMemorials(limit: number = 6): Promise<{ data: Memorial[] | null, error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const memorials = placeholderMemorials
      .filter(m => m.is_public)
      .slice(0, limit)
      .map(toMemorial)
    return { data: memorials, error: null }
  }

  const { data, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  return { data, error }
}
