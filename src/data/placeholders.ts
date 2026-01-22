/**
 * Placeholder data za demo prikaz
 * Ovi podaci se koriste dok se ne popuni prava baza
 */

import type { FuneralHome, Cemetery, StoneMason, QRPartner } from '../types/partners'
import type { Obituary } from '../types/obituary'
import type { Comment } from '../types/comment'
import type { Gift } from '../types/gift'

// ============================================
// PLACEHOLDER POSVETE / KOMENTARI
// ============================================
export const placeholderComments: Comment[] = [
  // Komentari za mem-001 (Milica Petrović)
  {
    id: 'comment-001',
    memorial_id: 'mem-001',
    author_name: 'Marko Petrović',
    author_email: null,
    content: 'Draga mama, nedostaješ nam svakog dana. Tvoja mudrost i ljubav ostaju sa nama zauvek. Hvala ti za sve lekcije o životu i za bezuslovnu ljubav koju si nam davala. Počivaj u miru.',
    is_anonymous: false,
    status: 'approved',
    moderation_note: null,
    created_at: '2025-01-11T10:00:00Z',
    updated_at: '2025-01-11T10:00:00Z'
  },
  {
    id: 'comment-002',
    memorial_id: 'mem-001',
    author_name: 'Jelena Petrović-Simić',
    author_email: null,
    content: 'Mama, bila si naš stub i naša svetlost. Učila si nas da budemo dobri ljudi i da volimo knjige. Čuvaćemo tvoje uspomene i prenositi ih na naše mališane.',
    is_anonymous: false,
    status: 'approved',
    moderation_note: null,
    created_at: '2025-01-11T11:30:00Z',
    updated_at: '2025-01-11T11:30:00Z'
  },
  {
    id: 'comment-003',
    memorial_id: 'mem-001',
    author_name: 'Anonimno',
    author_email: null,
    content: 'Profesorko Petrović, bila ste moja omiljena nastavnica. Zahvaljujući vama zavolela sam čitanje i srpski jezik. Neka vam je večna slava.',
    is_anonymous: true,
    status: 'approved',
    moderation_note: null,
    created_at: '2025-01-12T09:15:00Z',
    updated_at: '2025-01-12T09:15:00Z'
  },
  // Komentari za mem-002 (Dragan Nikolić)
  {
    id: 'comment-004',
    memorial_id: 'mem-002',
    author_name: 'Nikola Nikolić',
    author_email: null,
    content: 'Tata, naučio si me sve što znam. Bio si najbolji otac i uzor. Čuvaćemo uspomene na naše zajedničke ribolovne avanture.',
    is_anonymous: false,
    status: 'approved',
    moderation_note: null,
    created_at: '2025-01-06T14:00:00Z',
    updated_at: '2025-01-06T14:00:00Z'
  },
  {
    id: 'comment-005',
    memorial_id: 'mem-002',
    author_name: 'Anonimno',
    author_email: null,
    content: 'Bio je sjajan kolega i prijatelj. Uvek spreman da pomogne i posavetuje. Nedostajaće nam njegov humor.',
    is_anonymous: true,
    status: 'approved',
    moderation_note: null,
    created_at: '2025-01-07T08:30:00Z',
    updated_at: '2025-01-07T08:30:00Z'
  },
  // Komentari za mem-003 (Ana Jovanović)
  {
    id: 'comment-006',
    memorial_id: 'mem-003',
    author_name: 'Dr Marija Todorović',
    author_email: null,
    content: 'Ana je bila neverovatna koleginica i prijateljica. Njena posvećenost pacijentima bila je inspiracija za sve nas. Pamtićemo je po njenom toplom osmehu i profesionalizmu.',
    is_anonymous: false,
    status: 'approved',
    moderation_note: null,
    created_at: '2025-02-21T16:00:00Z',
    updated_at: '2025-02-21T16:00:00Z'
  }
]

