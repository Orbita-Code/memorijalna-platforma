import { supabase } from './supabase'
import type { Condolence, CreateCondolenceInput, CondolenceStatus } from '../types/condolence'

// Privremeno koristi placeholder podatke dok se ne popuni baza
const USE_PLACEHOLDERS = true

// Placeholder čitulje za demo - povezane sa deceased_persons
const placeholderCondolences: Condolence[] = [
  {
    id: 'cond-001',
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
    deceased_person_id: 'dp-001', // Milica Petrović
    deceased_first_name: 'Milica',
    deceased_last_name: 'Petrović',
    date_of_birth: '1945-03-15',
    date_of_death: '2025-01-10',
    photo_url: null,
    content: 'Draga tetka Milice, hvala ti za sve lepe uspomene koje si nam ostavila. Tvoja dobrota i toplina ostaće zauvek u našim srcima. Počivaj u miru.',
    from_name: 'Porodica Simić',
    status: 'approved',
    moderation_note: null,
    payment_status: 'completed',
    stripe_payment_id: null,
    user_id: null
  },
  {
    id: 'cond-002',
    created_at: '2025-01-11T14:00:00Z',
    updated_at: '2025-01-11T14:00:00Z',
    deceased_person_id: 'dp-002', // Dragan Nikolić
    deceased_first_name: 'Dragan',
    deceased_last_name: 'Nikolić',
    date_of_birth: '1952-08-22',
    date_of_death: '2025-01-05',
    photo_url: null,
    content: 'Dragi Dragane, bio si najbolji komšija kojeg smo ikad imali. Uvek spreman da pomogneš, uvek nasmejano lice. Nedostajaćeš nam. Neka ti je laka crna zemlja.',
    from_name: 'Komšije iz Ruzveltove',
    status: 'approved',
    moderation_note: null,
    payment_status: 'completed',
    stripe_payment_id: null,
    user_id: null
  },
  {
    id: 'cond-003',
    created_at: '2025-01-12T09:00:00Z',
    updated_at: '2025-01-12T09:00:00Z',
    deceased_person_id: 'dp-003', // Ana Jovanović
    deceased_first_name: 'Ana',
    deceased_last_name: 'Jovanović',
    date_of_birth: '1968-12-03',
    date_of_death: '2025-01-08',
    photo_url: null,
    content: 'Profesorko Ana, zauvek ćemo pamtiti vaše časove i vašu ljubav prema medicini. Učili ste nas da budemo bolji lekari i bolji ljudi. Hvala vam na svemu.',
    from_name: null, // Anonimno
    status: 'approved',
    moderation_note: null,
    payment_status: 'completed',
    stripe_payment_id: null,
    user_id: null
  },
  {
    id: 'cond-006',
    created_at: '2025-01-12T11:00:00Z',
    updated_at: '2025-01-12T11:00:00Z',
    deceased_person_id: 'dp-003', // Ana Jovanović - druga čitulja
    deceased_first_name: 'Ana',
    deceased_last_name: 'Jovanović',
    date_of_birth: '1968-12-03',
    date_of_death: '2025-01-08',
    photo_url: null,
    content: 'Draga doktorko Ana, vaši saveti su mi spasili život. Nikada neću zaboraviti koliko ste se trudili oko svakog pacijenta. Počivajte u miru.',
    from_name: 'Zahvalni pacijent',
    status: 'approved',
    moderation_note: null,
    payment_status: 'completed',
    stripe_payment_id: null,
    user_id: null
  },
  {
    id: 'cond-007',
    created_at: '2025-01-12T15:00:00Z',
    updated_at: '2025-01-12T15:00:00Z',
    deceased_person_id: 'dp-003', // Ana Jovanović - treća čitulja
    deceased_first_name: 'Ana',
    deceased_last_name: 'Jovanović',
    date_of_birth: '1968-12-03',
    date_of_death: '2025-01-08',
    photo_url: null,
    content: 'Koleginice Ana, tvoj odlazak ostavio je veliku prazninu u našem odeljenju. Bila si uzor profesionalnosti i empatije. Neka ti je laka crna zemlja.',
    from_name: 'Kolege sa Kliničkog centra',
    status: 'approved',
    moderation_note: null,
    payment_status: 'completed',
    stripe_payment_id: null,
    user_id: null
  },
  {
    id: 'cond-004',
    created_at: '2025-01-13T16:00:00Z',
    updated_at: '2025-01-13T16:00:00Z',
    deceased_person_id: 'dp-004', // Stojan Marković
    deceased_first_name: 'Stojan',
    deceased_last_name: 'Marković',
    date_of_birth: '1938-05-10',
    date_of_death: '2025-01-12',
    photo_url: null,
    content: 'Majstore Stojane, tvoj nameštaj krasi naš dom već 30 godina. Svaki put kad sednem za sto koji si napravio, setim se tvojih zlatnih ruku i toplog osmeha. Počivaj u miru.',
    from_name: 'Porodica Đorđević iz Kragujevca',
    status: 'approved',
    moderation_note: null,
    payment_status: 'completed',
    stripe_payment_id: null,
    user_id: null
  },
  {
    id: 'cond-005',
    created_at: '2025-01-14T11:00:00Z',
    updated_at: '2025-01-14T11:00:00Z',
    deceased_person_id: 'dp-005', // Jelena Đorđević
    deceased_first_name: 'Jelena',
    deceased_last_name: 'Đorđević',
    date_of_birth: '1975-07-28',
    date_of_death: '2025-01-10',
    photo_url: null,
    content: 'Draga Jelena, tvoja muzika i dalje živi u nama. Dečji hor koji si vodila peva za tebe. Hvala ti što si nas naučila da volimo muziku.',
    from_name: 'Dečiji hor "Zvončići"',
    status: 'approved',
    moderation_note: null,
    payment_status: 'completed',
    stripe_payment_id: null,
    user_id: null
  },
  {
    id: 'cond-008',
    created_at: '2025-01-14T14:00:00Z',
    updated_at: '2025-01-14T14:00:00Z',
    deceased_person_id: 'dp-005', // Jelena Đorđević - druga čitulja
    deceased_first_name: 'Jelena',
    deceased_last_name: 'Đorđević',
    date_of_birth: '1975-07-28',
    date_of_death: '2025-01-10',
    photo_url: null,
    content: 'Jelena, bila si više od profesorke - bila si naša druga mama. Svako dete koje si naučila da peva nosi parče tvoje duše. Večno ćemo te pamtiti.',
    from_name: 'Muzička škola "Josip Slavenski"',
    status: 'approved',
    moderation_note: null,
    payment_status: 'completed',
    stripe_payment_id: null,
    user_id: null
  }
]

