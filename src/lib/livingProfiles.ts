import { supabase } from './supabase'
import type {
  LivingProfile,
  CreateLivingProfileInput,
  UpdateLivingProfileInput,
  AddFamilyMemberInput,
  FamilyMember,
} from '../types/livingProfile'
import { createMemorial } from './memorials'

export async function createLivingProfile(
  input: CreateLivingProfileInput,
  userId: string
): Promise<{ data: LivingProfile | null; error: Error | null }> {
  // Check if user already has a living profile
  const { data: existing } = await supabase
    .from('living_profiles')
    .select('id')
    .eq('user_id', userId)
    .single()

  if (existing) {
    return { data: null, error: new Error('Vec imate zivotni profil') }
  }

  const { data, error } = await supabase
    .from('living_profiles')
    .insert({
      user_id: userId,
      first_name: input.first_name,
      last_name: input.last_name,
      date_of_birth: input.date_of_birth,
      place_of_birth: input.place_of_birth || null,
      father_name: input.father_name || null,
      mother_name: input.mother_name || null,
      biography: input.biography || null,
      profile_image_url: input.profile_image_url || null,
      cover_image_url: input.cover_image_url || null,
      status: 'draft',
      family_members: [],
      activation_settings: {
        secret_phrase: '',
        require_verification: true,
        notify_family_on_activation: true,
        ...input.activation_settings,
      },
    })
    .select()
    .single()

  return { data, error }
}

export async function getLivingProfileById(
  id: string
): Promise<{ data: LivingProfile | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('living_profiles')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}

