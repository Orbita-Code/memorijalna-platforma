import { supabase } from './supabase'
import type { Obituary, CreateObituaryInput, UpdateObituaryInput } from '../types/obituary'

export async function createObituary(
  input: CreateObituaryInput,
  userId: string
): Promise<{ data: Obituary | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('obituaries')
    .insert({
      user_id: userId,
      memorial_id: input.memorial_id || null,
      first_name: input.first_name,
      last_name: input.last_name,
      date_of_birth: input.date_of_birth || null,
      date_of_death: input.date_of_death,
      place_of_death: input.place_of_death || null,
      content: input.content || null,
      photo_url: input.photo_url || null,
      funeral_date: input.funeral_date || null,
      funeral_time: input.funeral_time || null,
      funeral_location: input.funeral_location || null,
      funeral_address: input.funeral_address || null,
      funeral_notes: input.funeral_notes || null,
      donations_enabled: input.donations_enabled || false,
      donation_goal_cents: input.donation_goal_cents || null,
      donation_raised_cents: 0,
      donation_charity_name: input.donation_charity_name || null,
      donation_charity_description: input.donation_charity_description || null,
      status: 'draft',
    })
    .select()
    .single()

  return { data, error }
}

export async function getObituaryById(
  id: string
): Promise<{ data: Obituary | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('obituaries')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}

export async function getRecentObituaries(
  limit = 20
): Promise<{ data: Obituary[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('obituaries')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  return { data, error }
}

export async function getUserObituaries(
  userId: string
): Promise<{ data: Obituary[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('obituaries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function updateObituary(
  id: string,
  input: UpdateObituaryInput,
  userId: string
): Promise<{ data: Obituary | null; error: Error | null }> {
  // Verify ownership
  const { data: existing, error: fetchError } = await supabase
    .from('obituaries')
    .select('user_id')
    .eq('id', id)
    .single()

  if (fetchError || !existing) {
    return { data: null, error: new Error('Umrlica nije pronadena') }
  }

  if (existing.user_id !== userId) {
    return { data: null, error: new Error('Nemate dozvolu da izmenite ovu umrlicu') }
  }

  const { data, error } = await supabase
    .from('obituaries')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function publishObituary(
  id: string,
  userId: string
): Promise<{ data: Obituary | null; error: Error | null }> {
  return updateObituary(
    id,
    {
      status: 'published',
    },
    userId
  ).then(async (result) => {
    if (result.data) {
      // Set published_at timestamp
      const { data, error } = await supabase
        .from('obituaries')
        .update({ published_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()
      return { data, error }
    }
    return result
  })
}

export async function addDonation(
  obituaryId: string,
  amountCents: number
): Promise<{ error: Error | null }> {
  const { data: obituary, error: fetchError } = await getObituaryById(obituaryId)

  if (fetchError || !obituary) {
    return { error: new Error('Umrlica nije pronadena') }
  }

  const { error } = await supabase
    .from('obituaries')
    .update({
      donation_raised_cents: obituary.donation_raised_cents + amountCents,
    })
    .eq('id', obituaryId)

  return { error }
}
