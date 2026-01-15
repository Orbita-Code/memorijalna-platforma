# CLAUDE.md - Memorijalna Platforma

> Ovaj dokument sadrži sve informacije potrebne AI asistentima za rad na projektu.
> **OBAVEZNO PROČITATI PRE BILO KAKVIH IZMENA!**

---

## 1. PREGLED PROJEKTA

### 1.1 Šta je ovo?
**Memorijalna Platforma** je digitalna platforma za kreiranje i održavanje memorijala preminulih osoba. Platforma omogućava porodicama da:
- Kreiraju trajne digitalne memorijale
- Objavljuju umrlice sa detaljima sahrane
- Prikupljaju donacije za dobrotvorne svrhe
- Primaju virtuelne poklone (sveće, cveće, vence)
- Pripreme "living profile" - memorijal dok su još živi

### 1.2 Status projekta
- **Faza:** MVP završen (Phase 12 Complete)
- **Verzija:** 0.0.0 (pre-release)
- **Production URL:** https://memorials.orbitacode.com
- **GitHub:** https://github.com/Orbita-Code/memorijalna-platforma
- **Ime:** Radni naziv "Memorijalna Platforma" - finalno ime nije određeno

### 1.3 Vlasnik projekta
- **Agencija:** OrbitaCode
- **Kontakt:** Jovana Jović

---

## 2. TEHNIČKI STACK

### 2.1 Frontend
| Tehnologija | Verzija | Svrha |
|-------------|---------|-------|
| React | 19.2.0 | UI framework |
| TypeScript | ~5.9.3 | Type safety |
| Vite | 7.3.1 | Build tool & dev server |
| React Router DOM | 7.12.0 | Routing |
| Tailwind CSS | 4.1.18 | Styling |

### 2.2 Backend & Baza
| Servis | Detalji |
|--------|---------|
| Supabase | BaaS - Auth, Database, Storage |
| PostgreSQL | Baza podataka (preko Supabase) |

### 2.3 Eksterni servisi
| Servis | Svrha | Status |
|--------|-------|--------|
| Stripe | Plaćanja za poklone | Konfigurisan (MVP simulira plaćanja) |
| Supabase Storage | Upload medija | Bucket "memorial-media" kreiran |

---

## 3. INFRASTRUKTURA

### 3.1 Supabase konfiguracija
```
URL: https://haxmhcrsmqvwseseddri.supabase.co
Projekat: "Memorijalna Platforma"
Region: (proveriti u Supabase dashboard-u)
```

### 3.2 Database tabele
Sve tabele su kreirane u Supabase:
- `memorials` - glavni memorijali
- `media` - slike, video, dokumenti
- `comments` - komentari posetilaca
- `gifts` - virtuelni pokloni
- `gift_products` - katalog poklona
- `obituaries` - umrlice
- `living_profiles` - profili živih osoba
- `family_members` - članovi porodice (za living profiles)

### 3.3 Storage
- **Bucket:** `memorial-media`
- **Dozvoljeni tipovi:**
  - Slike: JPEG, PNG, WebP, GIF (max 10MB)
  - Video: MP4, WebM, QuickTime (max 100MB)
  - Dokumenti: PDF (max 20MB)

### 3.4 Hosting (Production)
| Komponenta | Servis | Detalji |
|------------|--------|---------|
| Server | Hetzner | Aktivan |
| Git repo | GitHub | github.com/Orbita-Code/memorijalna-platforma |
| Deployment | Coolify | panel.orbitacode.com |
| Production URL | - | https://memorials.orbitacode.com |

**Automatski deploy:** Coolify ima konfigurisan webhook - svaki push na `main` branch automatski pokreće novi deploy.

---

## 4. STRUKTURA PROJEKTA

