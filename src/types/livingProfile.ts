export type LivingProfileStatus = 'draft' | 'active' | 'converted'

export interface FamilyMember {
  id: string
  email: string
  name: string
  relationship: 'spouse' | 'child' | 'sibling' | 'parent' | 'other'
  can_activate: boolean
  invited_at: string
  accepted_at?: string | null
}

export interface ActivationSettings {
  secret_phrase?: string
  require_verification: boolean
  notify_family_on_activation: boolean
}

export interface LivingProfile {
  id: string
  created_at: string
  updated_at: string
  user_id: string

  // Personal info (same as memorial)
  first_name: string
  last_name: string
  date_of_birth: string
  place_of_birth?: string | null
  father_name?: string | null
  mother_name?: string | null

  // Biography (can be updated over time)
  biography?: string | null
  profile_image_url?: string | null
  cover_image_url?: string | null

  // Living-specific fields
  status: LivingProfileStatus
  family_members: FamilyMember[]
  activation_settings: ActivationSettings

  // After activation
  converted_memorial_id?: string | null
  date_of_death?: string | null
  activated_at?: string | null
  activated_by?: string | null
}

export interface CreateLivingProfileInput {
  first_name: string
  last_name: string
  date_of_birth: string
  place_of_birth?: string
  father_name?: string
  mother_name?: string
  biography?: string
  profile_image_url?: string
  cover_image_url?: string
  activation_settings?: Partial<ActivationSettings>
}

export interface UpdateLivingProfileInput {
  first_name?: string
  last_name?: string
  date_of_birth?: string
  place_of_birth?: string | null
  father_name?: string | null
  mother_name?: string | null
  biography?: string | null
  profile_image_url?: string | null
  cover_image_url?: string | null
  activation_settings?: Partial<ActivationSettings>
}

export interface AddFamilyMemberInput {
  email: string
  name: string
  relationship: FamilyMember['relationship']
  can_activate: boolean
}
