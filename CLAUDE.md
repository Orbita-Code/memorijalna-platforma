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

### 1.4 Ciljna grupa
- Porodice preminulih (često starije osobe 50-80 godina)
- Ljudi koji nisu tehnički potkovani
- Korisnici u emotivno teškim trenucima

---

## 2. UX PRINCIPI (KRITIČNO!)

> **OVO JE NAJVAŽNIJI DEO DOKUMENTA ZA RAZVOJ NOVIH FUNKCIONALNOSTI!**

### 2.1 Filozofija: "Self-Service Everything"

Platforma MORA biti dizajnirana tako da korisnici mogu SVE uraditi sami, bez ikakve potrebe za kontaktom sa podrškom. Svaka stranica, svaka funkcionalnost mora biti toliko jasna i jednostavna da čak i osoba koja nikad nije koristila internet može da je koristi.

### 2.2 Pravila za pisanje teksta na platformi

1. **Piši kao da objašnjavaš 8-godišnjem detetu ili 75-godišnjoj baki**
   - Koristi jednostavne reči
   - Izbegavaj tehničke termine (ako moraš, objasni ih)
   - Ne pretpostavljaj da korisnik zna bilo šta

2. **Detaljna uputstva korak po korak**
   - Svaki proces mora biti razložen na male, jasne korake
   - Numeriši korake (1, 2, 3...)
   - Objasni ŠTA korisnik treba da uradi i GDE da klikne
   - Primer: Umesto "Skenirajte QR kod" → "Otvorite kameru na vašem mobilnom telefonu i usmerite je ka QR kodu"

3. **Ne ostavljaj prostor za pitanja**
   - Svaka informacija mora biti kompletna
   - Ako nešto košta novac - napiši tačnu cenu
   - Ako treba ići negde - napiši tačnu adresu/lokaciju
   - Ako treba čekati - napiši koliko dugo

4. **Jedan ekran = jedan cilj**
   - Ne pretrpavaj stranice sa previše opcija
   - Vodi korisnika kroz proces linearno
   - Jasna hijerarhija informacija (najvažnije na vrhu)

### 2.3 Self-Service za partnere i plaćanja

**NIKAD ne koristiti "Kontaktirajte nas" kao rešenje!**

Umesto toga:
- Napravi formu koju korisnik popunjava sam
- Omogući instant plaćanje (Stripe)
- Automatska aktivacija nakon plaćanja
- Automatske potvrde emailom

Primer - Partner želi da se oglasi:
1. Popuni formu sa podacima firme
2. Odabere paket (Basic/Premium/Gold)
3. Plati karticom
4. Oglas je automatski aktivan
5. Dobije email potvrdu

### 2.4 Vizuelni principi

- **Velika dugmad** (min 44px za touch)
- **Čitljiv font** (min 16px za tekst)
- **Dovoljno belog prostora** - ne gušiti sadržaj
- **Jasne boje** za akcije (plavo = akcija, zeleno = uspeh, crveno = greška)
- **Bez emojija** u formalnim sekcijama
- **Ikone samo ako pomažu** razumevanju, ne kao dekoracija

### 2.5 Checklist pre puštanja nove funkcionalnosti

- [ ] Da li bi moja baka od 75 godina znala kako ovo da koristi?
- [ ] Da li ima "Kontaktirajte nas" negde? (AKO DA - ZAMENI SA SELF-SERVICE!)
- [ ] Da li su svi koraci objašnjeni?
- [ ] Da li su cene jasno prikazane?
- [ ] Da li korisnik može završiti proces bez pomoći?
- [ ] Da li ima nepotrebnih informacija koje mogu zbuniti?

---

## 3. DIZAJN STANDARDI (KRITIČNO!)

> **OVO JE OBAVEZAN DEO ZA BILO KAKAV VIZUELNI RAD NA PLATFORMI!**

### 3.1 Filozofija dizajna