// ============================================
// PLACEHOLDER POKLONI
// ============================================
export const placeholderGifts: Gift[] = [
  // Pokloni za mem-001 (Milica Petrović) - svi tipovi
  {
    id: 'gift-001',
    memorial_id: 'mem-001',
    product_id: 'candle',
    sender_name: 'Porodica Simić',
    sender_message: 'U znak sećanja na divnu osobu.',
    is_anonymous: false,
    payment_status: 'completed',
    stripe_payment_id: null,
    created_at: '2025-01-11T08:00:00Z',
    updated_at: '2025-01-11T08:00:00Z'
  },
  {
    id: 'gift-002',
    memorial_id: 'mem-001',
    product_id: 'flowers',
    sender_name: 'Kolege sa fakulteta',
    sender_message: 'Profesorko, zauvek ćemo vas pamtiti.',
    is_anonymous: false,
    payment_status: 'completed',
    stripe_payment_id: null,
    created_at: '2025-01-11T09:30:00Z',
    updated_at: '2025-01-11T09:30:00Z'
  },
  {
    id: 'gift-003',
    memorial_id: 'mem-001',
    product_id: 'wreath',
    sender_name: 'Anonimno',
    sender_message: null,
    is_anonymous: true,
    payment_status: 'completed',
    stripe_payment_id: null,
    created_at: '2025-01-12T10:00:00Z',
    updated_at: '2025-01-12T10:00:00Z'
  },
  {
    id: 'gift-004',
    memorial_id: 'mem-001',
    product_id: 'cross',
    sender_name: 'Ðaci generacije 1990',
    sender_message: 'Draga nastavnice, počivajte u miru.',
    is_anonymous: false,
    payment_status: 'completed',
    stripe_payment_id: null,
    created_at: '2025-01-12T14:00:00Z',
    updated_at: '2025-01-12T14:00:00Z'
  },
  // Pokloni za mem-002 (Dragan Nikolić) - svi tipovi
  {
    id: 'gift-005',
    memorial_id: 'mem-002',
    product_id: 'candle',
    sender_name: 'Anonimno',
    sender_message: 'Neka ti je laka zemlja.',
    is_anonymous: true,
    payment_status: 'completed',
    stripe_payment_id: null,
    created_at: '2025-01-06T11:00:00Z',
    updated_at: '2025-01-06T11:00:00Z'
  },
  {
    id: 'gift-006',
    memorial_id: 'mem-002',
    product_id: 'flowers',
    sender_name: 'Planinarski klub Niš',
    sender_message: 'Zbogom, druže. Pamtićemo te na svakom vrhu.',
    is_anonymous: false,
    payment_status: 'completed',
    stripe_payment_id: null,
    created_at: '2025-01-06T15:30:00Z',
    updated_at: '2025-01-06T15:30:00Z'
  },
  {
    id: 'gift-007',
    memorial_id: 'mem-002',
    product_id: 'wreath',
    sender_name: 'Bivše kolege iz fabrike',
    sender_message: 'Dragi kolega, hvala za sve godine prijateljstva.',
    is_anonymous: false,
    payment_status: 'completed',
    stripe_payment_id: null,
    created_at: '2025-01-07T09:00:00Z',
    updated_at: '2025-01-07T09:00:00Z'
  },
  {
    id: 'gift-008',
    memorial_id: 'mem-002',
    product_id: 'cross',
    sender_name: 'Porodica Jović',
    sender_message: 'S poštovanjem.',
    is_anonymous: false,
    payment_status: 'completed',
    stripe_payment_id: null,
    created_at: '2025-01-07T12:00:00Z',
    updated_at: '2025-01-07T12:00:00Z'
  }
]