export async function getUserLivingProfile(
  userId: string
): Promise<{ data: LivingProfile | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('living_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  return { data, error }
}

export async function updateLivingProfile(
  id: string,
  input: UpdateLivingProfileInput,
  userId: string
): Promise<{ data: LivingProfile | null; error: Error | null }> {
  // Verify ownership
  const { data: existing, error: fetchError } = await supabase
    .from('living_profiles')
    .select('user_id, status')
    .eq('id', id)
    .single()

  if (fetchError || !existing) {
    return { data: null, error: new Error('Profil nije pronaden') }
  }

  if (existing.user_id !== userId) {
    return { data: null, error: new Error('Nemate dozvolu da izmenite ovaj profil') }
  }

  if (existing.status === 'converted') {
    return { data: null, error: new Error('Profil je vec konvertovan u memorijal') }
  }

  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  // Only add fields that are provided
  if (input.first_name !== undefined) updateData.first_name = input.first_name
  if (input.last_name !== undefined) updateData.last_name = input.last_name
  if (input.date_of_birth !== undefined) updateData.date_of_birth = input.date_of_birth
  if (input.place_of_birth !== undefined) updateData.place_of_birth = input.place_of_birth
  if (input.father_name !== undefined) updateData.father_name = input.father_name
  if (input.mother_name !== undefined) updateData.mother_name = input.mother_name
  if (input.biography !== undefined) updateData.biography = input.biography
  if (input.profile_image_url !== undefined) updateData.profile_image_url = input.profile_image_url
  if (input.cover_image_url !== undefined) updateData.cover_image_url = input.cover_image_url
  if (input.activation_settings !== undefined) {
    // Merge with existing settings
    const { data: current } = await getLivingProfileById(id)
    if (current) {
      updateData.activation_settings = {
        ...current.activation_settings,
        ...input.activation_settings,
      }
    }
  }

  const { data, error } = await supabase
    .from('living_profiles')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function addFamilyMember(
  profileId: string,
  input: AddFamilyMemberInput,
  userId: string
): Promise<{ data: LivingProfile | null; error: Error | null }> {
  // Verify ownership
  const { data: profile, error: fetchError } = await supabase
    .from('living_profiles')
    .select('*')
    .eq('id', profileId)
    .single()

  if (fetchError || !profile) {
    return { data: null, error: new Error('Profil nije pronaden') }
  }

  if (profile.user_id !== userId) {
    return { data: null, error: new Error('Nemate dozvolu da izmenite ovaj profil') }
  }

  const newMember: FamilyMember = {
    id: crypto.randomUUID(),
    email: input.email,
    name: input.name,
    relationship: input.relationship,
    can_activate: input.can_activate,
    invited_at: new Date().toISOString(),
    accepted_at: null,
  }

  const updatedMembers = [...(profile.family_members || []), newMember]

  const { data, error } = await supabase
    .from('living_profiles')
    .update({
      family_members: updatedMembers,
      updated_at: new Date().toISOString(),
    })
    .eq('id', profileId)
    .select()
    .single()

  return { data, error }
}

export async function removeFamilyMember(
  profileId: string,
  memberId: string,
  userId: string
): Promise<{ data: LivingProfile | null; error: Error | null }> {
  const { data: profile, error: fetchError } = await supabase
    .from('living_profiles')
    .select('*')
    .eq('id', profileId)
    .single()

  if (fetchError || !profile) {
    return { data: null, error: new Error('Profil nije pronaden') }
  }

  if (profile.user_id !== userId) {
    return { data: null, error: new Error('Nemate dozvolu da izmenite ovaj profil') }
  }

  const updatedMembers = (profile.family_members || []).filter(
    (m: FamilyMember) => m.id !== memberId
  )

  const { data, error } = await supabase
    .from('living_profiles')
    .update({
      family_members: updatedMembers,
      updated_at: new Date().toISOString(),
    })
    .eq('id', profileId)
    .select()
    .single()

  return { data, error }
}

export async function activateProfile(
  profileId: string,
  secretPhrase: string,
  dateOfDeath: string,
  activatorUserId: string
): Promise<{ data: { memorialId: string } | null; error: Error | null }> {
  const { data: profile, error: fetchError } = await supabase
    .from('living_profiles')
    .select('*')
    .eq('id', profileId)
    .single()

  if (fetchError || !profile) {
    return { data: null, error: new Error('Profil nije pronaden') }
  }

  if (profile.status === 'converted') {
    return { data: null, error: new Error('Profil je vec konvertovan') }
  }

  // Verify secret phrase
  if (
    profile.activation_settings?.secret_phrase &&
    profile.activation_settings.secret_phrase !== secretPhrase
  ) {
    return { data: null, error: new Error('Pogresna tajna fraza') }
  }

  // For MVP, we allow activation if secret phrase matches
  // TODO: In production, check if activator is authorized family member

  // Create memorial from living profile
  const { data: memorial, error: createError } = await createMemorial(
    {
      first_name: profile.first_name,
      last_name: profile.last_name,
      birth_date: profile.date_of_birth,
      death_date: dateOfDeath,
      birth_place: profile.place_of_birth || '',
      death_place: '',
      father_name: profile.father_name || undefined,
      mother_name: profile.mother_name || undefined,
    },
    profile.user_id
  )

  if (createError || !memorial) {
    return { data: null, error: new Error('Greska pri kreiranju memorijala') }
  }

  // Update living profile status
  const { error: updateError } = await supabase
    .from('living_profiles')
    .update({
      status: 'converted',
      converted_memorial_id: memorial.id,
      date_of_death: dateOfDeath,
      activated_at: new Date().toISOString(),
      activated_by: activatorUserId,
    })
    .eq('id', profileId)

  if (updateError) {
    return { data: null, error: new Error('Greska pri azuriranju profila') }
  }

  return { data: { memorialId: memorial.id }, error: null }
}

export async function publishLivingProfile(
  id: string,
  userId: string
): Promise<{ data: LivingProfile | null; error: Error | null }> {
  const { data: profile, error: fetchError } = await supabase
    .from('living_profiles')
    .select('user_id, status')
    .eq('id', id)
    .single()

  if (fetchError || !profile) {
    return { data: null, error: new Error('Profil nije pronaden') }
  }

  if (profile.user_id !== userId) {
    return { data: null, error: new Error('Nemate dozvolu') }
  }

  if (profile.status === 'converted') {
    return { data: null, error: new Error('Profil je vec konvertovan') }
  }

  const { data, error } = await supabase
    .from('living_profiles')
    .update({ status: 'active' })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}
