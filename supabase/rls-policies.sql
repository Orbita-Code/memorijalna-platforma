-- ============================================
-- SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- Memorijalna Platforma
-- ============================================
-- Pokreni ovaj SQL u Supabase SQL Editor-u
-- Dashboard → SQL Editor → New Query → Paste & Run
-- ============================================

-- ============================================
-- 1. MEMORIALS TABLE
-- ============================================

-- Omogući RLS
ALTER TABLE memorials ENABLE ROW LEVEL SECURITY;

-- Svi mogu čitati javne memorijale (is_public = true)
-- Vlasnik može videti i svoje privatne memorijale
CREATE POLICY "Javni memorijali su vidljivi svima"
ON memorials FOR SELECT
USING (is_public = true OR auth.uid() = user_id);

-- Samo vlasnik može kreirati
CREATE POLICY "Korisnici mogu kreirati svoje memorijale"
ON memorials FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Samo vlasnik može ažurirati
CREATE POLICY "Korisnici mogu ažurirati svoje memorijale"
ON memorials FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Samo vlasnik može brisati
CREATE POLICY "Korisnici mogu brisati svoje memorijale"
ON memorials FOR DELETE
USING (auth.uid() = user_id);

-- ============================================
-- 2. MEDIA TABLE
-- ============================================

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Svi mogu videti medije javnih memorijala
CREATE POLICY "Mediji javnih memorijala su vidljivi"
ON media FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM memorials
    WHERE memorials.id = media.memorial_id
    AND (memorials.is_public = true OR memorials.user_id = auth.uid())
  )
);

-- Vlasnik memorijala može dodavati medije
CREATE POLICY "Vlasnik memorijala može dodavati medije"
ON media FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM memorials
    WHERE memorials.id = media.memorial_id
    AND memorials.user_id = auth.uid()
  )
);

-- Vlasnik memorijala može ažurirati medije
CREATE POLICY "Vlasnik memorijala može ažurirati medije"
ON media FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM memorials
    WHERE memorials.id = media.memorial_id
    AND memorials.user_id = auth.uid()
  )
);

-- Vlasnik memorijala može brisati medije
CREATE POLICY "Vlasnik memorijala može brisati medije"
ON media FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM memorials
    WHERE memorials.id = media.memorial_id
    AND memorials.user_id = auth.uid()
  )
);

-- ============================================
-- 3. COMMENTS TABLE
-- ============================================

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Samo odobreni komentari su javni (ili vlasnik memorijala vidi sve)
CREATE POLICY "Odobreni komentari su vidljivi"
ON comments FOR SELECT
USING (
  status = 'approved'
  OR EXISTS (
    SELECT 1 FROM memorials
    WHERE memorials.id = comments.memorial_id
    AND memorials.user_id = auth.uid()
  )
);

-- Svi mogu dodavati komentare (anonimno ili prijavljeni)
CREATE POLICY "Svi mogu dodavati komentare"
ON comments FOR INSERT
WITH CHECK (true);

-- Vlasnik memorijala može moderirati komentare
CREATE POLICY "Vlasnik memorijala može moderirati komentare"
ON comments FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM memorials
    WHERE memorials.id = comments.memorial_id
    AND memorials.user_id = auth.uid()
  )
);

-- Vlasnik memorijala može brisati komentare
CREATE POLICY "Vlasnik memorijala može brisati komentare"
ON comments FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM memorials
    WHERE memorials.id = comments.memorial_id
    AND memorials.user_id = auth.uid()
  )
);

-- ============================================
-- 4. GIFTS TABLE
-- ============================================

ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- Pokloni su vidljivi na javnim memorijalima
CREATE POLICY "Pokloni su vidljivi na javnim memorijalima"
ON gifts FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM memorials
    WHERE memorials.id = gifts.memorial_id
    AND (memorials.is_public = true OR memorials.user_id = auth.uid())
  )
);

-- Svi mogu slati poklone
CREATE POLICY "Svi mogu slati poklone"
ON gifts FOR INSERT
WITH CHECK (true);

