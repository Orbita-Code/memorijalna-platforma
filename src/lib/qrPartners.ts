import { supabase } from './supabase'
import type { QRPartner, QRPartnerInsert, QRMaterial } from '../types/partners'
import { placeholderQRPartners } from '../data/placeholders'

// Use placeholder data until database tables are created
const USE_PLACEHOLDERS = true

export async function getQRPartners(city?: string) {
  if (USE_PLACEHOLDERS) {
    let data = [...placeholderQRPartners]
    if (city) {
      data = data.filter(qr => qr.city.toLowerCase().includes(city.toLowerCase()))
    }
    data.sort((a, b) => {
      if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1
      return a.business_name.localeCompare(b.business_name)
    })
    return { data, error: null }
  }

  let query = supabase
    .from('qr_partners')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('listing_tier', { ascending: false })
    .order('business_name')

  if (city) {
    query = query.ilike('city', `%${city}%`)
  }

  const { data, error } = await query

  return { data: data as QRPartner[] | null, error }
}

export async function getFeaturedQRPartners(limit = 6) {
  if (USE_PLACEHOLDERS) {
    const data = placeholderQRPartners
      .filter(qr => qr.is_featured)
      .slice(0, limit)
    return { data, error: null }
  }

  const { data, error } = await supabase
    .from('qr_partners')
    .select('*')
    .eq('is_featured', true)
    .order('listing_tier', { ascending: false })
    .limit(limit)

  return { data: data as QRPartner[] | null, error }
}

export async function getQRPartnerBySlug(slug: string) {
  if (USE_PLACEHOLDERS) {
    const data = placeholderQRPartners.find(qr => qr.slug === slug) || null
    return { data, error: data ? null : { message: 'Not found' } }
  }

  const { data, error } = await supabase
    .from('qr_partners')
    .select('*')
    .eq('slug', slug)
    .single()

  return { data: data as QRPartner | null, error }
}

export async function getQRPartnerById(id: string) {
  if (USE_PLACEHOLDERS) {
    const data = placeholderQRPartners.find(qr => qr.id === id) || null
    return { data, error: data ? null : { message: 'Not found' } }
  }

  const { data, error } = await supabase
    .from('qr_partners')
    .select('*')
    .eq('id', id)
    .single()

  return { data: data as QRPartner | null, error }
}

export async function getQRPartnersByMaterial(material: QRMaterial) {
  if (USE_PLACEHOLDERS) {
    const data = placeholderQRPartners.filter(qr =>
      qr.qr_materials.includes(material)
    )
    return { data, error: null }
  }

  const { data, error } = await supabase
    .from('qr_partners')
    .select('*')
    .contains('qr_materials', [material])
    .order('is_featured', { ascending: false })

  return { data: data as QRPartner[] | null, error }
}

export async function createQRPartner(qrPartner: QRPartnerInsert) {
  const { data, error } = await supabase
    .from('qr_partners')
    .insert(qrPartner)
    .select()
    .single()

  return { data: data as QRPartner | null, error }
}

export async function updateQRPartner(id: string, updates: Partial<QRPartnerInsert>) {
  const { data, error } = await supabase
    .from('qr_partners')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  return { data: data as QRPartner | null, error }
}

export async function getQRPartnerUniqueCities(): Promise<string[]> {
  if (USE_PLACEHOLDERS) {
    const cities = [...new Set(placeholderQRPartners.map(qr => qr.city))].sort()
    return cities
  }

  const { data, error } = await supabase
    .from('qr_partners')
    .select('city')

  if (error || !data) return []

  const cities = [...new Set(data.map(d => d.city))].sort()
  return cities
}

// Helper za formatiranje materijala
export function formatQRMaterial(material: QRMaterial): string {
  const labels: Record<QRMaterial, string> = {
    sticker: 'Sticker',
    ceramic: 'Keramika',
    metal: 'Metal',
    acrylic: 'Akril'
  }
  return labels[material] || material
}