Platforma mora imati **premium, inovativan dizajn** na nivou vrhunskih svetskih agencija. Dizajn treba da ostavlja utisak kao da ga je kreirao dizajner sa **30+ godina iskustva** - sofisticiran, elegantan, i jedinstven.

### 3.2 STROGO ZABRANJENO

| ❌ NIKADA NE KORISTITI | Razlog |
|------------------------|--------|
| **Emoji/emotikoni** | Jeftino deluje, neprofesionalno za memorijalnu platformu |
| **Stock grafika** | Generično, bez duše |
| **Generički AI dizajn** | Prepoznatljivo i bez originalnosti |
| **Clip art ili jeftine ikone** | Smanjuje kredibilitet platforme |
| **Gradient dugmad sa efektima** | Zastarelo, "2010s" estetika |
| **Previše boja** | Haotično, neprofesionalno |
| **Crna boja za tekst** | Preoštra, koristiti #2F3A40 (text-primary) |
| **Čisto bela pozadina** | Hladna, koristiti ivory (#FAFAF8) |

### 3.3 Obavezni dizajn principi

1. **Custom SVG ikone**
   - Religijski simboli (krst, polumesec, Davidova zvezda) MORAJU biti SVG
   - Sve ikone moraju biti jedinstvene i usklađene sa paletom
   - Nikad emoji kao zamena za ikonu

2. **Sofisticirana tipografija**
   - **Cormorant Garamond** - naslovi, imena pokojnika (serif, elegantan)
   - **Inter** - tekst, UI elementi (sans-serif, čitljiv)
   - Pravilna hijerarhija veličina

3. **Paleta boja (OBAVEZNA)**
   ```css
   /* Pozadine */
   --ivory: #FAFAF8;        /* Glavna pozadina */
   --sand: #EDE7DD;         /* Sekundarna pozadina */
   --sand-light: #F1ECE5;   /* Kartice, sekcije */

   /* Primarna (CTA, linkovi) */
   --sky: #9DBED4;          /* Dugmad, linkovi */
   --sky-dark: #8AB0C8;     /* Hover stanja */

   /* Akcenti */
   --sage: #AEBFB3;         /* Living profiles, tagovi */
   --rose: #D8B4A6;         /* Emocije, srce, cveće */

   /* Tekst */
   --text-primary: #2F3A40;    /* Glavni tekst */
   --text-secondary: #6B7A80;  /* Sekundarni tekst */
   --text-muted: #9CA3AF;      /* Placeholder, hints */
   ```

4. **Animacije i interakcije**
   - Sve animacije moraju biti **custom** i **suptilne**
   - Smooth transitions (300ms ease)
   - Hover efekti na svim interaktivnim elementima
   - Loading states sa elegantnim spinnerima
   - Page transitions gde ima smisla

5. **Jedinstvenost**
   - Dizajn mora biti **prepoznatljiv** i **različit** od konkurencije
   - Nijedan element ne sme izgledati kao da je "copy-paste" iz template-a
   - Svaki detalj mora imati svrhu

### 3.4 Checklist pre vizuelnih promena

- [ ] Da li koristi isključivo definisanu paletu boja?
- [ ] Da li ima bilo kakvih emojija? (AKO DA - UKLONI!)
- [ ] Da li tipografija prati pravila (Cormorant/Inter)?
- [ ] Da li su ikone custom SVG (ne emoji, ne stock)?
- [ ] Da li animacije deluju premium i suptilno?
- [ ] Da li izgleda jedinstveno ili generično?
- [ ] Da li bi dizajner sa 30+ godina iskustva ovo odobrio?

---

## 4. SEO I GEO OPTIMIZACIJA (KRITIČNO!)

> **Svaki tekst i sadržaj na platformi MORA biti optimizovan za pretraživače i AI asistente!**

### 4.1 Šta je SEO i GEO?

- **SEO (Search Engine Optimization)** - Optimizacija za Google, Bing, i druge pretraživače
- **GEO (Generative Engine Optimization)** - Optimizacija za AI asistente (ChatGPT, Claude, Perplexity, Gemini)

### 4.2 Obavezni SEO elementi za svaku stranicu

1. **Title tag** (60-70 karaktera)
   - Format: `[Naslov stranice] | Memorijalna Platforma`
   - Primer: `Digitalni Memorijali - Sačuvajte Uspomene | Memorijalna Platforma`

2. **Meta description** (150-160 karaktera)
   - Jasan opis sadržaja stranice
   - Uključiti ključne reči prirodno
   - Call-to-action gde je prikladno

3. **Open Graph tagovi**
   ```html
   <meta property="og:title" content="..." />
   <meta property="og:description" content="..." />
   <meta property="og:image" content="..." />
   <meta property="og:type" content="website" />
   ```

4. **Heading struktura**
   - Samo jedan `<h1>` po stranici
   - Logična hijerarhija: h1 → h2 → h3
   - Ključne reči u heading-ima

5. **Schema.org strukturirani podaci**
   - `Person` za memorijale
   - `Article` za umrlice i blog
   - `LocalBusiness` za partnere
   - `FAQPage` za FAQ stranicu

### 4.3 GEO optimizacija (za AI asistente)

AI asistenti (ChatGPT, Claude, Perplexity) koriste drugačije signale od Google-a:

1. **Jasna struktura sadržaja**
   - Koristiti bullet points i numerisane liste
   - Jasni naslovi i podnaslovi
   - Kraći paragrafi (2-3 rečenice)

2. **Autoritativni ton**
   - Pisati sa ekspertskom pozicijom
   - Koristiti konkretne brojke i činjenice
   - Izbegavati nejasne izjave

3. **Odgovaranje na pitanja**
   - Strukturirati sadržaj kao odgovore na pitanja
   - Koristiti FAQ format gde je prikladno
   - Direktni odgovori na početku, detalji posle

4. **Kontekstualna relevantnost**
   - Povezivati teme logično
   - Koristiti sinonime i srodne termine
   - Referencirati širi kontekst (lokacija, industrija)

### 4.4 Ključne reči za targetiranje

**Primarne:**
- memorijal online srbija
- digitalni spomenik
- čitulja objava
- umrlica online

**Sekundarne:**
- pogrebna preduzeća beograd
- groblja srbija
- kamenorezačke radnje
- sahrana informacije

**Long-tail:**
- kako napraviti online memorijal
- gde objaviti čitulju
- living memorial značenje

### 4.5 Checklist za novi sadržaj

- [ ] Da li stranica ima SEO komponentu sa title i description?
- [ ] Da li je heading struktura logična (h1 → h2 → h3)?
- [ ] Da li su ključne reči uključene prirodno?
- [ ] Da li sadržaj odgovara na pitanja korisnika?
- [ ] Da li je tekst strukturiran za lako skeniranje?
- [ ] Da li ima Schema.org markup gde je potrebno?
- [ ] Da li su slike optimizovane sa alt tekstom?

### 4.6 Tehnička implementacija

Koristiti `<SEO>` komponentu na svakoj stranici:

```tsx
import SEO from '../components/SEO'

export default function MojaStratnica() {
  return (
    <>
      <SEO
        title="Naslov Stranice"
        description="Opis stranice sa ključnim rečima, 150-160 karaktera."
        ogImage="/images/og-image.jpg"
      />
      {/* Sadržaj stranice */}
    </>
  )
}
```

---

## 5. TEHNIČKI STACK

### 5.1 Frontend
| Tehnologija | Verzija | Svrha |
|-------------|---------|-------|
| React | 19.2.0 | UI framework |
| TypeScript | ~5.9.3 | Type safety |
| Vite | 7.3.1 | Build tool & dev server |
| React Router DOM | 7.12.0 | Routing |
| Tailwind CSS | 4.1.18 | Styling |

### 5.2 Backend & Baza
| Servis | Detalji |
|--------|---------|
| Supabase | BaaS - Auth, Database, Storage |
| PostgreSQL | Baza podataka (preko Supabase) |

### 5.3 Eksterni servisi
| Servis | Svrha | Status |
|--------|-------|--------|
| Stripe | Plaćanja za poklone | Konfigurisan (MVP simulira plaćanja) |
| Supabase Storage | Upload medija | Bucket "memorial-media" kreiran |

---

## 6. INFRASTRUKTURA

### 6.1 Supabase konfiguracija
```
URL: https://haxmhcrsmqvwseseddri.supabase.co
Projekat: "Memorijalna Platforma"
Region: (proveriti u Supabase dashboard-u)
```

### 6.2 Database tabele
Sve tabele su kreirane u Supabase:
- `memorials` - glavni memorijali
- `media` - slike, video, dokumenti
- `comments` - komentari posetilaca
- `gifts` - virtuelni pokloni
- `gift_products` - katalog poklona
- `obituaries` - umrlice
- `living_profiles` - profili živih osoba
- `family_members` - članovi porodice (za living profiles)

### 6.3 Storage
- **Bucket:** `memorial-media`
- **Dozvoljeni tipovi:**
  - Slike: JPEG, PNG, WebP, GIF (max 10MB)
  - Video: MP4, WebM, QuickTime (max 100MB)
  - Dokumenti: PDF (max 20MB)

### 6.4 Hosting (Production)
| Komponenta | Servis | Detalji |
|------------|--------|---------|
| Server | Hetzner | Aktivan |
| Git repo | GitHub | github.com/Orbita-Code/memorijalna-platforma |
| Deployment | Coolify | panel.orbitacode.com |
| Production URL | - | https://memorials.orbitacode.com |

**Automatski deploy:** Coolify ima konfigurisan webhook - svaki push na `main` branch automatski pokreće novi deploy.

---

## 7. STRUKTURA PROJEKTA

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

## 8. ROUTING (URL STRUKTURA)

### 8.1 Javne rute
| Putanja | Komponenta | Opis |
|---------|------------|------|
| `/` | Home | Početna stranica |
| `/prijava` | Login | Prijava korisnika |
| `/registracija` | Register | Registracija |
| `/memorijali` | Memorials | Lista svih memorijala |
| `/memorijal/:id` | Memorial | Detalji memorijala |
| `/umrlice` | Obituaries | Lista umrlica |
| `/umrlica/:id` | Obituary | Detalji umrlice |

### 8.2 Zaštićene rute (potrebna prijava)
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

## 9. IMPLEMENTIRANE FUNKCIONALNOSTI

### 9.1 Autentifikacija
- [x] Registracija email/password
- [x] Prijava email/password
- [x] Odjava
- [x] Protected routes
- [x] Session persistencija

### 9.2 Memorijali
- [x] Kreiranje memorijala
- [x] Pregled liste memorijala
- [x] Detaljna stranica memorijala
- [x] Izmena memorijala (vlasnik)
- [x] Biografija (rich text)
- [x] Profilna i cover slika
- [x] Detekcija duplikata pri kreiranju

### 9.3 Mediji
- [x] Upload slika
- [x] Upload video snimaka
- [x] Upload dokumenata (PDF)
- [x] Galerija slika
- [x] Video player
- [x] Lista dokumenata
- [x] Brisanje medija

### 9.4 Komentari
- [x] Dodavanje komentara
- [x] Anonimni komentari
- [x] Moderacija (pending/approved/rejected)
- [x] Profanity filter
- [x] Moderacijski dashboard

### 9.5 Virtuelni pokloni
- [x] Katalog poklona (sveća, cveće, venac, krst)
- [x] Slanje poklona
- [x] Poruka uz poklon
- [x] Stripe integracija (MVP simulacija)
- [x] Prikaz poklona na memorijalu

### 9.6 Umrlice
- [x] Kreiranje umrlice
- [x] Povezivanje sa memorijalom
- [x] Detalji sahrane
- [x] Opcija za donacije
- [x] Status (draft/published/archived)

### 9.7 Living Profiles
- [x] Kreiranje profila dok si živ
- [x] Dodavanje članova porodice
- [x] Tajni izraz za aktivaciju
- [x] Konverzija u memorijal

### 9.8 Internacionalizacija
- [x] Srpski (default)
- [x] Engleski
- [x] Podrška za 11 jezika (fallback na SR/EN):
  - Hrvatski, Bosanski, Slovenački, Makedonski, Bugarski
  - Nemački, Francuski, Italijanski, Španski

### 9.9 UX/Pristupačnost
- [x] Responsive dizajn
- [x] Touch-friendly (min 44px tap targets)
- [x] Focus styles za a11y
- [x] Loading states
- [x] Error handling

---

## 10. ENVIRONMENT VARIJABLE

### 10.1 Potrebne varijable (.env)
```bash
# Supabase (OBAVEZNO)
VITE_SUPABASE_URL=https://haxmhcrsmqvwseseddri.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Stripe (za plaćanja)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 10.2 Gde naći ključeve
- **Supabase:** Project Settings → API → `anon` public key
- **Stripe:** Developers → API keys → Publishable key

---

## 11. RAZVOJNE KOMANDE

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

## 12. TYPESCRIPT KONFIGURACIJA

### 12.1 Važna podešavanja (tsconfig.app.json)
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

### 12.2 Import pravila
**OBAVEZNO** koristiti `import type` za sve type-only importe:
```typescript
// ✅ ISPRAVNO
import type { Memorial } from '../types/memorial'
import { createMemorial } from '../lib/memorials'

// ❌ POGREŠNO - izazvaće build error
import { Memorial } from '../types/memorial'
```

---

## 13. ČESTI PROBLEMI I REŠENJA

### 13.1 "Module does not provide an export named..."
**Uzrok:** Import tipa bez `type` keyword-a
**Rešenje:** Dodaj `import type` ispred importa

### 13.2 Bela stranica bez grešaka
**Uzrok:** JavaScript error pre renderovanja
**Rešenje:** Proveri browser console (F12 → Console)

### 13.3 Supabase connection error
**Uzrok:** Nedostaju env varijable
**Rešenje:** Proveri `.env` fajl i restartuj dev server

### 13.4 Media upload ne radi
**Uzrok:** Storage bucket nije konfigurisan
**Rešenje:** Proveri da bucket "memorial-media" postoji u Supabase

---

## 14. DEPLOYMENT CHECKLIST

### 14.1 Pre deploymenta
- [ ] Sve env varijable podešene na produkciji
- [ ] Supabase RLS policies aktivirane
- [ ] Stripe webhook konfigurisan
- [ ] Domen/subdomen odlučen i konfigurisan
- [ ] SSL certifikat

### 14.2 Coolify deployment
```bash
# Build command
npm run build

# Output directory
dist

# Environment
NODE_ENV=production
```

### 14.3 Potrebne DNS postavke
- A record ili CNAME ka Hetzner serveru
- SSL preko Coolify (Let's Encrypt)

---

## 15. PLANIRANE FUNKCIONALNOSTI

Detaljni spec dokumenti za buduće funkcionalnosti nalaze se u `.planning/`:

| Dokument | Opis | Status |
|----------|------|--------|
| `COMPETITIVE-ANALYSIS.md` | Analiza konkurencije (SafeBeyond, GoodTrust, Cipherwill, itd.) | Aktivno |
| `MONETIZATION-STRATEGY.md` | Strategija monetizacije, cenovnik, self-service principi | Aktivno |
| `features/FAMILY-VERIFICATION.md` | Verifikacija porodice, moderacija sadržaja, hijerarhija pristupa | Planirano |
| `features/LIVING-PROFILES-VAULT.md` | Living Profiles, posthumne poruke, Vault, moderator sistem | Planirano (Dugoročno) |
| `features/B2B-FUNERAL-HOMES.md` | Saradnja sa pogrebnim preduzećima, partner portal | Za razmatranje |

> **Za AI asistente:** Pre implementacije novih feature-a, proveri da li postoji spec dokument u `.planning/features/`.

---

## 16. TVOJA PRIČA - INTERNAL ROADMAP (POVERLJIVO)

> **INTERNO** - Ovaj deo dokumenta je za AI asistente i razvojni tim. NE komunicirati ove detalje korisnicima.

### 16.1 Cilj stranice „Tvoja Priča"

- Da objasni living memorial koncept
- Da motiviše korisnika da kreira memorijal dok je živ
- Da jasno naglasi da **NIŠTA nije javno odmah**
- Da izgradi poverenje oko bezbednosti i poverljivosti

### 16.2 Security & Trust Model - FAZA 1 (OBAVEZNO PRE LANSIRANJA)

**Ovaj model je OBAVEZAN pre puštanja Living Memorial funkcionalnosti u produkciju.**

- [ ] Svi osetljivi podaci su šifrovani (encryption at rest)
- [ ] Encryption keys se čuvaju kod nezavisne treće strane (key custody / escrow model)
- [ ] Platforma nema pristup plain-text sadržaju
- [ ] Podatke čuvamo, ali bez ključeva su neupotrebljivi
- [ ] Aktivacija sadržaja se dešava isključivo nakon potvrde smrti
- [ ] Korisnik unapred definiše:
  - [ ] Šta se objavljuje
  - [ ] Šta se šalje (poruke)
  - [ ] Kome se šalje
  - [ ] Ko upravlja memorijalom nakon aktivacije

### 16.3 FAZA 2 (INTERNO - NE IMPLEMENTIRATI SADA)

> ⚠️ **Ovo se NE pominje korisnicima sada.** Čuva se kao future upgrade.

- Formal insurance / cyber insurance
- Legal trustee / notary-like structure
- Potpuno odvojena institucionalna garancija

### 16.4 Ton i implementacija - PRAVILA

| ✅ RADITI | ❌ NE RADITI |
|-----------|--------------|
| Jednostavno i ljudski | Buzzwords („vojni nivo zaštite") |
| Fokus na kontroli i pameti | Obećavati neimplementirano |
| Naglasak na planiranju | Dramatizovati smrt |
| Humor gde je prikladno | Biti morbidan |
| Konkretan i jasan | Koristiti strašne termine |

**Ključne poruke za komunikaciju:**
- "Pametna odluka, ne emotivna"
- "Ti kontrolišeš svoju priču"
- "Ništa nije javno dok si živ/živa"
- "Planiraš život, zašto ne i sećanje?"

---

## 17. BUDUĆI RAZVOJ (TODO)

### 17.1 Sigurnost (KRITIČNO)
- [x] Supabase RLS (Row Level Security) - KOMPLETNO (sve tabele zaštićene)
- [ ] Security Headers (dodati u Coolify/Nginx):
  - [ ] Content-Security-Policy (CSP)
  - [ ] X-Content-Type-Options: nosniff
  - [ ] X-Frame-Options: DENY
  - [ ] X-XSS-Protection: 1; mode=block
  - [ ] Referrer-Policy: strict-origin-when-cross-origin
  - [ ] Permissions-Policy
- [ ] Rate Limiting (Supabase Edge Functions ili Cloudflare)
- [ ] CORS konfiguracija (Supabase dashboard)
- [ ] Input sanitizacija (XSS zaštita) - pregled svih formi
- [ ] SQL Injection zaštita - Supabase automatski štiti
- [ ] CSRF zaštita
- [ ] Secure cookies (HttpOnly, Secure, SameSite)

### 17.2 SEO & Pristupačnost
- [ ] Sitemap.xml (automatski generisan)
- [ ] robots.txt
- [ ] Meta tags (title, description) za svaku stranicu
- [ ] Open Graph tags (og:title, og:image, og:description)
- [ ] Twitter Card tags
- [ ] Canonical URLs
- [ ] Strukturirani podaci (Schema.org - Person, Article)
- [ ] Alt tekstovi za sve slike
- [ ] ARIA labels gde nedostaju

### 17.3 Pravni zahtevi (GDPR/CCPA)
- [ ] Privacy Policy stranica
- [ ] Terms of Service stranica
- [ ] Cookie Policy & Cookie banner
- [ ] Pravo na brisanje podataka (GDPR čl. 17)
- [ ] Data export funkcionalnost
- [ ] Consent management
- [ ] DPA (Data Processing Agreement) za Supabase

### 17.4 Prioritetno (Funkcionalnost)
- [ ] Finalno ime i domen platforme
- [ ] Produkcijski Stripe ključevi
- [ ] Email notifikacije (Supabase Edge Functions + Resend/SendGrid)
- [ ] Email verifikacija korisnika
- [ ] Password reset funkcionalnost
- [ ] 2FA (Two-Factor Authentication)

### 17.5 Planirano
- [ ] QR kod za memorijal (za nadgrobni spomenik)
- [ ] Društvene mreže integracija (share buttons)
- [ ] Premium planovi (Stripe Subscriptions)
- [ ] Admin dashboard
- [ ] Statistika posjeta (Plausible/Umami - GDPR compliant)
- [ ] Backup strategija (automatski Supabase backups)
- [ ] CDN za medije (Cloudflare ili Supabase CDN)
- [ ] Image optimization (WebP konverzija)

### 17.6 Monitoring & Logging
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Uptime monitoring (UptimeRobot, Betterstack)
- [ ] Audit log za admin akcije
- [ ] Security incident response plan

### 17.7 Nice-to-have
- [ ] PWA podrška
- [ ] Offline mode
- [ ] Native mobile app
- [ ] API za integracije (pogrebna preduzeća)
- [ ] Bulk import memorijala

---

## 18. KONTAKT I PODRŠKA

- **GitHub Issues:** [link će biti dodat]
- **Email:** [email će biti dodat]
- **Agencija:** OrbitaCode

---

## 19. VERZIONIRANJE

Ovaj dokument prati verziju projekta.
- **Poslednja izmena:** 2026-01-22
- **Autor:** Claude AI (uz superviziju Jovane Jović)

---

> **NAPOMENA ZA AI ASISTENTE:**
> 1. Uvek pročitaj CHANGELOG.md za istoriju promena
> 2. Koristi `import type` za sve TypeScript tipove
> 3. Testiraj promene lokalno pre commit-a
> 4. Prati postojeću strukturu i konvencije
> 5. Dokumentuj sve značajne promene

---

## 20. PRAVILA ZA BROWSER AUTOMATION

**STROGO ZABRANJENO:**
- Otvaranje više od 1 taba
- Retry ako browser javi bilo kakvu grešku
- Korišćenje `pkill` za zatvaranje browsera (prekida rad drugih agenata!)
- Automatsko otvaranje browsera bez eksplicitnog zahteva korisnika

**Ako dobiješ grešku "Browser is already in use" ili bilo koju drugu browser grešku:**
1. **ODMAH STANI** - ne pokušavaj ponovo
2. Obavesti korisnika o problemu
3. Ponudi opcije:
   - "Možeš li zatvoriti tab sa [URL] u svom browseru?"
   - "Možeš li ti otvoriti [URL] i uraditi [akciju]?"
   - "Želiš li da ti dam instrukcije koje možeš ručno pratiti?"

**NIKADA ne pokušavaj više od 1 put da otvoriš stranicu. Ako ne uspe - pitaj korisnika za pomoć.**
