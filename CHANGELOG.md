# CHANGELOG - Memorijalna Platforma

Svi značajni promene na projektu su dokumentovane u ovom fajlu.

Format: [Semantic Versioning](https://semver.org/)
- **Added** - nove funkcionalnosti
- **Changed** - izmene postojećih funkcionalnosti
- **Fixed** - ispravke grešaka
- **Removed** - uklonjene funkcionalnosti
- **Security** - sigurnosne ispravke

---

## [Unreleased]

### Added
- CLAUDE.md dokumentacija za AI asistente
- CHANGELOG.md za praćenje promena

### Fixed
- TypeScript import greške - dodato `import type` za sve type-only importe
  - `src/types/auth.ts` - promenjeno `User, Session` → `AuthUser, AuthSession`
  - `src/lib/stripe.ts` - razdvojen type import
  - `src/lib/storage.ts` - razdvojen type import
  - `src/lib/livingProfiles.ts` - dodat `import type`
  - Višestruki fajlovi sa importima iz `types/` i `i18n/`

---

## [0.0.0] - 2025-01-14

### Phase 12: Polish & Launch - Project Complete!

**Datum:** 2025-01-14
**Commit:** f1002e6

#### Added
- Završna optimizacija UI/UX
- Responsive improvements
- Performance optimizacije
- Error handling poboljšanja

#### Changed
- Finalna priprema za produkciju

---

## [Pre-release] - 2025-01-14

### Phase 11: Duplicate Detection

**Datum:** 2025-01-14
**Commit:** 888940f

#### Added
- `DuplicateWarning` komponenta - upozorenje kod kreiranja memorijala
- `duplicateDetection.ts` servis za pronalaženje potencijalnih duplikata
- Algoritam za poređenje imena, datuma rođenja/smrti
- Similarity scoring sistem
- UI za prikaz mogućih duplikata sa linkovima

#### Why
Sprečavanje slučajnog kreiranja više memorijala za istu osobu. Sistem poredi:
- Ime i prezime (fuzzy matching)
- Datum rođenja
- Datum smrti
- Mesto rođenja/smrti

---

### Phase 10: Internationalization (i18n)

**Datum:** 2025-01-14
**Commit:** 80ae052

#### Added
- `LanguageContext` - React context za upravljanje jezikom
- `LanguageSwitcher` komponenta - dropdown za izbor jezika
- `src/i18n/` modul sa translation sistemom
- Srpski jezik (sr.ts) - kompletan prevod
- Engleski jezik (en.ts) - kompletan prevod
- Podrška za 11 jezika (sa fallback):
  - 🇷🇸 Srpski (default)
  - 🇬🇧 Engleski
  - 🇭🇷 Hrvatski → fallback na srpski
  - 🇧🇦 Bosanski → fallback na srpski
  - 🇸🇮 Slovenački → fallback na srpski
  - 🇲🇰 Makedonski → fallback na srpski
  - 🇧🇬 Bugarski → fallback na srpski
  - 🇩🇪 Nemački → fallback na engleski
  - 🇫🇷 Francuski → fallback na engleski
  - 🇮🇹 Italijanski → fallback na engleski
  - 🇪🇸 Španski → fallback na engleski
- Browser language detection
- Language persistence u localStorage
- Type-safe translation getter

#### Why
Platforma treba da bude dostupna korisnicima iz regiona i dijaspore. Prioritet su bili balkanski jezici zbog sličnosti sa srpskim.

---

### Phase 9: Living Profiles

**Datum:** 2025-01-13
**Commit:** 35a70df

#### Added
- `LivingProfile` tip - profil osobe koja je živa
- `FamilyMember` tip - članovi porodice za aktivaciju
- `ActivationSettings` - podešavanja za aktivaciju memorijala
- `livingProfiles.ts` servis:
  - `createLivingProfile()` - kreiranje profila
  - `getUserLivingProfile()` - dohvatanje profila
  - `updateLivingProfile()` - ažuriranje
  - `addFamilyMember()` - dodavanje člana porodice
  - `removeFamilyMember()` - uklanjanje člana
  - `activateProfile()` - konverzija u memorijal
  - `publishLivingProfile()` - objava profila
- Stranice:
  - `LivingProfile.tsx` - pregled i upravljanje
  - `CreateLivingProfile.tsx` - kreiranje
  - `ActivateProfile.tsx` - aktivacija nakon smrti
- `FamilyMemberList` komponenta

#### Why
Omogućava ljudima da pripreme svoj memorijal dok su živi - izaberu slike, napišu biografiju, odrede ko može aktivirati memorijal. Članovi porodice dobijaju tajni izraz za aktivaciju.

---

### Phase 8: Obituaries (Umrlice)

**Datum:** 2025-01-13
**Commit:** 8f6cb84

#### Added
- `Obituary` tip sa statusima: draft, published, archived
- `FuneralDetails` - detalji sahrane (datum, vreme, lokacija)
- `DonationSettings` - opcija za prikupljanje donacija
- `obituaries.ts` servis:
  - `createObituary()` - kreiranje umrlice
  - `publishObituary()` - objavljivanje
  - `getRecentObituaries()` - lista nedavnih
  - `getObituaryById()` - detalji
- Stranice:
  - `Obituaries.tsx` - lista umrlica
  - `Obituary.tsx` - detalji umrlice
  - `CreateObituary.tsx` - kreiranje (dugačka forma)
- `ObituaryCard` komponenta

#### Why
Umrlice su odvojene od memorijala - kratkoročne informacije o sahrani vs trajni memorijal. Mogu se povezati sa memorijalom ili stajati samostalno.

---

### Phase 7: Virtual Gifts (Virtuelni pokloni)

**Datum:** 2025-01-12
**Commits:** 010450a - 4f8a474

#### Added
- `GiftProduct` tip - proizvodi u katalogu
- `Gift` tip - kupljeni pokloni
- `GiftType`: candle, flower, wreath, cross
- `giftCatalog.ts` - katalog proizvoda sa cenama
- `gifts.ts` servis za kupovinu i prikaz
- `stripe.ts` - Stripe klijent integracija
- Komponente:
  - `GiftCatalog.tsx` - prikaz dostupnih poklona
  - `GiftModal.tsx` - modal za kupovinu
  - `GiftDisplay.tsx` - prikaz poklona na memorijalu
- Integracija na Memorial stranici

#### Why
Monetizacija platforme + emotivna vrednost za posetioce. MVP koristi simulirano plaćanje, Stripe je spreman za produkciju.

---

### Phase 6: Visitor Comments (Komentari posetilaca)

**Datum:** 2025-01-11
**Commits:** 1c171c3 - 6edab79

#### Added
- `Comment` tip sa statusima: pending, approved, rejected
- `comments.ts` servis:
  - `createComment()` - dodavanje komentara
  - `getApprovedComments()` - odobreni komentari
  - `getCommentsForModeration()` - komentari za moderaciju
  - `updateCommentStatus()` - promena statusa
  - `deleteComment()` - brisanje
  - `getPendingCommentsCount()` - broj na čekanju
- `moderation.ts` - profanity filter za srpski/engleski
- Komponente:
  - `CommentForm.tsx` - forma sa validacijom
  - `CommentList.tsx` - lista odobrenih komentara
  - `ModerationQueue.tsx` - dashboard za moderaciju
- Anonimni komentari opcija

#### Why
Posetioci mogu ostaviti sećanja i kondolencije. Moderacija sprečava neprimereni sadržaj.

---

### Phase 5: Biography & Profile (Biografija i profil)

**Datum:** 2025-01-10
**Commits:** 714b9f7 - 10a701f

#### Added
- Polje `biography` u Memorial tipu
- Polja `profile_image_url` i `cover_image_url`
- Komponente:
  - `BiographyEditor.tsx` - textarea editor
  - `BiographyDisplay.tsx` - formatirani prikaz
  - `ProfileImageUpload.tsx` - upload profilne slike
  - `CoverImageUpload.tsx` - upload cover slike
  - `ImageCropper.tsx` - (placeholder za budući crop)
- `EditMemorial.tsx` stranica za izmenu
- Ruta `/memorijal/:id/izmeni`

#### Changed
- `Memorial.tsx` - integrisan prikaz biografije i slika
- `memorials.ts` - dodate update funkcije

---

### Phase 4: Media Gallery (Galerija medija)

**Datum:** 2025-01-09
**Commits:** d742cdf - 76e4ac4

#### Added
- `MediaItem` tip - slike, video, dokumenti
- `media.ts` servis:
  - `addMedia()` - upload sa metapodacima
  - `getMemorialMedia()` - dohvatanje medija
  - `deleteMedia()` - brisanje
- `storage.ts` helper:
  - `uploadFile()` - upload u Supabase Storage
  - `validateFile()` - validacija tipa i veličine
  - `getMediaType()` - detekcija tipa
- Komponente:
  - `MediaUpload.tsx` - drag & drop upload
  - `PhotoGallery.tsx` - lightbox galerija
  - `VideoPlayer.tsx` - HTML5 video player
  - `DocumentList.tsx` - lista PDF dokumenata

#### Configuration
- Storage bucket: `memorial-media`
- Limiti:
  - Slike: 10MB
  - Video: 100MB
  - Dokumenti: 20MB

---

### Phase 3: Memorial CRUD

**Datum:** 2025-01-08
**Commits:** (inicijalni development)

#### Added
- `Memorial` tip sa svim poljima
- `memorials.ts` servis:
  - `createMemorial()` - kreiranje
  - `getMemorials()` - lista sa filterima
  - `getMemorialById()` - detalji
  - `getUserMemorials()` - memorijali korisnika
  - `updateMemorial()` - ažuriranje
- Stranice:
  - `Memorials.tsx` - lista memorijala
  - `Memorial.tsx` - detaljna stranica
  - `CreateMemorial.tsx` - forma za kreiranje
- `MemorialCard.tsx` komponenta

---

### Phase 2: Authentication

**Datum:** 2025-01-07
**Commits:** (inicijalni development)

#### Added
- `AuthContext` - React context za autentifikaciju
- Supabase Auth integracija
- Funkcije: signUp, signIn, signOut
- Session persistence
- `ProtectedRoute` komponenta
- Stranice:
  - `Login.tsx` - prijava
  - `Register.tsx` - registracija
  - `Profile.tsx` - korisnički profil

---

### Phase 1: Project Setup

**Datum:** 2025-01-06
**Commits:** (inicijalni development)

#### Added
- Vite + React + TypeScript projekat
- Tailwind CSS 4 konfiguracija
- React Router DOM setup
- Supabase klijent
- Osnovna struktura foldera
- `Layout.tsx` sa navigacijom
- `Home.tsx` landing stranica
- `.env.example` template
- Osnovni tipovi u `types/`

#### Configuration
- TypeScript strict mode
- `verbatimModuleSyntax: true`
- ESLint setup

---

## Database Schema History

### Inicijalna šema (Phase 1-3)
```sql
-- memorials tabela
CREATE TABLE memorials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  date_of_death DATE NOT NULL,
  place_of_birth TEXT NOT NULL,
  place_of_death TEXT NOT NULL,
  father_name TEXT,
  mother_name TEXT,
  biography TEXT,
  profile_image_url TEXT,
  cover_image_url TEXT,
  is_draft BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true
);
```

### Media tabela (Phase 4)
```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  memorial_id UUID REFERENCES memorials(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL, -- 'image', 'video', 'document'
  url TEXT NOT NULL,
  filename TEXT NOT NULL,
  size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  caption TEXT,
  "order" INTEGER DEFAULT 0
);
```

### Comments tabela (Phase 6)
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  memorial_id UUID REFERENCES memorials(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  moderation_note TEXT,
  is_anonymous BOOLEAN DEFAULT false
);
```

### Gift tabele (Phase 7)
```sql
CREATE TABLE gift_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- 'candle', 'flower', 'wreath', 'cross'
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE gifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  memorial_id UUID REFERENCES memorials(id) ON DELETE CASCADE,
  product_id UUID REFERENCES gift_products(id),
  sender_name TEXT NOT NULL,
  sender_message TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  payment_status TEXT DEFAULT 'pending',
  stripe_payment_id TEXT
);
```

### Obituaries tabela (Phase 8)
```sql
CREATE TABLE obituaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id),
  memorial_id UUID REFERENCES memorials(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  date_of_death DATE NOT NULL,
  place_of_death TEXT,
  content TEXT,
  photo_url TEXT,
  funeral_date DATE,
  funeral_time TIME,
  funeral_location TEXT,
  funeral_address TEXT,
  funeral_notes TEXT,
  donations_enabled BOOLEAN DEFAULT false,
  donation_goal_cents INTEGER,
  donation_raised_cents INTEGER DEFAULT 0,
  donation_charity_name TEXT,
  donation_charity_description TEXT,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMPTZ
);
```

### Living Profiles tabela (Phase 9)
```sql
CREATE TABLE living_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  place_of_birth TEXT,
  father_name TEXT,
  mother_name TEXT,
  biography TEXT,
  profile_image_url TEXT,
  cover_image_url TEXT,
  status TEXT DEFAULT 'draft', -- 'draft', 'active', 'converted'
  family_members JSONB DEFAULT '[]',
  activation_settings JSONB DEFAULT '{"require_verification": true, "notify_family_on_activation": true}',
  converted_memorial_id UUID REFERENCES memorials(id),
  date_of_death DATE,
  activated_at TIMESTAMPTZ,
  activated_by UUID REFERENCES auth.users(id)
);
```

---

## Links

- **Supabase Dashboard:** https://supabase.com/dashboard/project/haxmhcrsmqvwseseddri
- **GitHub Repo:** https://github.com/Orbita-Code/memorijalna-platforma
- **Production URL:** https://memorials.orbitacode.com
- **Coolify Dashboard:** https://deploy.orbitacode.com

---

## Contributors

- **Jovana Jović** - Project Owner, OrbitaCode
- **Claude AI** - Development Assistant

---

*Ovaj changelog se ažurira sa svakom značajnom promenom na projektu.*
