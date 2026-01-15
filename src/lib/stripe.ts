import { loadStripe } from '@stripe/stripe-js'
import type { Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null> | null = null

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    if (!key) {
      console.warn('Missing Stripe publishable key (VITE_STRIPE_PUBLISHABLE_KEY)')
      return Promise.resolve(null)
    }
    stripePromise = loadStripe(key)
  }
  return stripePromise
}

// Create a checkout session via Supabase Edge Function (future)
// For MVP, we use Payment Links or client-side checkout
export async function createCheckoutUrl(
  productId: string,
  memorialId: string,
  giftId: string,
  successUrl: string,
  _cancelUrl: string
): Promise<string | null> {
  // For MVP: Return null and use a simulated payment flow
  // In production: Call Supabase Edge Function to create Checkout Session
  console.log('Checkout params:', { productId, memorialId, giftId })

  // MVP: Return success URL directly (simulate instant payment)
  // This should be replaced with actual Stripe integration
  return `${successUrl}?gift_id=${giftId}&payment=success`
}

// Format amount for display
export function formatStripeAmount(amountCents: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('sr-RS', {
    style: 'currency',
    currency,
  }).format(amountCents / 100)
}
