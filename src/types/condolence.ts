/**
 * Čitulja - kondolencija/izraz saučešća
 * Nezavisna od memorijala, može je postaviti bilo ko
 */

export type CondolenceStatus = 'pending' | 'approved' | 'rejected'

export interface Condolence {
  id: string
  created_at: string
  updated_at: string

  // Veza sa preminulom osobom (grupisanje čitulja)
  deceased_person_id?: string | null

  // Podaci o preminulom (legacy - koristi se ako nema deceased_person_id)
  deceased_first_name: string
  deceased_last_name: string
  date_of_birth?: string | null
  date_of_death?: string | null
  photo_url?: string | null

  // Tekst čitulje
  content: string

  // Od koga je čitulja (opciono)
  from_name?: string | null

  // Status i moderacija
  status: CondolenceStatus
  moderation_note?: string | null

  // Plaćanje
  payment_status: 'pending' | 'completed' | 'failed'
  stripe_payment_id?: string | null

  // Ko je kreirao (ako je prijavljen)
  user_id?: string | null
}

export interface CreateCondolenceInput {
  // Veza sa postojećom osobom (ako je pronađena)
  deceased_person_id?: string

  // Podaci o preminulom (koristi se za kreiranje nove osobe ili ako nije povezano)
  deceased_first_name: string
  deceased_last_name: string
  date_of_birth?: string
  date_of_death?: string
  place_of_death?: string
  photo_url?: string

  // Tekst čitulje
  content: string
  from_name?: string
}
