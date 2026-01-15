import { supabase } from './supabase'
import type { Gift, CreateGiftInput } from '../types/gift'

export async function createGift(
  input: CreateGiftInput,
  paymentId?: string
): Promise<{ data: Gift | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('gifts')
    .insert({
      memorial_id: input.memorial_id,
      product_id: input.product_id,
      sender_name: input.sender_name,
      sender_message: input.sender_message || null,
      is_anonymous: input.is_anonymous || false,
      payment_status: 'pending',
      stripe_payment_id: paymentId || null,
    })
    .select()
    .single()

  return { data, error }
}

export async function getMemorialGifts(
  memorialId: string
): Promise<{ data: Gift[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('gifts')
    .select('*')
    .eq('memorial_id', memorialId)
    .eq('payment_status', 'completed')
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function updateGiftPaymentStatus(
  giftId: string,
  status: 'completed' | 'failed',
  paymentId?: string
): Promise<{ data: Gift | null; error: Error | null }> {
  const updateData: Record<string, unknown> = {
    payment_status: status,
  }

  if (paymentId) {
    updateData.stripe_payment_id = paymentId
  }

  const { data, error } = await supabase
    .from('gifts')
    .update(updateData)
    .eq('id', giftId)
    .select()
    .single()

  return { data, error }
}

export async function getGiftById(
  giftId: string
): Promise<{ data: Gift | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('gifts')
    .select('*')
    .eq('id', giftId)
    .single()

  return { data, error }
}