```
memorijalna-platforma/
├── src/
│   ├── assets/           # Statički resursi
│   ├── components/       # React komponente (24 komponente)
│   │   ├── Layout.tsx           # Glavni layout sa navigacijom
│   │   ├── ProtectedRoute.tsx   # Auth guard
│   │   ├── LanguageSwitcher.tsx # Promena jezika
│   │   ├── MemorialCard.tsx     # Kartica memorijala
│   │   ├── ObituaryCard.tsx     # Kartica umrlice
│   │   ├── PhotoGallery.tsx     # Galerija slika
│   │   ├── VideoPlayer.tsx      # Video player
│   │   ├── DocumentList.tsx     # Lista dokumenata
│   │   ├── MediaUpload.tsx      # Upload medija
│   │   ├── BiographyEditor.tsx  # Editor biografije
│   │   ├── BiographyDisplay.tsx # Prikaz biografije
│   │   ├── CommentForm.tsx      # Forma za komentare
│   │   ├── CommentList.tsx      # Lista komentara
│   │   ├── ModerationQueue.tsx  # Moderacija komentara
│   │   ├── GiftCatalog.tsx      # Katalog poklona
│   │   ├── GiftModal.tsx        # Modal za kupovinu
│   │   ├── GiftDisplay.tsx      # Prikaz poklona
│   │   ├── ProfileImageUpload.tsx
│   │   ├── CoverImageUpload.tsx
│   │   ├── ImageCropper.tsx
│   │   ├── FamilyMemberList.tsx
│   │   └── DuplicateWarning.tsx # Upozorenje na duplikate
│   │
│   ├── contexts/         # React konteksti
│   │   ├── AuthContext.tsx      # Autentifikacija
│   │   └── LanguageContext.tsx  # Internacionalizacija
│   │
│   ├── hooks/            # Custom React hooks
│   │
│   ├── i18n/             # Internacionalizacija
│   │   ├── index.ts             # Glavni modul
│   │   └── locales/
│   │       ├── sr.ts            # Srpski (default)
│   │       └── en.ts            # Engleski
│   │
│   ├── lib/              # Servisni sloj
│   │   ├── supabase.ts          # Supabase klijent
│   │   ├── memorials.ts         # CRUD memorijala
│   │   ├── media.ts             # Upload/delete medija
│   │   ├── storage.ts           # Supabase storage helper
│   │   ├── comments.ts          # Komentari
│   │   ├── gifts.ts             # Pokloni
│   │   ├── giftCatalog.ts       # Katalog poklona
│   │   ├── obituaries.ts        # Umrlice
│   │   ├── livingProfiles.ts    # Living profiles
│   │   ├── duplicateDetection.ts # Detekcija duplikata
│   │   ├── moderation.ts        # Content moderation
│   │   └── stripe.ts            # Stripe integracija
│   │
│   ├── pages/            # Stranice (17 stranica)
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Profile.tsx
│   │   ├── Memorials.tsx
│   │   ├── Memorial.tsx
│   │   ├── CreateMemorial.tsx
│   │   ├── EditMemorial.tsx
│   │   ├── Obituaries.tsx
│   │   ├── Obituary.tsx
│   │   ├── CreateObituary.tsx
│   │   ├── LivingProfile.tsx
│   │   ├── CreateLivingProfile.tsx
│   │   ├── ActivateProfile.tsx
│   │   └── NotFound.tsx
│   │
│   ├── types/            # TypeScript tipovi
│   │   ├── auth.ts
│   │   ├── memorial.ts
│   │   ├── media.ts
│   │   ├── comment.ts
│   │   ├── gift.ts
│   │   ├── obituary.ts
│   │   └── livingProfile.ts
│   │
│   ├── App.tsx           # Routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles (Tailwind)
│
├── .env                  # Environment varijable (GITIGNORE!)
├── .env.example          # Primer env fajla
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
├── CLAUDE.md             # Ovaj fajl
└── CHANGELOG.md          # Istorija promena
```

---

## 5. ROUTING (URL STRUKTURA)

### 5.1 Javne rute
| Putanja | Komponenta | Opis |
|---------|------------|------|
| `/` | Home | Početna stranica |
| `/prijava` | Login | Prijava korisnika |
| `/registracija` | Register | Registracija |
| `/memorijali` | Memorials | Lista svih memorijala |
| `/memorijal/:id` | Memorial | Detalji memorijala |
| `/umrlice` | Obituaries | Lista umrlica |
| `/umrlica/:id` | Obituary | Detalji umrlice |

### 5.2 Zaštićene rute (potrebna prijava)
| Putanja | Komponenta | Opis |
|---------|------------|------|
| `/profil` | Profile | Korisnički profil |
| `/kreiraj-memorijal` | CreateMemorial | Kreiranje memorijala |
| `/memorijal/:id/izmeni` | EditMemorial | Izmena memorijala |
| `/umrlica/nova` | CreateObituary | Kreiranje umrlice |
| `/moj-profil` | LivingProfile | Living profile pregled |
| `/moj-profil/kreiraj` | CreateLivingProfile | Kreiranje living profila |
| `/aktiviraj/:id` | ActivateProfile | Aktivacija memorijala |

---

## 6. IMPLEMENTIRANE FUNKCIONALNOSTI

### 6.1 Autentifikacija
- [x] Registracija email/password
- [x] Prijava email/password
- [x] Odjava
- [x] Protected routes
- [x] Session persistencija

### 6.2 Memorijali
- [x] Kreiranje memorijala
- [x] Pregled liste memorijala
- [x] Detaljna stranica memorijala
- [x] Izmena memorijala (vlasnik)
- [x] Biografija (rich text)
- [x] Profilna i cover slika
- [x] Detekcija duplikata pri kreiranju

### 6.3 Mediji
- [x] Upload slika
- [x] Upload video snimaka
- [x] Upload dokumenata (PDF)
- [x] Galerija slika
- [x] Video player
- [x] Lista dokumenata
- [x] Brisanje medija

### 6.4 Komentari
- [x] Dodavanje komentara
- [x] Anonimni komentari
- [x] Moderacija (pending/approved/rejected)
- [x] Profanity filter
- [x] Moderacijski dashboard

### 6.5 Virtuelni pokloni
- [x] Katalog poklona (sveća, cveće, venac, krst)
- [x] Slanje poklona
- [x] Poruka uz poklon
- [x] Stripe integracija (MVP simulacija)
- [x] Prikaz poklona na memorijalu

