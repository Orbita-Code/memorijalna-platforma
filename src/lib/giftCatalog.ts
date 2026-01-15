import type { GiftProduct } from '../types/gift'

// Static gift catalog for MVP
// Future: Database-driven catalog with admin management
export const giftCatalog: GiftProduct[] = [
  {
    id: 'candle-1',
    type: 'candle',
    name: 'Sveca',
    description: 'Zapalite virtualnu svecu u znak secanja',
    price_cents: 99,
    image_url: '/gifts/candle.svg',
    is_active: true,
  },
  {
    id: 'flower-1',
    type: 'flower',
    name: 'Buket cveca',
    description: 'Polozite virtualno cvece na memorijal',
    price_cents: 299,
    image_url: '/gifts/flower.svg',
    is_active: true,
  },
  {
    id: 'wreath-1',
    type: 'wreath',
    name: 'Venac',
    description: 'Polozite virtualni venac kao znak postovanja',
    price_cents: 499,
    image_url: '/gifts/wreath.svg',
    is_active: true,
  },
  {
    id: 'cross-1',
    type: 'cross',
    name: 'Krst',
    description: 'Postavite virtualni krst na memorijal',
    price_cents: 199,
    image_url: '/gifts/cross.svg',
    is_active: true,
  },
]

export function getActiveProducts(): GiftProduct[] {
  return giftCatalog.filter((p) => p.is_active)
}

export function getProductById(id: string): GiftProduct | undefined {
  return giftCatalog.find((p) => p.id === id)
}

export function formatPrice(cents: number): string {
  const euros = cents / 100
  return new Intl.NumberFormat('sr-RS', {
    style: 'currency',
    currency: 'EUR',
  }).format(euros)
}
