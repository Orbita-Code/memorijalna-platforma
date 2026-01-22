import { supabase } from './supabase'
import type { Cemetery, CemeteryInsert } from '../types/partners'
import { placeholderCemeteries } from '../data/placeholders'

const USE_PLACEHOLDERS = true

export async function getCemeteries(city?: string) {
  if (USE_PLACEHOLDERS) {
    let data = [...placeholderCemeteries]
    if (city) {
      data = data.filter(c => c.city.toLowerCase().includes(city.toLowerCase()))
    }
    data.sort((a, b) => a.name.localeCompare(b.name))
    return { data, error: null }
  }

  let query = supabase
    .from('cemeteries')
    .select('*')
    .order('name')

  if (city) {
    query = query.ilike('city', `%${city}%`)
  }

  const { data, error } = await query

  return { data: data as Cemetery[] | null, error }
}

export async function getCemeteryBySlug(slug: string) {
  if (USE_PLACEHOLDERS) {
    const data = placeholderCemeteries.find(c => c.slug === slug) || null
    return { data, error: data ? null : { message: 'Not found' } }
  }

  const { data, error } = await supabase
    .from('cemeteries')
    .select('*')
    .eq('slug', slug)
    .single()

  return { data: data as Cemetery | null, error }
}

export async function getCemeteryById(id: string) {
  const { data, error } = await supabase
    .from('cemeteries')
    .select('*')
    .eq('id', id)
    .single()

  return { data: data as Cemetery | null, error }
}

export async function createCemetery(cemetery: CemeteryInsert) {
  const { data, error } = await supabase
    .from('cemeteries')
    .insert(cemetery)
    .select()
    .single()

  return { data: data as Cemetery | null, error }
}

export async function updateCemetery(id: string, updates: Partial<CemeteryInsert>) {
  const { data, error } = await supabase
    .from('cemeteries')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  return { data: data as Cemetery | null, error }
}

export async function getCemeteryUniqueCities(): Promise<string[]> {
  if (USE_PLACEHOLDERS) {
    const cities = [...new Set(placeholderCemeteries.map(c => c.city))].sort()
    return cities
  }

  const { data, error } = await supabase
    .from('cemeteries')
    .select('city')

  if (error || !data) return []

  const cities = [...new Set(data.map(d => d.city))].sort()
  return cities
}

export async function getNearbyCemeteries(latitude: number, longitude: number, radiusKm = 50, limit = 5) {
  // Simple distance calculation - for production, use PostGIS
  const { data, error } = await supabase
    .from('cemeteries')
    .select('*')
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
    .limit(limit * 3) // Get more to filter

  if (error || !data) return { data: null, error }

  // Filter by approximate distance
  const filtered = data
    .filter(c => c.latitude && c.longitude)
    .map(c => {
      const dist = getDistanceKm(latitude, longitude, c.latitude!, c.longitude!)
      return { ...c, distance: dist }
    })
    .filter(c => c.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)

  return { data: filtered as (Cemetery & { distance: number })[], error: null }
}

// Haversine formula for distance calculation
function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}
