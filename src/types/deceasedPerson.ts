/**
 * Preminula osoba - povezuje više čitulja za istu osobu
 * Automatski se kreira kad neko postavi prvu čitulju
 * Može se povezati sa memorijalom ako postoji
 */

export interface DeceasedPerson {
  id: string
  created_at: string
  updated_at: string

  // Osnovni podaci
  first_name: string
  last_name: string
  date_of_death: string // Obavezan za grupisanje
  date_of_birth?: string | null
  place_of_death?: string | null

  // Slika (opciono - prva osoba koja ima može dodati)
  photo_url?: string | null

  // Povezivanje sa memorijalom (ako postoji)
  memorial_id?: string | null

  // Statistika
  condolences_count: number
}

export interface CreateDeceasedPersonInput {
  first_name: string
  last_name: string
  date_of_death: string
  date_of_birth?: string
  place_of_death?: string
  photo_url?: string
}

export interface DeceasedPersonMatch {
  person: DeceasedPerson
  confidence: 'exact' | 'high' | 'medium' // Koliko smo sigurni da je ista osoba
  matchReason: string // Zašto mislimo da je match
}
