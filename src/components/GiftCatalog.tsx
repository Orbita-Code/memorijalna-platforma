import { useState } from 'react'
import type { GiftProduct } from '../types/gift'
import { getActiveProducts, formatPrice } from '../lib/giftCatalog'
import GiftModal from './GiftModal'

interface GiftCatalogProps {
  memorialId: string
  onPurchaseComplete?: () => void
}

// Inline SVG icons for gifts
const GiftIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'candle':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
          <path
            d="M12 2c-.5 2-2 3-2 5 0 1.5 1 2.5 2 2.5s2-1 2-2.5c0-2-1.5-3-2-5z"
            fill="#F59E0B"
            className="animate-pulse"
          />
          <rect x="10" y="9" width="4" height="12" rx="1" fill="#FEF3C7" />
          <rect x="9" y="20" width="6" height="2" rx="0.5" fill="#D97706" />
        </svg>
      )
    case 'flower':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
          <circle cx="12" cy="8" r="3" fill="#F472B6" />
          <circle cx="8" cy="10" r="2.5" fill="#FB7185" />
          <circle cx="16" cy="10" r="2.5" fill="#FB7185" />
          <circle cx="9" cy="14" r="2" fill="#F9A8D4" />
          <circle cx="15" cy="14" r="2" fill="#F9A8D4" />
          <circle cx="12" cy="10" r="2" fill="#FDE047" />
          <path d="M12 12v10" stroke="#22C55E" strokeWidth="2" />
          <path d="M10 16l-2 2M14 16l2 2" stroke="#22C55E" strokeWidth="1.5" />
        </svg>
      )
    case 'wreath':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="#22C55E"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="12" cy="4" r="1.5" fill="#EF4444" />
          <circle cx="18" cy="8" r="1" fill="#F472B6" />
          <circle cx="18" cy="16" r="1" fill="#F472B6" />
          <circle cx="12" cy="20" r="1.5" fill="#EF4444" />
          <circle cx="6" cy="16" r="1" fill="#F472B6" />
          <circle cx="6" cy="8" r="1" fill="#F472B6" />
          <path d="M10 2l2 2 2-2" stroke="#EF4444" strokeWidth="1.5" />
        </svg>
      )
    case 'cross':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
          <rect x="10" y="4" width="4" height="16" rx="0.5" fill="#A78BFA" />
          <rect x="6" y="8" width="12" height="4" rx="0.5" fill="#A78BFA" />
        </svg>
      )
    default:
      return (
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
      )
  }
}

export default function GiftCatalog({
  memorialId,
  onPurchaseComplete,
}: GiftCatalogProps) {
  const [selectedProduct, setSelectedProduct] = useState<GiftProduct | null>(null)
  const products = getActiveProducts()

  const handleProductSelect = (product: GiftProduct) => {
    setSelectedProduct(product)
  }

  const handleModalClose = () => {
    setSelectedProduct(null)
  }

  const handlePurchaseComplete = () => {
    setSelectedProduct(null)
    if (onPurchaseComplete) {
      onPurchaseComplete()
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => handleProductSelect(product)}
            className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-amber-300 hover:shadow-md transition-all group"
          >
            <div className="mb-3 group-hover:scale-110 transition-transform">
              <GiftIcon type={product.type} />
            </div>
            <span className="text-sm font-medium text-gray-800 mb-1">
              {product.name}
            </span>
            <span className="text-sm text-amber-600 font-semibold">
              {formatPrice(product.price_cents)}
            </span>
          </button>
        ))}
      </div>

      {selectedProduct && (
        <GiftModal
          product={selectedProduct}
          memorialId={memorialId}
          isOpen={true}
          onClose={handleModalClose}
          onPurchaseComplete={handlePurchaseComplete}
        />
      )}
    </div>
  )
}
