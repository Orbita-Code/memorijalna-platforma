// Types for partner businesses

export type ListingTier = 'basic' | 'standard' | 'premium' | 'featured'

export interface WorkingHours {
  monday?: string
  tuesday?: string
  wednesday?: string
  thursday?: string
  friday?: string
  saturday?: string
  sunday?: string
}

// Funeral Homes (Pogrebna preduzeća)
export interface FuneralHome {
  id: string
  name: string
  slug: string
  description: string | null
  logo_url: string | null
  cover_image_url: string | null
  phone: string | null
  email: string | null
  website: string | null
  address: string
  city: string
  latitude: number | null
  longitude: number | null
  services: string[]
  working_hours: WorkingHours | null
  is_featured: boolean
  listing_tier: ListingTier
  listing_expires_at: string | null
  created_at: string
  updated_at: string
}

export interface FuneralHomeInsert {
  name: string
  slug: string
  description?: string | null
  logo_url?: string | null
  cover_image_url?: string | null
  phone?: string | null
  email?: string | null
  website?: string | null
  address: string
  city: string
  latitude?: number | null
  longitude?: number | null
  services?: string[]
  working_hours?: WorkingHours | null
  is_featured?: boolean
  listing_tier?: ListingTier
  listing_expires_at?: string | null
}

// Cemeteries (Groblja)
export interface PlotPrices {
  single?: number
  double?: number
  family?: number
  cremation?: number
  [key: string]: number | undefined
}

export interface Cemetery {
  id: string
  name: string
  slug: string
  description: string | null
  cover_image_url: string | null
  address: string
  city: string
  latitude: number | null
  longitude: number | null
  phone: string | null
  email: string | null
  working_hours: WorkingHours | null
  plot_prices: PlotPrices | null
  facilities: string[]
  created_at: string
  updated_at: string
}

export interface CemeteryInsert {
  name: string
  slug: string
  description?: string | null
  cover_image_url?: string | null
  address: string
  city: string
  latitude?: number | null
  longitude?: number | null
  phone?: string | null
  email?: string | null
  working_hours?: WorkingHours | null
  plot_prices?: PlotPrices | null
  facilities?: string[]
}

// Stone Masons (Kamenorezačke radnje)
export type AdTier = 'basic' | 'standard' | 'premium'

export interface StoneMason {
  id: string
  business_name: string
  slug: string
  description: string | null
  phone: string | null
  email: string | null
  website: string | null
  city: string
  address: string | null
  banner_image_url: string | null
  ad_tier: AdTier
  ad_expires_at: string | null
  created_at: string
  updated_at: string
}

export interface StoneMasonInsert {
  business_name: string
  slug: string
  description?: string | null
  phone?: string | null
  email?: string | null
  website?: string | null
  city: string
  address?: string | null
  banner_image_url?: string | null
  ad_tier?: AdTier
  ad_expires_at?: string | null
}

// QR Partners (Foto-radnje, štamparije koje štampaju QR pločice)
export type QRMaterial = 'sticker' | 'ceramic' | 'metal' | 'acrylic'

export interface QRPartner {
  id: string
  business_name: string
  slug: string
  description: string | null
  logo_url: string | null
  cover_image_url: string | null
  phone: string | null
  email: string | null
  website: string | null
  address: string | null
  city: string
  latitude: number | null
  longitude: number | null
  qr_materials: QRMaterial[]
  services: string[]
  working_hours: WorkingHours | null
  is_featured: boolean
  listing_tier: ListingTier
  listing_expires_at: string | null
  created_at: string
  updated_at: string
}

export interface QRPartnerInsert {
  business_name: string
  slug: string
  description?: string | null
  logo_url?: string | null
  cover_image_url?: string | null
  phone?: string | null
  email?: string | null
  website?: string | null
  address?: string | null
  city: string
  latitude?: number | null
  longitude?: number | null
  qr_materials?: QRMaterial[]
  services?: string[]
  working_hours?: WorkingHours | null
  is_featured?: boolean
  listing_tier?: ListingTier
  listing_expires_at?: string | null
}
