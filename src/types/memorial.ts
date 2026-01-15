export interface Memorial {
  id: string
  created_at: string
  updated_at: string
  user_id: string // owner of the memorial

  // Required fields for duplicate detection
  first_name: string
  last_name: string
  date_of_birth: string // ISO date
  date_of_death: string // ISO date
  place_of_birth: string
  place_of_death: string
  father_name: string | null
  mother_name: string | null

  // Optional fields (added in later phases)
  biography: string | null
  profile_image_url: string | null
  cover_image_url: string | null

  // Status
  is_draft: boolean // for living users preparing their own
  is_active: boolean // activated by family after death
}

export interface CreateMemorialInput {
  first_name: string
  last_name: string
  date_of_birth: string
  date_of_death: string
  place_of_birth: string
  place_of_death: string
  father_name?: string
  mother_name?: string
}

export interface UpdateMemorialInput {
  first_name?: string
  last_name?: string
  date_of_birth?: string
  date_of_death?: string
  place_of_birth?: string
  place_of_death?: string
  father_name?: string | null
  mother_name?: string | null
  biography?: string | null
  profile_image_url?: string | null
  cover_image_url?: string | null
}

export interface MemorialFilters {
  search?: string
  place_of_death?: string
  year_of_death?: number
}
