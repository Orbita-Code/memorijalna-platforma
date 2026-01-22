// Saučešće na umrlici - besplatno, privatno za porodicu
export interface ObituaryCondolence {
  id: string
  obituary_id: string
  sender_name: string
  sender_email?: string | null
  sender_phone?: string | null
  message: string
  is_read: boolean
  created_at: string
}

export interface CreateObituaryCondolenceInput {
  obituary_id: string
  sender_name: string
  sender_email?: string
  sender_phone?: string
  message: string
}
