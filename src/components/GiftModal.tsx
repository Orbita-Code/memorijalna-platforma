import { useState, FormEvent } from 'react'
import type { GiftProduct } from '../types/gift'
import { formatPrice } from '../lib/giftCatalog'
import { createGift } from '../lib/gifts'
import { createCheckoutUrl } from '../lib/stripe'

interface GiftModalProps {
  product: GiftProduct
  memorialId: string
  isOpen: boolean
  onClose: () => void
  onPurchaseComplete?: () => void
}

export default function GiftModal({
  product,
  memorialId,
  isOpen,
  onClose,
  onPurchaseComplete,
}: GiftModalProps) {
  const [senderName, setSenderName] = useState('')
  const [senderMessage, setSenderMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate
    if (!isAnonymous && !senderName.trim()) {
      setError('Unesite vase ime ili izaberite anonimno')
      return
    }

    setIsProcessing(true)

    // Create gift record
    const displayName = isAnonymous ? 'Anonimno' : senderName.trim()
    const { data: gift, error: giftError } = await createGift({
      memorial_id: memorialId,
      product_id: product.id,
      sender_name: displayName,
      sender_message: senderMessage.trim() || undefined,
      is_anonymous: isAnonymous,
    })

    if (giftError || !gift) {
      setError('Doslo je do greske. Pokusajte ponovo.')
      setIsProcessing(false)
      return
    }

    // Get checkout URL
    const successUrl = `${window.location.origin}/memorijal/${memorialId}`
    const cancelUrl = `${window.location.origin}/memorijal/${memorialId}`

    const checkoutUrl = await createCheckoutUrl(
      product.id,
      memorialId,
      gift.id,
      successUrl,
      cancelUrl
    )

    if (checkoutUrl) {
      // Redirect to checkout
      window.location.href = checkoutUrl
    } else {
      setError('Placanje trenutno nije dostupno')
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 text-sm mt-1">{product.description}</p>
          <p className="text-2xl font-bold text-amber-600 mt-2">
            {formatPrice(product.price_cents)}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Vase ime
              </label>
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                Anonimno
              </label>
            </div>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              disabled={isAnonymous}
              placeholder={isAnonymous ? 'Anonimno' : 'Unesite vase ime'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Poruka (opciono)
              </label>
              <span className="text-xs text-gray-500">
                {senderMessage.length}/200
              </span>
            </div>
            <textarea
              value={senderMessage}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setSenderMessage(e.target.value)
                }
              }}
              rows={3}
              placeholder="Dodajte poruku uz poklon..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full px-4 py-3 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-400 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Obrada...
                </span>
              ) : (
                `Plati ${formatPrice(product.price_cents)}`
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Placanje se vrsi sigurno preko Stripe platforme
          </p>
        </form>
      </div>
    </div>
  )
}
