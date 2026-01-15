import { supabase } from './supabase'
import type { Memorial, CreateMemorialInput, UpdateMemorialInput } from '../types/memorial'

export async function createMemorial(input: CreateMemorialInput, userId: string): Promise<{ data: Memorial | null, error: Error | null }> {
  const { data, error } = await supabase
    .from('memorials')
    .insert({
      ...input,
      user_id: userId,
      is_draft: false,
      is_active: true,
    })
    .select()
    .single()

  return { data, error }
}

export async function getMemorialById(id: string): Promise<{ data: Memorial | null, error: Error | null }> {
  const { data, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}

export async function getMemorials(): Promise<{ data: Memorial[] | null, error: Error | null }> {
  const { data, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('is_active', true)
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
  const { data, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  return { data, error }
}
