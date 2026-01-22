import type { GiftProduct } from '../types/gift'

// Static gift catalog for MVP
// Future: Database-driven catalog with admin management
export const giftCatalog: GiftProduct[] = [
  {
    id: 'candle-1',
    type: 'candle',
    name: 'Sveća',
    description: 'Zapalite virtualnu sveću u znak sećanja',
    price_cents: 200, // 2.00 EUR
    image_url: '/gifts/candle.svg',
    is_active: true,
  },
  {
    id: 'flower-1',
    type: 'flower',
    name: 'Buket cveća',
    description: 'Položite virtualno cveće na memorijal',
    price_cents: 399, // 3.99 EUR
    image_url: '/gifts/flower.svg',
    is_active: true,
  },
  {
    id: 'wreath-1',
    type: 'wreath',
    name: 'Venac',
    description: 'Položite virtualni venac kao znak poštovanja',
    price_cents: 499, // 4.99 EUR
    image_url: '/gifts/wreath.svg',
    is_active: true,
  },
  {
    id: 'cross-1',
    type: 'cross',
    name: 'Krst',
    description: 'Postavite virtualni krst na memorijal',
    price_cents: 249, // 2.49 EUR
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
