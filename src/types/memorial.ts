export interface Memorial {
  id: string
  created_at: string
  updated_at: string
  user_id: string // owner of the memorial

  // Personal info
  first_name: string
  last_name: string
  maiden_name: string | null // devojačko prezime
  birth_date: string | null // ISO date
  death_date: string | null // ISO date
  birth_place: string | null
  death_place: string | null
  burial_place: string | null

  // Parents
  father_name: string | null
  mother_name: string | null
  mother_maiden_name: string | null

  // Content
  biography: string | null
  profile_image_url: string | null
  cover_image_url: string | null

  // Visibility
  is_public: boolean

  // Donations - Family (Stripe Connect)
  family_donations_enabled: boolean
  stripe_account_id: string | null
  stripe_onboarding_complete: boolean
  donation_goal: number | null // cilj u EUR centima
  donation_message: string | null // poruka porodice uz donaciju

  // Donations - Charity (external links)
  charity_donations_enabled: boolean
  charity_id: string | null // ID iz preset liste
  charity_name: string | null // custom ime organizacije
  charity_donation_url: string | null // custom link za donacije
}

export interface CreateMemorialInput {
  first_name: string
  last_name: string
  maiden_name?: string
  birth_date?: string
  death_date?: string
  birth_place?: string
  death_place?: string
  burial_place?: string
  father_name?: string
  mother_name?: string
  mother_maiden_name?: string
}

export interface UpdateMemorialInput {
  first_name?: string
  last_name?: string
  maiden_name?: string | null
  birth_date?: string | null
  death_date?: string | null
  birth_place?: string | null
  death_place?: string | null
  burial_place?: string | null
  father_name?: string | null
  mother_name?: string | null
  mother_maiden_name?: string | null
  biography?: string | null
  profile_image_url?: string | null
  cover_image_url?: string | null
  is_public?: boolean

  // Donation settings
  family_donations_enabled?: boolean
  stripe_account_id?: string | null
  stripe_onboarding_complete?: boolean
  donation_goal?: number | null
  donation_message?: string | null
  charity_donations_enabled?: boolean
  charity_id?: string | null
  charity_name?: string | null
  charity_donation_url?: string | null
}

export interface MemorialFilters {
  search?: string
  death_place?: string
  year_of_death?: number
}