-- Samo sistem može ažurirati poklone (payment status)
-- U produkciji: koristiti service_role key za webhook
CREATE POLICY "Vlasnik memorijala može videti status poklona"
ON gifts FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM memorials
    WHERE memorials.id = gifts.memorial_id
    AND memorials.user_id = auth.uid()
  )
);

-- ============================================
-- 5. GIFT_PRODUCTS TABLE (Katalog)
-- ============================================

ALTER TABLE gift_products ENABLE ROW LEVEL SECURITY;

-- Svi mogu videti katalog poklona
CREATE POLICY "Katalog poklona je javan"
ON gift_products FOR SELECT
USING (is_active = true);

-- Samo admin može menjati katalog (u produkciji dodati admin check)
-- Za sada: niko ne može menjati preko klijenta
CREATE POLICY "Katalog se ne može menjati preko klijenta"
ON gift_products FOR INSERT
WITH CHECK (false);

CREATE POLICY "Katalog UPDATE zabranjen"
ON gift_products FOR UPDATE
USING (false);

CREATE POLICY "Katalog DELETE zabranjen"
ON gift_products FOR DELETE
USING (false);

-- ============================================
-- 6. OBITUARIES TABLE
-- ============================================

ALTER TABLE obituaries ENABLE ROW LEVEL SECURITY;

-- Objavljene umrlice su javne
CREATE POLICY "Objavljene umrlice su javne"
ON obituaries FOR SELECT
USING (status = 'published' OR auth.uid() = user_id);

-- Korisnici mogu kreirati umrlice
CREATE POLICY "Korisnici mogu kreirati umrlice"
ON obituaries FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Samo vlasnik može ažurirati
CREATE POLICY "Korisnici mogu ažurirati svoje umrlice"
ON obituaries FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Samo vlasnik može brisati
CREATE POLICY "Korisnici mogu brisati svoje umrlice"
ON obituaries FOR DELETE
USING (auth.uid() = user_id);

-- ============================================
-- 7. LIVING_PROFILES TABLE
-- ============================================

ALTER TABLE living_profiles ENABLE ROW LEVEL SECURITY;

-- Samo vlasnik može videti svoj living profile
CREATE POLICY "Korisnici mogu videti samo svoj living profile"
ON living_profiles FOR SELECT
USING (auth.uid() = user_id);

-- Korisnici mogu kreirati svoj living profile
CREATE POLICY "Korisnici mogu kreirati living profile"
ON living_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Samo vlasnik može ažurirati
CREATE POLICY "Korisnici mogu ažurirati svoj living profile"
ON living_profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Samo vlasnik može brisati
CREATE POLICY "Korisnici mogu brisati svoj living profile"
ON living_profiles FOR DELETE
USING (auth.uid() = user_id);

-- ============================================
-- 8. STORAGE BUCKET POLICIES
-- ============================================
-- Ove politike se postavljaju u Supabase Dashboard:
-- Storage → memorial-media → Policies

-- SELECT (Download): Svi mogu preuzimati fajlove
-- INSERT (Upload): Samo autentifikovani korisnici
-- UPDATE: Samo vlasnik fajla
-- DELETE: Samo vlasnik fajla

-- Primer SQL za storage (pokreni u SQL Editor):
/*
CREATE POLICY "Javni pristup za čitanje"
ON storage.objects FOR SELECT
USING (bucket_id = 'memorial-media');

CREATE POLICY "Autentifikovani korisnici mogu uploadovati"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'memorial-media'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Korisnici mogu brisati svoje fajlove"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'memorial-media'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
*/

-- ============================================
-- NAPOMENA
-- ============================================
-- Nakon pokretanja ovog SQL-a, testiraj:
-- 1. Da li neautentifikovani korisnici mogu videti javne memorijale
-- 2. Da li korisnici mogu videti SAMO svoje privatne memorijale
-- 3. Da li korisnici mogu menjati SAMO svoje podatke
-- 4. Da li komentari prolaze kroz moderaciju
--
-- Za admin funkcionalnosti u budućnosti:
-- - Dodati `is_admin` kolonu u auth.users metadata
-- - Kreirati posebne admin politike
-- ============================================
