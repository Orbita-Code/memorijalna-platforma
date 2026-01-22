import { supabase } from './supabase'
import type { ObituaryCondolence, CreateObituaryCondolenceInput } from '../types/obituaryCondolence'

// Privremeno koristi placeholder podatke dok se ne popuni baza
const USE_PLACEHOLDERS = true

// Placeholder saučešća za demo
const placeholderCondolences: ObituaryCondolence[] = [
  {
    id: 'oc-001',
    obituary_id: 'obit-001',
    sender_name: 'Marko i Ana Nikolić',
    sender_email: 'marko.nikolic@email.com',
    message: 'Draga porodice, primite naše najiskrenije saučešće. Jovan je bio izuzetan čovek koji je svima oko sebe donosio radost. Bićemo uz vas u ovim teškim trenucima.',
    is_read: true,
    created_at: '2025-01-14T10:00:00Z',
  },
  {
    id: 'oc-002',
    obituary_id: 'obit-001',
    sender_name: 'Kolege iz firme "Gradnja"',
    sender_email: null,
    message: 'Sa dubokim žaljenjem smo primili vest o odlasku našeg dragog kolege. Bio je stub kolektiva i pravi prijatelj. Neka počiva u miru.',
    is_read: true,
    created_at: '2025-01-14T11:30:00Z',
  },
  {
    id: 'oc-003',
    obituary_id: 'obit-001',
    sender_name: 'Porodica Stanković',
    sender_email: 'stankovic.fam@email.com',
    sender_phone: '063 123 456',
    message: 'Dragi naši, delimo vaš bol i tugu. Uvek ćemo pamtiti lepa druženja i Jovanovu gostoljubivost. Neka mu je večna slava.',
    is_read: false,
    created_at: '2025-01-14T14:00:00Z',
  },
  {
    id: 'oc-004',
    obituary_id: 'obit-002',
    sender_name: 'Dr. Petar Jovanović',
    sender_email: 'petar.j@hospital.rs',
    message: 'Profesorko Milice, hvala Vam na svemu što ste učinili za generacije studenata. Vaš doprinos medicini je nemerljiv. Počivajte u miru.',
    is_read: false,
    created_at: '2025-01-13T16:00:00Z',
  },
]

export async function createObituaryCondolence(
  input: CreateObituaryCondolenceInput
): Promise<{ data: ObituaryCondolence | null; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const newCondolence: ObituaryCondolence = {
      id: `oc-${Date.now()}`,
      obituary_id: input.obituary_id,
      sender_name: input.sender_name,
      sender_email: input.sender_email || null,
      sender_phone: input.sender_phone || null,
      message: input.message,
      is_read: false,
      created_at: new Date().toISOString(),
    }
    placeholderCondolences.push(newCondolence)

    // U produkciji bi ovde poslali email porodici
    console.log('📧 Email bi bio poslat porodici sa saučešćem od:', input.sender_name)

    return { data: newCondolence, error: null }
  }

  const { data, error } = await supabase
    .from('obituary_condolences')
    .insert({
      obituary_id: input.obituary_id,
      sender_name: input.sender_name,
      sender_email: input.sender_email || null,
      sender_phone: input.sender_phone || null,
      message: input.message,
      is_read: false,
    })
    .select()
    .single()

  // TODO: Poslati email porodici koristeći Edge Function
  // await sendCondolenceEmail(obituary.notification_email, data)

  return { data, error }
}

export async function getCondolencesByObituaryId(
  obituaryId: string
): Promise<{ data: ObituaryCondolence[] | null; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const condolences = placeholderCondolences
      .filter(c => c.obituary_id === obituaryId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    return { data: condolences, error: null }
  }

  const { data, error } = await supabase
    .from('obituary_condolences')
    .select('*')
    .eq('obituary_id', obituaryId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function getCondolencesCount(
  obituaryId: string
): Promise<{ count: number; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const count = placeholderCondolences.filter(c => c.obituary_id === obituaryId).length
    return { count, error: null }
  }

  const { count, error } = await supabase
    .from('obituary_condolences')
    .select('*', { count: 'exact', head: true })
    .eq('obituary_id', obituaryId)

  return { count: count || 0, error }
}

export async function markCondolenceAsRead(
  condolenceId: string
): Promise<{ error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const index = placeholderCondolences.findIndex(c => c.id === condolenceId)
    if (index !== -1) {
      placeholderCondolences[index].is_read = true
    }
    return { error: null }
  }

  const { error } = await supabase
    .from('obituary_condolences')
    .update({ is_read: true })
    .eq('id', condolenceId)

  return { error }
}

export async function getUnreadCondolencesCount(
  obituaryId: string
): Promise<{ count: number; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const count = placeholderCondolences.filter(c => c.obituary_id === obituaryId && !c.is_read).length
    return { count, error: null }
  }

  const { count, error } = await supabase
    .from('obituary_condolences')
    .select('*', { count: 'exact', head: true })
    .eq('obituary_id', obituaryId)
    .eq('is_read', false)

  return { count: count || 0, error }
}
