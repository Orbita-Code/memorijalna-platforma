import type { Gift, GiftProduct } from '../types/gift'
import { getProductById } from '../lib/giftCatalog'

interface GiftDisplayProps {
  gifts: Gift[]
}

// Inline SVG icons matching GiftCatalog
const GiftIcon = ({ type, small = false }: { type: string; small?: boolean }) => {
  const size = small ? 'w-8 h-8' : 'w-10 h-10'

  switch (type) {
    case 'candle':
      return (
        <svg viewBox="0 0 24 24" className={size} fill="none">
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
        <svg viewBox="0 0 24 24" className={size} fill="none">
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
        <svg viewBox="0 0 24 24" className={size} fill="none">
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
        <svg viewBox="0 0 24 24" className={size} fill="none">
          <rect x="10" y="4" width="4" height="16" rx="0.5" fill="#A78BFA" />
          <rect x="6" y="8" width="12" height="4" rx="0.5" fill="#A78BFA" />
        </svg>
      )
    default:
      return <div className={`${size} bg-gray-200 rounded-full`} />
  }
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'upravo sada'
  if (diffMins < 60) return `pre ${diffMins} min`
  if (diffHours < 24)
    return `pre ${diffHours} ${diffHours === 1 ? 'sat' : diffHours < 5 ? 'sata' : 'sati'}`
  if (diffDays === 1) return 'juce'
  if (diffDays < 7) return `pre ${diffDays} dana`
  return date.toLocaleDateString('sr-Latn-RS', {
    day: 'numeric',
    month: 'short',
  })
}

export default function GiftDisplay({ gifts }: GiftDisplayProps) {
  if (gifts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center gap-2 mb-4 opacity-30">
          <GiftIcon type="candle" />
          <GiftIcon type="flower" />
          <GiftIcon type="wreath" />
        </div>
        <p className="text-gray-500">Budite prvi koji ce ostaviti poklon</p>
      </div>
    )
  }

  // Group gifts by type for summary display
  const giftCounts: Record<string, number> = {}
  gifts.forEach((gift) => {
    const product = getProductById(gift.product_id)
    if (product) {
      giftCounts[product.type] = (giftCounts[product.type] || 0) + 1
    }
  })

  return (
    <div className="space-y-6">
      {/* Summary counts */}
      <div className="flex flex-wrap justify-center gap-4">
        {Object.entries(giftCounts).map(([type, count]) => (
          <div
            key={type}
            className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full"
          >
            <GiftIcon type={type} small />
            <span className="text-amber-800 font-medium">{count}</span>
          </div>
        ))}
      </div>

      {/* Recent gifts with messages */}
      <div className="space-y-3">
        {gifts
          .filter((g) => g.sender_message)
          .slice(0, 5)
          .map((gift) => {
            const product = getProductById(gift.product_id)
            return (
              <div
                key={gift.id}
                className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <GiftIcon type={product?.type || 'candle'} small />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-800">
                      {gift.is_anonymous ? 'Anonimno' : gift.sender_name}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {formatRelativeTime(gift.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1 italic">
                    "{gift.sender_message}"
                  </p>
                </div>
              </div>
            )
          })}
      </div>

      {/* Show more indicator */}
      {gifts.filter((g) => g.sender_message).length > 5 && (
        <p className="text-center text-sm text-gray-500">
          i jos {gifts.filter((g) => g.sender_message).length - 5} poklona sa porukama
        </p>
      )}
    </div>
  )
}
