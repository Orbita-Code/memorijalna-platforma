/**
 * Stripe Connect - Za primanje donacija za porodice
 *
 * Flow:
 * 1. Porodica klikne "Omogući donacije"
 * 2. Redirect na Stripe Connect onboarding
 * 3. Porodica unese svoje podatke (IBAN, adresa, itd.)
 * 4. Redirect nazad na platformu
 * 5. Stripe account ID se čuva u bazi
 * 6. Donacije idu direktno porodici, minus naša provizija
 */

import { supabase } from './supabase'

// Provizija platforme (3%)
export const PLATFORM_FEE_PERCENT = 3

// Tipovi
export interface StripeConnectAccount {
  id: string
  email: string
  charges_enabled: boolean
  payouts_enabled: boolean
  details_submitted: boolean
}

export interface CreateConnectAccountResult {
  success: boolean
  accountId?: string
  onboardingUrl?: string
  error?: string
}

export interface DonationResult {
  success: boolean
  paymentIntentId?: string
  error?: string
}

/**
 * Kreira Stripe Connect Express account za porodicu
 * Vraća URL za onboarding
 */
export async function createConnectAccount(
  memorialId: string,
  email: string,
  returnUrl: string
): Promise<CreateConnectAccountResult> {
  try {
    // U produkciji ovo ide preko backend Edge Function
    // Ovde simuliramo za development

    // 1. Kreiraj Express account
    const accountResponse = await fetch('/api/stripe/create-connect-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        memorialId,
        type: 'express',
        country: 'RS', // Srbija
        capabilities: {
          transfers: { requested: true },
        },
      }),
    })

    if (!accountResponse.ok) {
      throw new Error('Greška pri kreiranju Stripe naloga')
    }

    const { accountId } = await accountResponse.json()

    // 2. Kreiraj onboarding link
    const linkResponse = await fetch('/api/stripe/create-account-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountId,
        refreshUrl: `${returnUrl}?refresh=true`,
        returnUrl: `${returnUrl}?success=true`,
        type: 'account_onboarding',
      }),
    })

    if (!linkResponse.ok) {
      throw new Error('Greška pri kreiranju linka za registraciju')
    }

    const { url: onboardingUrl } = await linkResponse.json()

    // 3. Sačuvaj account ID u bazi (privremeno, dok ne završi onboarding)
    await supabase
      .from('memorials')
      .update({
        stripe_account_id: accountId,
        stripe_onboarding_complete: false
      })
      .eq('id', memorialId)

    return {
      success: true,
      accountId,
      onboardingUrl,
    }
  } catch (error) {
    console.error('Stripe Connect error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Nepoznata greška',
    }
  }
}

/**
 * Proverava status Stripe Connect naloga
 */
export async function getConnectAccountStatus(
  accountId: string
): Promise<StripeConnectAccount | null> {
  try {
    const response = await fetch(`/api/stripe/account-status/${accountId}`)

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching account status:', error)
    return null
  }
}

/**
 * Kreira donaciju za porodicu
 * Automatski skida platformsku proviziju
 */
export async function createFamilyDonation(
  memorialId: string,
  amount: number, // u EUR centima
  donorName: string,
  donorEmail: string,
  message?: string
): Promise<DonationResult> {
  try {
    // Dohvati Stripe account ID memorijala
    const { data: memorial, error: memorialError } = await supabase
      .from('memorials')
      .select('stripe_account_id, stripe_onboarding_complete')
      .eq('id', memorialId)
      .single()

    if (memorialError || !memorial?.stripe_account_id) {
      return {
        success: false,
        error: 'Memorijal nema podešene donacije',
      }
    }

    if (!memorial.stripe_onboarding_complete) {
      return {
        success: false,
        error: 'Porodica još nije završila podešavanje naloga za donacije',
      }
    }

    // Izračunaj proviziju platforme
    const platformFee = Math.round(amount * (PLATFORM_FEE_PERCENT / 100))

    // Kreiraj payment intent
    const response = await fetch('/api/stripe/create-donation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        currency: 'eur',
        applicationFeeAmount: platformFee,
        destinationAccountId: memorial.stripe_account_id,
        metadata: {
          memorialId,
          donorName,
          donorEmail,
          message: message || '',
          type: 'family_donation',
        },
      }),
    })

    if (!response.ok) {
      throw new Error('Greška pri kreiranju uplate')
    }

    const { paymentIntentId } = await response.json()

    return {
      success: true,
      paymentIntentId,
    }
  } catch (error) {
    console.error('Donation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Greška pri uplati',
    }
  }
}

/**
 * Generiše Stripe dashboard link za porodicu
 * (da vide svoje uplate i balance)
 */
export async function getStripeDashboardLink(accountId: string): Promise<string | null> {
  try {
    const response = await fetch('/api/stripe/dashboard-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId }),
    })

    if (!response.ok) {
      return null
    }

    const { url } = await response.json()
    return url
  } catch (error) {
    console.error('Error getting dashboard link:', error)
    return null
  }
}

/**
 * Simulacija za development (dok nemamo backend)
 * U produkciji ovo se briše i koriste se prave Stripe funkcije
 */
export function simulateStripeOnboarding(memorialId: string): string {
  // Simuliraj onboarding URL
  const baseUrl = window.location.origin
  return `${baseUrl}/memorijal/${memorialId}/donacije/setup?simulate=true`
}

/**
 * Mock funkcija za development
 */
export async function mockCompleteOnboarding(memorialId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('memorials')
      .update({
        stripe_account_id: `acct_mock_${memorialId.slice(0, 8)}`,
        stripe_onboarding_complete: true,
        family_donations_enabled: true,
      })
      .eq('id', memorialId)

    return !error
  } catch {
    return false
  }
}