### 6.6 Umrlice
- [x] Kreiranje umrlice
- [x] Povezivanje sa memorijalom
- [x] Detalji sahrane
- [x] Opcija za donacije
- [x] Status (draft/published/archived)

### 6.7 Living Profiles
- [x] Kreiranje profila dok si živ
- [x] Dodavanje članova porodice
- [x] Tajni izraz za aktivaciju
- [x] Konverzija u memorijal

### 6.8 Internacionalizacija
- [x] Srpski (default)
- [x] Engleski
- [x] Podrška za 11 jezika (fallback na SR/EN):
  - Hrvatski, Bosanski, Slovenački, Makedonski, Bugarski
  - Nemački, Francuski, Italijanski, Španski

### 6.9 UX/Pristupačnost
- [x] Responsive dizajn
- [x] Touch-friendly (min 44px tap targets)
- [x] Focus styles za a11y
- [x] Loading states
- [x] Error handling

---

## 7. ENVIRONMENT VARIJABLE

### 7.1 Potrebne varijable (.env)
```bash
# Supabase (OBAVEZNO)
VITE_SUPABASE_URL=https://haxmhcrsmqvwseseddri.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Stripe (za plaćanja)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 7.2 Gde naći ključeve
- **Supabase:** Project Settings → API → `anon` public key
- **Stripe:** Developers → API keys → Publishable key

---

## 8. RAZVOJNE KOMANDE

```bash
# Instalacija dependency-ja
npm install

# Pokretanje dev servera
npm run dev
# → http://localhost:5173

# Build za produkciju
npm run build

# Preview produkcijskog builda
npm run preview

# Linting
npm run lint
```

---

## 9. TYPESCRIPT KONFIGURACIJA

### 9.1 Važna podešavanja (tsconfig.app.json)
```json
{
  "compilerOptions": {
    "verbatimModuleSyntax": true,  // VAŽNO: Zahteva `import type` za tipove
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### 9.2 Import pravila
**OBAVEZNO** koristiti `import type` za sve type-only importe:
```typescript
// ✅ ISPRAVNO
import type { Memorial } from '../types/memorial'
import { createMemorial } from '../lib/memorials'

// ❌ POGREŠNO - izazvaće build error
import { Memorial } from '../types/memorial'
```

---

## 10. ČESTI PROBLEMI I REŠENJA

### 10.1 "Module does not provide an export named..."
**Uzrok:** Import tipa bez `type` keyword-a
**Rešenje:** Dodaj `import type` ispred importa

### 10.2 Bela stranica bez grešaka
**Uzrok:** JavaScript error pre renderovanja
**Rešenje:** Proveri browser console (F12 → Console)

### 10.3 Supabase connection error
**Uzrok:** Nedostaju env varijable
**Rešenje:** Proveri `.env` fajl i restartuj dev server

### 10.4 Media upload ne radi
**Uzrok:** Storage bucket nije konfigurisan
**Rešenje:** Proveri da bucket "memorial-media" postoji u Supabase

---

## 11. DEPLOYMENT CHECKLIST

### 11.1 Pre deploymenta
- [ ] Sve env varijable podešene na produkciji
- [ ] Supabase RLS policies aktivirane
- [ ] Stripe webhook konfigurisan
- [ ] Domen/subdomen odlučen i konfigurisan
- [ ] SSL certifikat

### 11.2 Coolify deployment
```bash
# Build command
npm run build

# Output directory
dist

# Environment
NODE_ENV=production
```

### 11.3 Potrebne DNS postavke
- A record ili CNAME ka Hetzner serveru
- SSL preko Coolify (Let's Encrypt)

---

## 12. BUDUĆI RAZVOJ (TODO)

### 12.1 Prioritetno
- [ ] Finalno ime i domen platforme
- [ ] Produkcijski Stripe ključevi
- [ ] Email notifikacije
- [ ] SEO optimizacija (meta tags, OG)

### 12.2 Planirano
- [ ] QR kod za memorijal (za nadgrobni spomenik)
- [ ] Društvene mreže integracija
- [ ] Premium planovi
- [ ] Admin dashboard
- [ ] Statistika posjeta

### 12.3 Nice-to-have
- [ ] PWA podrška
- [ ] Offline mode
- [ ] Native mobile app

---

## 13. KONTAKT I PODRŠKA

- **GitHub Issues:** [link će biti dodat]
- **Email:** [email će biti dodat]
- **Agencija:** OrbitaCode

---

## 14. VERZIONIRANJE

Ovaj dokument prati verziju projekta.
- **Poslednja izmena:** 2025-01-15
- **Autor:** Claude AI (uz superviziju Jovane Jović)

---

> **NAPOMENA ZA AI ASISTENTE:**
> 1. Uvek pročitaj CHANGELOG.md za istoriju promena
> 2. Koristi `import type` za sve TypeScript tipove
> 3. Testiraj promene lokalno pre commit-a
> 4. Prati postojeću strukturu i konvencije
> 5. Dokumentuj sve značajne promene
