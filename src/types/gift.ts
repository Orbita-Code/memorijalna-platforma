export type GiftType = 'candle' | 'flower' | 'wreath' | 'cross'

export interface GiftProduct {
  id: string
  type: GiftType
  name: string
  description: string
  price_cents: number
  image_url: string
  is_active: boolean
}

export interface Gift {
  id: string
  created_at: string
  updated_at: string
  memorial_id: string
  product_id: string
  sender_name: string
  sender_message?: string | null
  is_anonymous: boolean
  payment_status: 'pending' | 'completed' | 'failed'
  stripe_payment_id?: string | null
}

export interface CreateGiftInput {
  memorial_id: string
  product_id: string
  sender_name: string
  sender_message?: string
  is_anonymous?: boolean
}
