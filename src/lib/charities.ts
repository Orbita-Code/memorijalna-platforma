/**
 * Humanitarne organizacije - Preset lista + custom opcija
 *
 * Porodica može izabrati jednu od poznatih organizacija
 * ili uneti custom organizaciju sa linkom za donacije
 */

export interface Charity {
  id: string
  name: string
  description: string
  category: CharityCategory
  logoUrl?: string
  websiteUrl: string
  donationUrl: string
  country: 'RS' | 'HR' | 'BA' | 'ME' | 'SI' | 'MK' | 'INT'
}

export type CharityCategory =
  | 'health'      // Zdravlje
  | 'children'    // Deca
  | 'animals'     // Životinje
  | 'elderly'     // Stariji
  | 'poverty'     // Siromaštvo
  | 'education'   // Obrazovanje
  | 'environment' // Životna sredina
  | 'disaster'    // Katastrofe
  | 'other'       // Ostalo

export const CHARITY_CATEGORIES: Record<CharityCategory, string> = {
  health: 'Zdravlje',
  children: 'Deca',
  animals: 'Životinje',
  elderly: 'Stariji',
  poverty: 'Siromaštvo i glad',
  education: 'Obrazovanje',
  environment: 'Životna sredina',
  disaster: 'Pomoć u katastrofama',
  other: 'Ostalo',
}

/**
 * Preset lista humanitarnih organizacija
 * Fokus na Srbiju i region + međunarodne
 */
export const PRESET_CHARITIES: Charity[] = [
  // === SRBIJA ===
  {
    id: 'crveni-krst-srbije',
    name: 'Crveni krst Srbije',
    description: 'Humanitarna organizacija koja pomaže ugroženim kategorijama stanovništva',
    category: 'poverty',
    websiteUrl: 'https://www.redcross.org.rs',
    donationUrl: 'https://www.redcross.org.rs/donate',
    country: 'RS',
  },
  {
    id: 'unicef-srbija',
    name: 'UNICEF Srbija',
    description: 'Pomoć deci u Srbiji - zdravlje, obrazovanje, zaštita',
    category: 'children',
    websiteUrl: 'https://www.unicef.org/serbia',
    donationUrl: 'https://www.unicef.org/serbia/donacije',
    country: 'RS',
  },
  {
    id: 'nasa-srbija',
    name: 'Fondacija "Novak Đoković"',
    description: 'Predškolsko obrazovanje i razvoj dece u Srbiji',
    category: 'education',
    websiteUrl: 'https://novakdjokovicfoundation.org',
    donationUrl: 'https://novakdjokovicfoundation.org/donate/',
    country: 'RS',
  },
  {
    id: 'budi-human',
    name: 'Budi human',
    description: 'Humanitarna fondacija Budi human - pomoć ugroženima',
    category: 'health',
    websiteUrl: 'https://budihuman.rs',
    donationUrl: 'https://budihuman.rs/donacija/',
    country: 'RS',
  },
  {
    id: 'zvezdana-zelja',
    name: 'Zvezdana želja',
    description: 'Ispunjavanje želja teško bolesnoj deci',
    category: 'children',
    websiteUrl: 'https://www.zvezdanazelja.rs',
    donationUrl: 'https://www.zvezdanazelja.rs/kako-pomoci/',
    country: 'RS',
  },
  {
    id: 'pruzimo-ruke',
    name: 'Pružimo ruke',
    description: 'Pomoć deci bez roditeljskog staranja',
    category: 'children',
    websiteUrl: 'https://www.pruzimoruke.org',
    donationUrl: 'https://www.pruzimoruke.org/donacija/',
    country: 'RS',
  },
  // Životinje
  {
    id: 'orca-srbija',
    name: 'ORCA',
    description: 'Organizacija za poštovanje i brigu o životinjama',
    category: 'animals',
    websiteUrl: 'https://www.orca.rs',
    donationUrl: 'https://www.orca.rs/pomozite/',
    country: 'RS',
  },
  {
    id: 'spanac-azil',
    name: 'Azil "Šapice"',
    description: 'Azil za napuštene pse i mačke',
    category: 'animals',
    websiteUrl: 'https://www.sapice.rs',
    donationUrl: 'https://www.sapice.rs/donacije/',
    country: 'RS',
  },

  // === MEĐUNARODNE ===
  {
    id: 'doctors-without-borders',
    name: 'Lekari bez granica',
    description: 'Medicinska pomoć u kriznim područjima širom sveta',
    category: 'health',
    websiteUrl: 'https://www.msf.org',
    donationUrl: 'https://www.msf.org/donate',
    country: 'INT',
  },
  {
    id: 'red-cross-intl',
    name: 'Međunarodni Crveni krst',
    description: 'Humanitarna pomoć širom sveta',
    category: 'disaster',
    websiteUrl: 'https://www.icrc.org',
    donationUrl: 'https://www.icrc.org/en/donate',
    country: 'INT',
  },
  {
    id: 'unicef-global',
    name: 'UNICEF',
    description: 'Pomoć deci širom sveta',
    category: 'children',
    websiteUrl: 'https://www.unicef.org',
    donationUrl: 'https://www.unicef.org/donate',
    country: 'INT',
  },
  {
    id: 'wwf',
    name: 'WWF',
    description: 'Zaštita prirode i ugroženih vrsta',
    category: 'environment',
    websiteUrl: 'https://www.worldwildlife.org',
    donationUrl: 'https://support.worldwildlife.org/site/Donation',
    country: 'INT',
  },
  {
    id: 'cancer-research',
    name: 'Cancer Research',
    description: 'Istraživanje i borba protiv raka',
    category: 'health',
    websiteUrl: 'https://www.cancerresearch.org',
    donationUrl: 'https://www.cancerresearch.org/donate',
    country: 'INT',
  },
]

/**
 * Dohvata organizacije po kategoriji
 */
export function getCharitiesByCategory(category: CharityCategory): Charity[] {
  return PRESET_CHARITIES.filter((c) => c.category === category)
}

/**
 * Dohvata organizacije po zemlji
 */
export function getCharitiesByCountry(country: Charity['country']): Charity[] {
  return PRESET_CHARITIES.filter((c) => c.country === country)
}

/**
 * Pretraga organizacija po imenu
 */
export function searchCharities(query: string): Charity[] {
  const lowerQuery = query.toLowerCase()
  return PRESET_CHARITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Custom organizacija koju porodica može dodati
 */
export interface CustomCharity {
  name: string
  donationUrl: string
  description?: string
}

/**
 * Validira URL za donacije
 */
export function isValidDonationUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}