// ============================================
// POGREBNA PREDUZEĆA (5)
// ============================================
export const placeholderFuneralHomes: FuneralHome[] = [
  {
    id: 'fh-001',
    name: 'Pogrebno preduzeće Večni Mir',
    slug: 'vecni-mir-beograd',
    description: 'Pogrebno preduzeće sa tradicijom dužom od 30 godina. Pružamo kompletne pogrebne usluge sa dostojanstvom i poštovanjem prema porodicama u najtežim trenucima. Naš tim je dostupan 24 sata dnevno, 7 dana u nedelji.',
    logo_url: null,
    cover_image_url: null,
    phone: '+381 11 123 4567',
    email: 'info@vecni-mir.rs',
    website: 'https://www.vecni-mir.rs',
    address: 'Ruzveltova 42',
    city: 'Beograd',
    latitude: 44.8176,
    longitude: 20.4633,
    services: [
      'Organizacija sahrane',
      'Prevoz pokojnika',
      'Kremacija',
      'Izrada osmrtnica',
      'Cveće i venci',
      'Organizacija komemoracije'
    ],
    working_hours: {
      monday: '00:00 - 24:00',
      tuesday: '00:00 - 24:00',
      wednesday: '00:00 - 24:00',
      thursday: '00:00 - 24:00',
      friday: '00:00 - 24:00',
      saturday: '00:00 - 24:00',
      sunday: '00:00 - 24:00'
    },
    is_featured: true,
    listing_tier: 'premium',
    listing_expires_at: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'fh-002',
    name: 'Pogrebne usluge Spokoj',
    slug: 'spokoj-novi-sad',
    description: 'Porodična firma koja već 25 godina pruža pogrebne usluge u Novom Sadu i okolini. Razumemo vašu bol i trudimo se da olakšamo ovaj težak period.',
    logo_url: null,
    cover_image_url: null,
    phone: '+381 21 456 7890',
    email: 'kontakt@spokoj.rs',
    website: null,
    address: 'Bulevar Oslobođenja 78',
    city: 'Novi Sad',
    latitude: 45.2671,
    longitude: 19.8335,
    services: [
      'Kompletna organizacija sahrane',
      'Prevoz u zemlji i inostranstvu',
      'Kremacija',
      'Ekshumacija',
      'Izrada osmrtnica i čitulja'
    ],
    working_hours: {
      monday: '00:00 - 24:00',
      tuesday: '00:00 - 24:00',
      wednesday: '00:00 - 24:00',
      thursday: '00:00 - 24:00',
      friday: '00:00 - 24:00',
      saturday: '00:00 - 24:00',
      sunday: '00:00 - 24:00'
    },
    is_featured: true,
    listing_tier: 'standard',
    listing_expires_at: null,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'fh-003',
    name: 'Pogrebno Niš',
    slug: 'pogrebno-nis',
    description: 'Pouzdani partner u organizaciji sahrana u Nišu. Profesionalna usluga po pristupačnim cenama.',
    logo_url: null,
    cover_image_url: null,
    phone: '+381 18 234 5678',
    email: 'info@pogrebno-nis.rs',
    website: 'https://www.pogrebno-nis.rs',
    address: 'Obrenovićeva 15',
    city: 'Niš',
    latitude: 43.3209,
    longitude: 21.8958,
    services: [
      'Organizacija sahrane',
      'Prevoz pokojnika',
      'Cveće i venci',
      'Štampanje osmrtnica'
    ],
    working_hours: {
      monday: '07:00 - 20:00',
      tuesday: '07:00 - 20:00',
      wednesday: '07:00 - 20:00',
      thursday: '07:00 - 20:00',
      friday: '07:00 - 20:00',
      saturday: '08:00 - 16:00',
      sunday: '08:00 - 14:00'
    },
    is_featured: false,
    listing_tier: 'basic',
    listing_expires_at: null,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z'
  },
  {
    id: 'fh-004',
    name: 'Pogrebno preduzeće Harmonija',
    slug: 'harmonija-kragujevac',
    description: 'Pogrebno preduzeće Harmonija iz Kragujevca pruža usluge organizacije sahrana sa posebnom pažnjom prema željama porodice.',
    logo_url: null,
    cover_image_url: null,
    phone: '+381 34 345 6789',
    email: 'harmonija@gmail.com',
    website: null,
    address: 'Kneza Mihaila 88',
    city: 'Kragujevac',
    latitude: 44.0128,
    longitude: 20.9114,
    services: [
      'Organizacija sahrane',
      'Prevoz pokojnika',
      'Izrada osmrtnica',
      'Cveće i venci'
    ],
    working_hours: {
      monday: '08:00 - 18:00',
      tuesday: '08:00 - 18:00',
      wednesday: '08:00 - 18:00',
      thursday: '08:00 - 18:00',
      friday: '08:00 - 18:00',
      saturday: '09:00 - 14:00',
      sunday: 'Zatvoreno'
    },
    is_featured: false,
    listing_tier: 'basic',
    listing_expires_at: null,
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z'
  },
  {
    id: 'fh-005',
    name: 'Pogrebne usluge Tišina',
    slug: 'tisina-subotica',
    description: 'Pogrebne usluge Tišina - vaš pouzdan partner u Subotici i severnoj Bačkoj. Organizujemo sahrane svih veroispovesti.',
    logo_url: null,
    cover_image_url: null,
    phone: '+381 24 567 8901',
    email: 'tisina.subotica@gmail.com',
    website: null,
    address: 'Korzo 45',
    city: 'Subotica',
    latitude: 46.1000,
    longitude: 19.6658,
    services: [
      'Organizacija sahrane',
      'Prevoz pokojnika',
      'Kremacija',
      'Međunarodni prevoz'
    ],
    working_hours: {
      monday: '00:00 - 24:00',
      tuesday: '00:00 - 24:00',
      wednesday: '00:00 - 24:00',
      thursday: '00:00 - 24:00',
      friday: '00:00 - 24:00',
      saturday: '00:00 - 24:00',
      sunday: '00:00 - 24:00'
    },
    is_featured: false,
    listing_tier: 'standard',
    listing_expires_at: null,
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z'
  }
]

