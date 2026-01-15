export type ObituaryStatus = 'draft' | 'published' | 'archived'

export interface FuneralDetails {
  date?: string
  time?: string
  location?: string
  address?: string
  notes?: string
}

export interface DonationSettings {
  enabled: boolean
  goal_cents?: number
  raised_cents: number
  charity_name?: string
  charity_description?: string
}

export interface Obituary {
  id: string
  created_at: string
  updated_at: string
  user_id: string
  memorial_id?: string | null

  // Deceased info (used if no memorial linked)
  first_name: string
  last_name: string
  date_of_birth?: string | null
  date_of_death: string
  place_of_death?: string | null

  // Obituary content
  content?: string | null
  photo_url?: string | null

  // Funeral details
  funeral_date?: string | null
  funeral_time?: string | null
  funeral_location?: string | null
  funeral_address?: string | null
  funeral_notes?: string | null

  // Donation settings
  donations_enabled: boolean
  donation_goal_cents?: number | null
  donation_raised_cents: number
  donation_charity_name?: string | null
  donation_charity_description?: string | null

  // Status
  status: ObituaryStatus
  published_at?: string | null
}

export interface CreateObituaryInput {
  memorial_id?: string
  first_name: string
  last_name: string
  date_of_birth?: string
  date_of_death: string
  place_of_death?: string
  content?: string
  photo_url?: string
  funeral_date?: string
  funeral_time?: string
  funeral_location?: string
  funeral_address?: string
  funeral_notes?: string
  donations_enabled?: boolean
  donation_goal_cents?: number
  donation_charity_name?: string
  donation_charity_description?: string
}

export interface UpdateObituaryInput {
  first_name?: string
  last_name?: string
  date_of_birth?: string | null
  date_of_death?: string
  place_of_death?: string | null
  content?: string | null
  photo_url?: string | null
  funeral_date?: string | null
  funeral_time?: string | null
  funeral_location?: string | null
  funeral_address?: string | null
  funeral_notes?: string | null
  donations_enabled?: boolean
  donation_goal_cents?: number | null
  donation_charity_name?: string | null
  donation_charity_description?: string | null
  status?: ObituaryStatus
}
