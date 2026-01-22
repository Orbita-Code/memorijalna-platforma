/**
 * Preminule osobe - grupisanje čitulja
 *
 * Kad neko kreira čitulju:
 * 1. Sistem pretražuje postojeće osobe po imenu + datumu smrti
 * 2. Prikazuje potencijalne match-eve
 * 3. Korisnik potvrdi ili kreira novu osobu
 * 4. Čitulja se povezuje sa osobom
 */

import { supabase } from './supabase'
import type {
  DeceasedPerson,
  CreateDeceasedPersonInput,
  DeceasedPersonMatch,
} from '../types/deceasedPerson'

// Privremeno koristi placeholder podatke dok se ne popuni baza
const USE_PLACEHOLDERS = true

// Placeholder preminule osobe za demo
const placeholderDeceasedPersons: DeceasedPerson[] = [
  {
    id: 'dp-001',
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
    first_name: 'Milica',
    last_name: 'Petrović',
    date_of_death: '2025-01-10',
    date_of_birth: '1945-03-15',
    place_of_death: 'Beograd',
    photo_url: null,
    memorial_id: null,
    condolences_count: 1,
  },
  {
    id: 'dp-002',
    created_at: '2025-01-11T14:00:00Z',
    updated_at: '2025-01-11T14:00:00Z',
    first_name: 'Dragan',
    last_name: 'Nikolić',
    date_of_death: '2025-01-05',
    date_of_birth: '1952-08-22',
    place_of_death: 'Novi Sad',
    photo_url: null,
    memorial_id: null,
    condolences_count: 1,
  },
  {
    id: 'dp-003',
    created_at: '2025-01-12T09:00:00Z',
    updated_at: '2025-01-12T09:00:00Z',
    first_name: 'Ana',
    last_name: 'Jovanović',
    date_of_death: '2025-01-08',
    date_of_birth: '1968-12-03',
    place_of_death: 'Niš',
    photo_url: null,
    memorial_id: null,
    condolences_count: 3, // Više čitulja za istu osobu
  },
  {
    id: 'dp-004',
    created_at: '2025-01-13T16:00:00Z',
    updated_at: '2025-01-13T16:00:00Z',
    first_name: 'Stojan',
    last_name: 'Marković',
    date_of_death: '2025-01-12',
    date_of_birth: '1938-05-10',
    place_of_death: 'Kragujevac',
    photo_url: null,
    memorial_id: null,
    condolences_count: 1,
  },
  {
    id: 'dp-005',
    created_at: '2025-01-14T11:00:00Z',
    updated_at: '2025-01-14T11:00:00Z',
    first_name: 'Jelena',
    last_name: 'Đorđević',
    date_of_death: '2025-01-10',
    date_of_birth: '1975-07-28',
    place_of_death: 'Beograd',
    photo_url: null,
    memorial_id: null,
    condolences_count: 2,
  },
]

/**
 * Normalizuje ime za poređenje (lowercase, bez dijakritika)
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Ukloni dijakritike
    .replace(/đ/g, 'd')
    .replace(/ž/g, 'z')
    .replace(/č/g, 'c')
    .replace(/ć/g, 'c')
    .replace(/š/g, 's')
    .trim()
}

/**
 * Pronalazi potencijalne match-eve za preminulu osobu
 * Vraća listu mogućih podudaranja sa nivoom pouzdanosti
 */
export async function findDeceasedPersonMatches(
  firstName: string,
  lastName: string,
  dateOfDeath: string
): Promise<{ data: DeceasedPersonMatch[] | null; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const normalizedFirst = normalizeName(firstName)
    const normalizedLast = normalizeName(lastName)

    const matches: DeceasedPersonMatch[] = []

    for (const person of placeholderDeceasedPersons) {
      const personFirst = normalizeName(person.first_name)
      const personLast = normalizeName(person.last_name)

      // Exact match: isto ime, prezime i datum smrti
      if (
        personFirst === normalizedFirst &&
        personLast === normalizedLast &&
        person.date_of_death === dateOfDeath
      ) {
        matches.push({
          person,
          confidence: 'exact',
          matchReason: 'Isto ime, prezime i datum smrti',
        })
        continue
      }

      // High confidence: isto ime i prezime, sličan datum smrti (±7 dana)
      if (personFirst === normalizedFirst && personLast === normalizedLast) {
        const personDate = new Date(person.date_of_death)
        const inputDate = new Date(dateOfDeath)
        const diffDays = Math.abs(
          (personDate.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24)
        )

        if (diffDays <= 7) {
          matches.push({
            person,
            confidence: 'high',
            matchReason: `Isto ime i prezime, datum smrti razlika ${Math.round(diffDays)} dana`,
          })
          continue
        }
      }

      // Medium confidence: isto prezime i sličan datum smrti
      if (personLast === normalizedLast && person.date_of_death === dateOfDeath) {
        matches.push({
          person,
          confidence: 'medium',
          matchReason: 'Isto prezime i datum smrti',
        })
      }
    }

    // Sortiraj po pouzdanosti
    const confidenceOrder = { exact: 0, high: 1, medium: 2 }
    matches.sort((a, b) => confidenceOrder[a.confidence] - confidenceOrder[b.confidence])

    return { data: matches, error: null }
  }

  // Supabase query
  const normalizedFirst = normalizeName(firstName)
  const normalizedLast = normalizeName(lastName)

  const { data, error } = await supabase
    .from('deceased_persons')
    .select('*')
    .or(
      `and(first_name.ilike.%${firstName}%,last_name.ilike.%${lastName}%),` +
        `and(last_name.ilike.%${lastName}%,date_of_death.eq.${dateOfDeath})`
    )
    .limit(10)

  if (error) {
    return { data: null, error }
  }

  // Oceni podudaranja
  const matches: DeceasedPersonMatch[] = (data || []).map((person: DeceasedPerson) => {
    const personFirst = normalizeName(person.first_name)
    const personLast = normalizeName(person.last_name)

    if (
      personFirst === normalizedFirst &&
      personLast === normalizedLast &&
      person.date_of_death === dateOfDeath
    ) {
      return { person, confidence: 'exact' as const, matchReason: 'Isto ime, prezime i datum smrti' }
    }

    if (personFirst === normalizedFirst && personLast === normalizedLast) {
      return { person, confidence: 'high' as const, matchReason: 'Isto ime i prezime' }
    }

    return { person, confidence: 'medium' as const, matchReason: 'Slično ime ili prezime' }
  })

  const confidenceOrder = { exact: 0, high: 1, medium: 2 }
  matches.sort((a, b) => confidenceOrder[a.confidence] - confidenceOrder[b.confidence])

  return { data: matches, error: null }
}