// ============================================
// KAMENOREZAČKE RADNJE (5)
// ============================================
export const placeholderStoneMasons: StoneMason[] = [
  {
    id: 'sm-001',
    business_name: 'Kamenorezac Petrović',
    slug: 'petrovic-beograd',
    description: 'Porodična tradicija izrade nadgrobnih spomenika od 1965. godine. Radimo u svim vrstama kamena - granit, mermer, travertin. Mogućnost izrade po vašem nacrtu.',
    phone: '+381 11 234 5678',
    email: 'kamenorezac.petrovic@gmail.com',
    website: 'https://www.kamenorezac-petrovic.rs',
    city: 'Beograd',
    address: 'Bulevar Vojvode Mišića 12',
    banner_image_url: null,
    ad_tier: 'premium',
    ad_expires_at: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'sm-002',
    business_name: 'Granitni Spomenici Jovanović',
    slug: 'jovanovic-novi-sad',
    description: 'Specijalizovani za izradu granitnih spomenika. Nudimo širok izbor modela i mogućnost prilagođavanja. Besplatna dostava na području Vojvodine.',
    phone: '+381 21 345 6789',
    email: 'granit.jovanovic@gmail.com',
    website: null,
    city: 'Novi Sad',
    address: 'Futoška 234',
    banner_image_url: null,
    ad_tier: 'standard',
    ad_expires_at: null,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'sm-003',
    business_name: 'Kamenolom i Klesarstvo Nikolić',
    slug: 'nikolic-nis',
    description: 'Sopstveni kamenolom garantuje najbolje cene i kvalitet. Izrada spomenika, ograda, vaza i svih pratećih elemenata.',
    phone: '+381 18 456 7890',
    email: 'nikolic.kamen@gmail.com',
    website: null,
    city: 'Niš',
    address: 'Vizantijski bulevar 56',
    banner_image_url: null,
    ad_tier: 'basic',
    ad_expires_at: null,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z'
  },
  {
    id: 'sm-004',
    business_name: 'Art Kamen Studio',
    slug: 'art-kamen-kragujevac',
    description: 'Moderni i klasični dizajni nadgrobnih spomenika. CNC obrada za precizne natpise i ornamente. Restauracija starih spomenika.',
    phone: '+381 34 567 8901',
    email: 'artkamen.kg@gmail.com',
    website: 'https://www.art-kamen.rs',
    city: 'Kragujevac',
    address: 'Industrijska zona bb',
    banner_image_url: null,
    ad_tier: 'standard',
    ad_expires_at: null,
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z'
  },
  {
    id: 'sm-005',
    business_name: 'Majstor Kamen',
    slug: 'majstor-kamen-zrenjanin',
    description: 'Kvalitetna izrada spomenika po pristupačnim cenama. Radimo na celoj teritoriji Banata. Besplatna procena i savet.',
    phone: '+381 23 678 9012',
    email: 'majstor.kamen@gmail.com',
    website: null,
    city: 'Zrenjanin',
    address: 'Cara Dušana 78',
    banner_image_url: null,
    ad_tier: 'basic',
    ad_expires_at: null,
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z'
  }
]

