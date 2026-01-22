import { supabase } from './supabase'
import type { StoneMason, StoneMasonInsert } from '../types/partners'
import { placeholderStoneMasons } from '../data/placeholders'

const USE_PLACEHOLDERS = true

export async function getStoneMasons(city?: string) {
  if (USE_PLACEHOLDERS) {
    let data = [...placeholderStoneMasons]
    if (city) {
      data = data.filter(sm => sm.city.toLowerCase().includes(city.toLowerCase()))
    }
    // Sort by tier then name
    const tierOrder = { premium: 0, standard: 1, basic: 2 }
    data.sort((a, b) => {
      const tierDiff = tierOrder[a.ad_tier] - tierOrder[b.ad_tier]
      if (tierDiff !== 0) return tierDiff
      return a.business_name.localeCompare(b.business_name)
    })
    return { data, error: null }
  }

  let query = supabase
    .from('stone_masons')
    .select('*')
    .order('ad_tier', { ascending: false })
    .order('business_name')

  if (city) {
    query = query.ilike('city', `%${city}%`)
  }

  const { data, error } = await query

  return { data: data as StoneMason[] | null, error }
}

export async function getStoneMasonBySlug(slug: string) {
  if (USE_PLACEHOLDERS) {
    const data = placeholderStoneMasons.find(sm => sm.slug === slug) || null
    return { data, error: data ? null : { message: 'Not found' } }
  }

  const { data, error } = await supabase
    .from('stone_masons')
    .select('*')
    .eq('slug', slug)
    .single()

  return { data: data as StoneMason | null, error }
}

export async function getStoneMasonById(id: string) {
  const { data, error } = await supabase
    .from('stone_masons')
    .select('*')
    .eq('id', id)
    .single()

  return { data: data as StoneMason | null, error }
}

export async function createStoneMason(stoneMason: StoneMasonInsert) {
  const { data, error } = await supabase
    .from('stone_masons')
    .insert(stoneMason)
    .select()
    .single()

  return { data: data as StoneMason | null, error }
}

export async function updateStoneMason(id: string, updates: Partial<StoneMasonInsert>) {
  const { data, error } = await supabase
    .from('stone_masons')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  return { data: data as StoneMason | null, error }
}

export async function getStoneMasonUniqueCities(): Promise<string[]> {
  if (USE_PLACEHOLDERS) {
    const cities = [...new Set(placeholderStoneMasons.map(sm => sm.city))].sort()
    return cities
  }

  const { data, error } = await supabase
    .from('stone_masons')
    .select('city')

  if (error || !data) return []

  const cities = [...new Set(data.map(d => d.city))].sort()
  return cities
}

export async function getFeaturedStoneMasons(limit = 3) {
  if (USE_PLACEHOLDERS) {
    const data = placeholderStoneMasons
      .filter(sm => sm.ad_tier === 'premium')
      .slice(0, limit)
    return { data, error: null }
  }

  const { data, error } = await supabase
    .from('stone_masons')
    .select('*')
    .eq('ad_tier', 'premium')
    .or(`ad_expires_at.is.null,ad_expires_at.gt.${new Date().toISOString()}`)
    .order('created_at', { ascending: false })
    .limit(limit)

  return { data: data as StoneMason[] | null, error }
}