/**
 * Kreira novu preminulu osobu
 */
export async function createDeceasedPerson(
  input: CreateDeceasedPersonInput
): Promise<{ data: DeceasedPerson | null; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const newPerson: DeceasedPerson = {
      id: `dp-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      first_name: input.first_name,
      last_name: input.last_name,
      date_of_death: input.date_of_death,
      date_of_birth: input.date_of_birth || null,
      place_of_death: input.place_of_death || null,
      photo_url: input.photo_url || null,
      memorial_id: null,
      condolences_count: 0,
    }
    placeholderDeceasedPersons.push(newPerson)
    return { data: newPerson, error: null }
  }

  const { data, error } = await supabase
    .from('deceased_persons')
    .insert({
      first_name: input.first_name,
      last_name: input.last_name,
      date_of_death: input.date_of_death,
      date_of_birth: input.date_of_birth || null,
      place_of_death: input.place_of_death || null,
      photo_url: input.photo_url || null,
      condolences_count: 0,
    })
    .select()
    .single()

  return { data, error }
}

/**
 * Dohvata preminulu osobu po ID-u
 */
export async function getDeceasedPersonById(
  id: string
): Promise<{ data: DeceasedPerson | null; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const person = placeholderDeceasedPersons.find((p) => p.id === id)
    return {
      data: person || null,
      error: person ? null : new Error('Osoba nije pronađena'),
    }
  }

  const { data, error } = await supabase
    .from('deceased_persons')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}

/**
 * Dohvata sve preminule osobe sa bar jednom čituljem
 * Sortirano po datumu smrti (najnovije prvo)
 */
export async function getDeceasedPersonsWithCondolences(
  limit = 50
): Promise<{ data: DeceasedPerson[] | null; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const persons = [...placeholderDeceasedPersons]
      .filter((p) => p.condolences_count > 0)
      .sort((a, b) => new Date(b.date_of_death).getTime() - new Date(a.date_of_death).getTime())
      .slice(0, limit)
    return { data: persons, error: null }
  }

  const { data, error } = await supabase
    .from('deceased_persons')
    .select('*')
    .gt('condolences_count', 0)
    .order('date_of_death', { ascending: false })
    .limit(limit)

  return { data, error }
}

/**
 * Uvećava broj čitulja za osobu
 */
export async function incrementCondolenceCount(
  personId: string
): Promise<{ error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const index = placeholderDeceasedPersons.findIndex((p) => p.id === personId)
    if (index !== -1) {
      placeholderDeceasedPersons[index].condolences_count++
    }
    return { error: null }
  }

  const { error } = await supabase.rpc('increment_condolence_count', {
    person_id: personId,
  })

  return { error }
}

/**
 * Ažurira sliku preminule osobe (ako je nema)
 */
export async function updateDeceasedPersonPhoto(
  personId: string,
  photoUrl: string
): Promise<{ error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const index = placeholderDeceasedPersons.findIndex((p) => p.id === personId)
    if (index !== -1 && !placeholderDeceasedPersons[index].photo_url) {
      placeholderDeceasedPersons[index].photo_url = photoUrl
    }
    return { error: null }
  }

  // Samo ažuriraj ako nema sliku
  const { error } = await supabase
    .from('deceased_persons')
    .update({ photo_url: photoUrl })
    .eq('id', personId)
    .is('photo_url', null)

  return { error }
}

/**
 * Povezuje preminulu osobu sa memorijalom
 */
export async function linkDeceasedPersonToMemorial(
  personId: string,
  memorialId: string
): Promise<{ error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const index = placeholderDeceasedPersons.findIndex((p) => p.id === personId)
    if (index !== -1) {
      placeholderDeceasedPersons[index].memorial_id = memorialId
    }
    return { error: null }
  }

  const { error } = await supabase
    .from('deceased_persons')
    .update({ memorial_id: memorialId })
    .eq('id', personId)

  return { error }
}