// ============================================
// GROBLJA (5) - Fokus na Srbiju
// ============================================
export const placeholderCemeteries: Cemetery[] = [
  {
    id: 'cem-001',
    name: 'Novo groblje',
    slug: 'novo-groblje-beograd',
    description: 'Najveće i najpoznatije groblje u Beogradu, osnovano 1886. godine. Ovde počivaju mnoge istaknute ličnosti srpske istorije, nauke i kulture.',
    cover_image_url: null,
    address: 'Ruzveltova 50',
    city: 'Beograd',
    latitude: 44.8076,
    longitude: 20.4697,
    phone: '+381 11 2411 766',
    email: 'info@jkpbeograd.rs',
    working_hours: {
      monday: '07:00 - 19:00',
      tuesday: '07:00 - 19:00',
      wednesday: '07:00 - 19:00',
      thursday: '07:00 - 19:00',
      friday: '07:00 - 19:00',
      saturday: '07:00 - 19:00',
      sunday: '07:00 - 19:00'
    },
    plot_prices: {
      single: 150000,
      double: 280000,
      family: 450000,
      cremation: 80000
    },
    facilities: [
      'Kapela',
      'Krematorijum',
      'Parking',
      'Prodavnica cveća',
      'Toalet',
      'Pristup za invalide'
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cem-002',
    name: 'Gradsko groblje Novi Sad',
    slug: 'gradsko-groblje-novi-sad',
    description: 'Centralno gradsko groblje Novog Sada sa dugom tradicijom. Sadrži kapelu, krematorijum i parkove za odmor posetilaca.',
    cover_image_url: null,
    address: 'Rumenački put 102',
    city: 'Novi Sad',
    latitude: 45.2566,
    longitude: 19.8003,
    phone: '+381 21 518 362',
    email: 'groblje@jkpns.rs',
    working_hours: {
      monday: '07:00 - 18:00',
      tuesday: '07:00 - 18:00',
      wednesday: '07:00 - 18:00',
      thursday: '07:00 - 18:00',
      friday: '07:00 - 18:00',
      saturday: '07:00 - 16:00',
      sunday: '08:00 - 16:00'
    },
    plot_prices: {
      single: 120000,
      double: 220000,
      family: 380000,
      cremation: 65000
    },
    facilities: [
      'Kapela',
      'Krematorijum',
      'Parking',
      'Prodavnica cveća'
    ],
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'cem-003',
    name: 'Gradsko groblje Niš',
    slug: 'gradsko-groblje-nis',
    description: 'Glavno gradsko groblje u Nišu. Nalazi se na mirnoj lokaciji sa lepim parkovima i stazama za šetnju.',
    cover_image_url: null,
    address: 'Bulevar dr Zorana Đinđića bb',
    city: 'Niš',
    latitude: 43.3167,
    longitude: 21.9000,
    phone: '+381 18 225 577',
    email: 'groblje.nis@gmail.com',
    working_hours: {
      monday: '07:00 - 17:00',
      tuesday: '07:00 - 17:00',
      wednesday: '07:00 - 17:00',
      thursday: '07:00 - 17:00',
      friday: '07:00 - 17:00',
      saturday: '08:00 - 15:00',
      sunday: '08:00 - 15:00'
    },
    plot_prices: {
      single: 80000,
      double: 150000,
      family: 250000
    },
    facilities: [
      'Kapela',
      'Parking',
      'Prodavnica cveća',
      'Toalet'
    ],
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z'
  },
  {
    id: 'cem-004',
    name: 'Groblje Zbeg',
    slug: 'groblje-zbeg-kragujevac',
    description: 'Mirno groblje na periferiji Kragujevca. Dobra povezanost sa centrom grada i dovoljno parking mesta.',
    cover_image_url: null,
    address: 'Zbeg bb',
    city: 'Kragujevac',
    latitude: 44.0200,
    longitude: 20.9300,
    phone: '+381 34 335 566',
    email: null,
    working_hours: {
      monday: '07:00 - 17:00',
      tuesday: '07:00 - 17:00',
      wednesday: '07:00 - 17:00',
      thursday: '07:00 - 17:00',
      friday: '07:00 - 17:00',
      saturday: '08:00 - 14:00',
      sunday: '08:00 - 14:00'
    },
    plot_prices: {
      single: 70000,
      double: 130000,
      family: 200000
    },
    facilities: [
      'Kapela',
      'Parking',
      'Toalet'
    ],
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z'
  },
  {
    id: 'cem-005',
    name: 'Bajsko groblje',
    slug: 'bajsko-groblje-subotica',
    description: 'Istorijsko groblje u Subotici sa bogatom kulturnom baštinom. Sadrži grobnice iz 19. veka i spomenike kulturnog nasleđa.',
    cover_image_url: null,
    address: 'Bajski put 15',
    city: 'Subotica',
    latitude: 46.1020,
    longitude: 19.6700,
    phone: '+381 24 555 123',
    email: 'groblje.subotica@gmail.com',
    working_hours: {
      monday: '07:00 - 18:00',
      tuesday: '07:00 - 18:00',
      wednesday: '07:00 - 18:00',
      thursday: '07:00 - 18:00',
      friday: '07:00 - 18:00',
      saturday: '07:00 - 16:00',
      sunday: '08:00 - 16:00'
    },
    plot_prices: {
      single: 90000,
      double: 170000,
      family: 280000
    },
    facilities: [
      'Kapela',
      'Parking',
      'Prodavnica cveća',
      'Toalet',
      'Čuvar'
    ],
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z'
  }
]

// ============================================
// PLACEHOLDER MEMORIJALI (5)
// ============================================
export const placeholderMemorials = [
  {
    id: 'mem-001',
    first_name: 'Milica',
    last_name: 'Petrović',
    birth_date: '1945-03-15',
    death_date: '2024-01-10',
    birth_place: 'Beograd',
    death_place: 'Beograd',
    biography: 'Milica Petrović bila je voljena majka, baka i prijateljica mnogima. Ceo život je posvetila porodici i obrazovanju. Kao profesorka srpskog jezika, inspirisala je generacije učenika da vole književnost i pisanu reč. Njena ljubaznost, mudrost i toplina ostaće u srcima svih koji su je poznavali.',
    profile_image_url: null,
    cover_image_url: null,
    is_public: true
  },
  {
    id: 'mem-002',
    first_name: 'Dragan',
    last_name: 'Nikolić',
    birth_date: '1952-08-22',
    death_date: '2023-11-05',
    birth_place: 'Niš',
    death_place: 'Niš',
    biography: 'Dragan Nikolić bio je posvećen suprug i otac. Radio je kao inženjer u fabrici elektronike više od 30 godina. Voleo je prirodu, planinarenje i pecanje. Uvek je bio spreman da pomogne komšijama i prijateljima. Pamtićemo ga po dobrom srcu i vedrom duhu.',
    profile_image_url: null,
    cover_image_url: null,
    is_public: true
  },
  {
    id: 'mem-003',
    first_name: 'Ana',
    last_name: 'Jovanović',
    birth_date: '1968-12-03',
    death_date: '2024-02-20',
    birth_place: 'Novi Sad',
    death_place: 'Novi Sad',
    biography: 'Ana Jovanović bila je izuzetna žena koja je ostavila dubok trag u životima svih koji su je poznavali. Kao lekarka, posvetila je karijeru pomaganju drugima. Bila je strastvena u svemu što je radila - od medicine do slikarstva i vrtlarstva.',
    profile_image_url: null,
    cover_image_url: null,
    is_public: true
  },
  {
    id: 'mem-004',
    first_name: 'Stojan',
    last_name: 'Marković',
    birth_date: '1938-05-10',
    death_date: '2023-09-15',
    birth_place: 'Kragujevac',
    death_place: 'Kragujevac',
    biography: 'Stojan Marković, poznati majstor stolarske veštine iz Kragujevca, ostavio je za sobom ne samo prekrasne komade nameštaja, već i bogato nasleđe vrednosti, poštenja i posvećenosti poslu. Učio je mlađe generacije tajnama zanata i uvek govorio da u svaki rad treba uložiti dušu.',
    profile_image_url: null,
    cover_image_url: null,
    is_public: true
  },
  {
    id: 'mem-005',
    first_name: 'Jelena',
    last_name: 'Đorđević',
    birth_date: '1975-07-28',
    death_date: '2024-03-01',
    birth_place: 'Subotica',
    death_place: 'Beograd',
    biography: 'Jelena Đorđević bila je talentovana muzičarka i pedagog. Predavala je klavir na muzičkoj školi i vodila dečji hor. Njena strast prema muzici i deci bila je zarazna. Organizovala je brojne humanitarne koncerte i uvek je verovala u moć muzike da spaja ljude.',
    profile_image_url: null,
    cover_image_url: null,
    is_public: true
  }
]

// ============================================
// PLACEHOLDER UMRLICE (5)
// ============================================
export const placeholderObituaries: Obituary[] = [
  {
    id: 'obit-001',
    created_at: '2025-01-10T08:00:00Z',
    updated_at: '2025-01-10T08:00:00Z',
    user_id: 'placeholder-user',
    memorial_id: 'mem-001',
    first_name: 'Milica',
    last_name: 'Petrović',
    date_of_birth: '1945-03-15',
    date_of_death: '2025-01-10',
    place_of_death: 'Beograd',
    content: 'Sa dubokim bolom objavljujemo da je naša voljena majka, baka i prijateljica Milica Petrović preminula 10. januara 2025. godine u Beogradu, u 79. godini života. Ceo život je posvetila porodici i obrazovanju kao profesorka srpskog jezika. Ostala je u srcima svoje dece Marka i Jelene, unučadi Nikole, Ane i Stefana, kao i brojnih prijatelja i bivših učenika.',
    photo_url: null,
    funeral_date: '2025-01-13',
    funeral_time: '13:00',
    funeral_location: 'Novo groblje',
    funeral_address: 'Ruzveltova 50, Beograd',
    funeral_notes: 'Umesto cveća, porodica moli da se donacije upute Dečijoj klinici u Tiršovoj.',
    donations_enabled: true,
    donation_goal_cents: 100000,
    donation_raised_cents: 45000,
    donation_charity_name: 'Univerzitetska dečja klinika Tiršova',
    donation_charity_description: 'Donacije će biti upućene za nabavku medicinske opreme',
    status: 'published',
    published_at: '2025-01-10T09:00:00Z',
    condolences_enabled: true,
    notification_email: 'porodica.petrovic@email.com'
  },
  {
    id: 'obit-002',
    created_at: '2025-01-08T10:00:00Z',
    updated_at: '2025-01-08T10:00:00Z',
    user_id: 'placeholder-user',
    memorial_id: 'mem-002',
    first_name: 'Dragan',
    last_name: 'Nikolić',
    date_of_birth: '1952-08-22',
    date_of_death: '2025-01-05',
    place_of_death: 'Niš',
    content: 'Obaveštavamo rodbinu, prijatelje i poznanike da je Dragan Nikolić preminuo 5. januara 2025. godine u Nišu nakon kratke bolesti. Bio je posvećen suprug, otac i deda koji je ceo život posvetio porodici i poslu. Sahrana će se obaviti u krugu porodice.',
    photo_url: null,
    funeral_date: '2025-01-08',
    funeral_time: '11:00',
    funeral_location: 'Gradsko groblje Niš',
    funeral_address: 'Bulevar dr Zorana Đinđića bb, Niš',
    funeral_notes: 'Sahrana je u krugu porodice.',
    donations_enabled: false,
    donation_goal_cents: null,
    donation_raised_cents: 0,
    donation_charity_name: null,
    donation_charity_description: null,
    status: 'published',
    published_at: '2025-01-08T10:30:00Z',
    condolences_enabled: true,
    notification_email: 'dragan.nikolic.fam@email.com'
  },
  {
    id: 'obit-003',
    created_at: '2025-01-12T14:00:00Z',
    updated_at: '2025-01-12T14:00:00Z',
    user_id: 'placeholder-user',
    memorial_id: null,
    first_name: 'Marija',
    last_name: 'Stanković',
    date_of_birth: '1960-06-20',
    date_of_death: '2025-01-11',
    place_of_death: 'Novi Sad',
    content: 'Sa tugom u srcu javljamo da nas je napustila naša draga Marija Stanković. Bila je divna majka, supruga i baka. Njena dobrota i osmeh ostaće zauvek u našim srcima. Pozivamo sve koji su je voleli da prisustvuju sahrani.',
    photo_url: null,
    funeral_date: '2025-01-14',
    funeral_time: '14:00',
    funeral_location: 'Gradsko groblje Novi Sad',
    funeral_address: 'Rumenački put 102, Novi Sad',
    funeral_notes: null,
    donations_enabled: false,
    donation_goal_cents: null,
    donation_raised_cents: 0,
    donation_charity_name: null,
    donation_charity_description: null,
    status: 'published',
    published_at: '2025-01-12T14:30:00Z',
    condolences_enabled: true,
    notification_email: 'stankovic.marija@email.com'
  },
  {
    id: 'obit-004',
    created_at: '2025-01-13T09:00:00Z',
    updated_at: '2025-01-13T09:00:00Z',
    user_id: 'placeholder-user',
    memorial_id: null,
    first_name: 'Petar',
    last_name: 'Ilić',
    date_of_birth: '1948-11-30',
    date_of_death: '2025-01-12',
    place_of_death: 'Kragujevac',
    content: 'Porodica Ilić sa bolom objavljuje smrt voljenog supruga, oca i dede Petra Ilića. Ceo život radio je kao majstor u fabrici Zastava i bio uvaženi član zajednice. Komemoracija će se održati u prostorijama groblja pre sahrane.',
    photo_url: null,
    funeral_date: '2025-01-15',
    funeral_time: '12:00',
    funeral_location: 'Groblje Zbeg',
    funeral_address: 'Zbeg bb, Kragujevac',
    funeral_notes: 'Komemoracija u 11:30 u kapeli groblja.',
    donations_enabled: true,
    donation_goal_cents: 50000,
    donation_raised_cents: 12000,
    donation_charity_name: 'Crveni krst Kragujevac',
    donation_charity_description: 'Za pomoć socijalno ugroženim porodicama',
    status: 'published',
    published_at: '2025-01-13T09:30:00Z',
    condolences_enabled: true,
    notification_email: 'ilic.porodica@email.com'
  },
  {
    id: 'obit-005',
    created_at: '2025-01-14T16:00:00Z',
    updated_at: '2025-01-14T16:00:00Z',
    user_id: 'placeholder-user',
    memorial_id: null,
    first_name: 'Zorica',
    last_name: 'Pavlović',
    date_of_birth: '1955-04-05',
    date_of_death: '2025-01-13',
    place_of_death: 'Subotica',
    content: 'Naša voljena Zorica Pavlović, profesorka matematike, zauvek nas je napustila 13. januara 2025. Generacije učenika pamtiće njenu posvećenost, strpljenje i ljubav prema nauci. Počivaj u miru, draga nastavnice.',
    photo_url: null,
    funeral_date: '2025-01-16',
    funeral_time: '10:00',
    funeral_location: 'Bajsko groblje',
    funeral_address: 'Bajski put 15, Subotica',
    funeral_notes: null,
    donations_enabled: false,
    donation_goal_cents: null,
    donation_raised_cents: 0,
    donation_charity_name: null,
    donation_charity_description: null,
    status: 'published',
    published_at: '2025-01-14T16:30:00Z',
    condolences_enabled: true,
    notification_email: 'pavlovic.zorica@email.com'
  }
]

// ============================================
// QR PARTNERI (Foto-radnje, štamparije) (5)
// ============================================
export const placeholderQRPartners: QRPartner[] = [
  {
    id: 'qr-001',
    business_name: 'Foto Studio Memorija',
    slug: 'foto-memorija-beograd',
    description: 'Specijalizovana foto-radnja za izradu QR pločica za spomenike. Štampamo na keramiku, metal i akril. Brza izrada i dostava širom Srbije. Nudimo i uslugu dizajna pločice sa okvirom.',
    logo_url: null,
    cover_image_url: null,
    phone: '+381 11 987 6543',
    email: 'foto.memorija@gmail.com',
    website: 'https://foto-memorija.rs',
    address: 'Makedonska 22',
    city: 'Beograd',
    latitude: 44.8184,
    longitude: 20.4586,
    qr_materials: ['sticker', 'ceramic', 'metal', 'acrylic'],
    services: [
      'QR pločice za spomenike',
      'Keramičke foto-pločice',
      'Metalne gravure',
      'Stickeri otporni na vremenske uslove',
      'Dizajn i obrada'
    ],
    working_hours: {
      monday: '09:00 - 19:00',
      tuesday: '09:00 - 19:00',
      wednesday: '09:00 - 19:00',
      thursday: '09:00 - 19:00',
      friday: '09:00 - 19:00',
      saturday: '10:00 - 15:00',
      sunday: 'Zatvoreno'
    },
    is_featured: true,
    listing_tier: 'premium',
    listing_expires_at: null,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z'
  },
  {
    id: 'qr-002',
    business_name: 'PrintShop Vojvodina',
    slug: 'printshop-vojvodina-novi-sad',
    description: 'UV štampa na raznim materijalima. Specijalizovani za QR kodove na stickere i keramičke pločice. Garancija trajnosti do 10 godina na otvorenom.',
    logo_url: null,
    cover_image_url: null,
    phone: '+381 21 555 666',
    email: 'printshop.ns@gmail.com',
    website: null,
    address: 'Bulevar Oslobođenja 100',
    city: 'Novi Sad',
    latitude: 45.2551,
    longitude: 19.8422,
    qr_materials: ['sticker', 'ceramic'],
    services: [
      'QR pločice',
      'UV štampa',
      'Vodootporni stickeri',
      'Keramičke pločice'
    ],
    working_hours: {
      monday: '08:00 - 18:00',
      tuesday: '08:00 - 18:00',
      wednesday: '08:00 - 18:00',
      thursday: '08:00 - 18:00',
      friday: '08:00 - 18:00',
      saturday: '09:00 - 14:00',
      sunday: 'Zatvoreno'
    },
    is_featured: true,
    listing_tier: 'standard',
    listing_expires_at: null,
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z'
  },
  {
    id: 'qr-003',
    business_name: 'Digital Print Niš',
    slug: 'digital-print-nis',
    description: 'Digitalna štamparija sa UV printerom. Radimo QR kodove na metal i keramiku. Povoljne cene i brza izrada.',
    logo_url: null,
    cover_image_url: null,
    phone: '+381 18 333 444',
    email: 'digitalprint.nis@gmail.com',
    website: null,
    address: 'Obrenovićeva 50',
    city: 'Niš',
    latitude: 43.3209,
    longitude: 21.8958,
    qr_materials: ['ceramic', 'metal'],
    services: [
      'QR pločice',
      'Metalne table',
      'Keramička štampa',
      'Gravura'
    ],
    working_hours: {
      monday: '08:00 - 17:00',
      tuesday: '08:00 - 17:00',
      wednesday: '08:00 - 17:00',
      thursday: '08:00 - 17:00',
      friday: '08:00 - 17:00',
      saturday: '09:00 - 13:00',
      sunday: 'Zatvoreno'
    },
    is_featured: false,
    listing_tier: 'basic',
    listing_expires_at: null,
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z'
  },
  {
    id: 'qr-004',
    business_name: 'Foto Centar Plus',
    slug: 'foto-centar-plus-kragujevac',
    description: 'Foto-radnja sa dugogodišnjom tradicijom. Pored klasičnih foto usluga, nudimo i izradu QR pločica za spomenike na keramici i metalu.',
    logo_url: null,
    cover_image_url: null,
    phone: '+381 34 222 333',
    email: 'fotocentar.kg@gmail.com',
    website: null,
    address: 'Kralja Petra I 25',
    city: 'Kragujevac',
    latitude: 44.0128,
    longitude: 20.9114,
    qr_materials: ['ceramic', 'metal', 'acrylic'],
    services: [
      'QR pločice',
      'Foto štampa',
      'Keramičke slike',
      'Akrilne table'
    ],
    working_hours: {
      monday: '09:00 - 18:00',
      tuesday: '09:00 - 18:00',
      wednesday: '09:00 - 18:00',
      thursday: '09:00 - 18:00',
      friday: '09:00 - 18:00',
      saturday: '09:00 - 14:00',
      sunday: 'Zatvoreno'
    },
    is_featured: false,
    listing_tier: 'basic',
    listing_expires_at: null,
    created_at: '2024-03-15T00:00:00Z',
    updated_at: '2024-03-15T00:00:00Z'
  },
  {
    id: 'qr-005',
    business_name: 'Gravir Studio',
    slug: 'gravir-studio-subotica',
    description: 'Studio za graviranje i lasersko obeležavanje. Premium kvalitet QR kodova na metalnim i keramičkim pločicama. Dostava širom Vojvodine.',
    logo_url: null,
    cover_image_url: null,
    phone: '+381 24 444 555',
    email: 'gravir.studio@gmail.com',
    website: 'https://gravir-studio.rs',
    address: 'Trg slobode 10',
    city: 'Subotica',
    latitude: 46.1003,
    longitude: 19.6658,
    qr_materials: ['metal', 'ceramic'],
    services: [
      'QR pločice',
      'Laserska gravura',
      'Metalne table',
      'Keramička foto-štampa'
    ],
    working_hours: {
      monday: '09:00 - 17:00',
      tuesday: '09:00 - 17:00',
      wednesday: '09:00 - 17:00',
      thursday: '09:00 - 17:00',
      friday: '09:00 - 17:00',
      saturday: '10:00 - 13:00',
      sunday: 'Zatvoreno'
    },
    is_featured: false,
    listing_tier: 'standard',
    listing_expires_at: null,
    created_at: '2024-04-01T00:00:00Z',
    updated_at: '2024-04-01T00:00:00Z'
  }
]
