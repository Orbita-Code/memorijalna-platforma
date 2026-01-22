import { supabase } from './supabase'
import type { FuneralHome, FuneralHomeInsert } from '../types/partners'
import { placeholderFuneralHomes } from '../data/placeholders'

// Use placeholder data until database tables are created
const USE_PLACEHOLDERS = true

export async function getFuneralHomes(city?: string) {
  if (USE_PLACEHOLDERS) {
    let data = [...placeholderFuneralHomes]
    if (city) {
      data = data.filter(fh => fh.city.toLowerCase().includes(city.toLowerCase()))
    }
    data.sort((a, b) => {
      if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1
      return a.name.localeCompare(b.name)
    })
    return { data, error: null }
  }

  let query = supabase
    .from('funeral_homes')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('listing_tier', { ascending: false })
    .order('name')

  if (city) {
    query = query.ilike('city', `%${city}%`)
  }

  const { data, error } = await query

  return { data: data as FuneralHome[] | null, error }
}

export async function getFeaturedFuneralHomes(limit = 6) {
  if (USE_PLACEHOLDERS) {
    const data = placeholderFuneralHomes
      .filter(fh => fh.is_featured)
      .slice(0, limit)
    return { data, error: null }
  }

  const { data, error } = await supabase
    .from('funeral_homes')
    .select('*')
    .eq('is_featured', true)
    .order('listing_tier', { ascending: false })
    .limit(limit)

  return { data: data as FuneralHome[] | null, error }
}

export async function getFuneralHomeBySlug(slug: string) {
  if (USE_PLACEHOLDERS) {
    const data = placeholderFuneralHomes.find(fh => fh.slug === slug) || null
    return { data, error: data ? null : { message: 'Not found' } }
  }

  const { data, error } = await supabase
    .from('funeral_homes')
    .select('*')
    .eq('slug', slug)
    .single()

  return { data: data as FuneralHome | null, error }
}

export async function getFuneralHomeById(id: string) {
  const { data, error } = await supabase
    .from('funeral_homes')
    .select('*')
    .eq('id', id)
    .single()

  return { data: data as FuneralHome | null, error }
}

export async function createFuneralHome(funeralHome: FuneralHomeInsert) {
  const { data, error } = await supabase
    .from('funeral_homes')
    .insert(funeralHome)
    .select()
    .single()

  return { data: data as FuneralHome | null, error }
}

export async function updateFuneralHome(id: string, updates: Partial<FuneralHomeInsert>) {
  const { data, error } = await supabase
    .from('funeral_homes')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  return { data: data as FuneralHome | null, error }
}

export async function getUniqueCities(): Promise<string[]> {
  if (USE_PLACEHOLDERS) {
    const cities = [...new Set(placeholderFuneralHomes.map(fh => fh.city))].sort()
    return cities
  }

  const { data, error } = await supabase
    .from('funeral_homes')
    .select('city')

  if (error || !data) return []

  const cities = [...new Set(data.map(d => d.city))].sort()
  return cities
}