export async function createCondolence(
  input: CreateCondolenceInput,
  userId?: string
): Promise<{ data: Condolence | null; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const newCondolence: Condolence = {
      id: `cond-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deceased_first_name: input.deceased_first_name,
      deceased_last_name: input.deceased_last_name,
      date_of_birth: input.date_of_birth || null,
      date_of_death: input.date_of_death || null,
      photo_url: input.photo_url || null,
      content: input.content,
      from_name: input.from_name || null,
      status: 'pending', // Prolazi moderaciju
      moderation_note: null,
      payment_status: 'pending',
      stripe_payment_id: null,
      user_id: userId || null
    }
    placeholderCondolences.push(newCondolence)
    return { data: newCondolence, error: null }
  }

  const { data, error } = await supabase
    .from('condolences')
    .insert({
      deceased_first_name: input.deceased_first_name,
      deceased_last_name: input.deceased_last_name,
      date_of_birth: input.date_of_birth || null,
      date_of_death: input.date_of_death || null,
      photo_url: input.photo_url || null,
      content: input.content,
      from_name: input.from_name || null,
      status: 'pending',
      payment_status: 'pending',
      user_id: userId || null
    })
    .select()
    .single()

  return { data, error }
}

export async function getCondolenceById(
  id: string
): Promise<{ data: Condolence | null; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const condolence = placeholderCondolences.find(c => c.id === id && c.status === 'approved')
    return {
      data: condolence || null,
      error: condolence ? null : new Error('Čitulja nije pronađena')
    }
  }

  const { data, error } = await supabase
    .from('condolences')
    .select('*')
    .eq('id', id)
    .eq('status', 'approved')
    .single()

  return { data, error }
}

export async function getApprovedCondolences(
  limit = 20
): Promise<{ data: Condolence[] | null; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const approved = placeholderCondolences
      .filter(c => c.status === 'approved' && c.payment_status === 'completed')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit)
    return { data: approved, error: null }
  }

  const { data, error } = await supabase
    .from('condolences')
    .select('*')
    .eq('status', 'approved')
    .eq('payment_status', 'completed')
    .order('created_at', { ascending: false })
    .limit(limit)

  return { data, error }
}

export async function updateCondolenceStatus(
  id: string,
  status: CondolenceStatus,
  note?: string
): Promise<{ data: Condolence | null; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const index = placeholderCondolences.findIndex(c => c.id === id)
    if (index === -1) {
      return { data: null, error: new Error('Čitulja nije pronađena') }
    }
    placeholderCondolences[index].status = status
    placeholderCondolences[index].moderation_note = note || null
    placeholderCondolences[index].updated_at = new Date().toISOString()
    return { data: placeholderCondolences[index], error: null }
  }

  const updateData: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString()
  }
  if (note) {
    updateData.moderation_note = note
  }

  const { data, error } = await supabase
    .from('condolences')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function updateCondolencePayment(
  id: string,
  paymentStatus: 'completed' | 'failed',
  stripePaymentId?: string
): Promise<{ data: Condolence | null; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const index = placeholderCondolences.findIndex(c => c.id === id)
    if (index === -1) {
      return { data: null, error: new Error('Čitulja nije pronađena') }
    }
    placeholderCondolences[index].payment_status = paymentStatus
    placeholderCondolences[index].stripe_payment_id = stripePaymentId || null
    // Automatski odobri u demo modu nakon plaćanja
    if (paymentStatus === 'completed') {
      placeholderCondolences[index].status = 'approved'
    }
    return { data: placeholderCondolences[index], error: null }
  }

  const updateData: Record<string, unknown> = {
    payment_status: paymentStatus,
    updated_at: new Date().toISOString()
  }
  if (stripePaymentId) {
    updateData.stripe_payment_id = stripePaymentId
  }

  const { data, error } = await supabase
    .from('condolences')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

/**
 * Dohvata sve odobrene čitulje za određenu preminulu osobu
 */
export async function getCondolencesByPersonId(
  personId: string
): Promise<{ data: Condolence[] | null; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const condolences = placeholderCondolences
      .filter(c =>
        c.deceased_person_id === personId &&
        c.status === 'approved' &&
        c.payment_status === 'completed'
      )
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    return { data: condolences, error: null }
  }

  const { data, error } = await supabase
    .from('condolences')
    .select('*')
    .eq('deceased_person_id', personId)
    .eq('status', 'approved')
    .eq('payment_status', 'completed')
    .order('created_at', { ascending: false })

  return { data, error }
}
