import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Uslovi korišćenja - Pravila platforme"
        description="Uslovi korišćenja Memorial platforme. Pravila za kreiranje memorijala, objavljivanje sadržaja, prava i obaveze korisnika."
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sand to-ivory py-12 lg:py-16 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="text-sky hover:text-sky-dark text-sm mb-4 inline-block">
            ← Nazad na početnu
          </Link>
          <h1 className="font-serif text-3xl lg:text-4xl font-medium text-text-primary mb-4">
            Uslovi korišćenja
          </h1>
          <p className="text-text-secondary">
            Poslednja izmena: 15. januar 2025.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
        <div className="prose prose-lg max-w-none">
          {/* Uvod */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">1. Uvod</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Dobrodošli na Memorial. Korišćenjem naše platforme pristajete
              na ove Uslove korišćenja. Molimo vas da ih pažljivo pročitate pre nego što
              počnete da koristite naše usluge.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Memorial je digitalna usluga koja omogućava kreiranje i
              održavanje online memorijala, objavljivanje umrlica, i povezivanje sa
              partnerima u oblasti pogrebnih usluga.
            </p>
          </section>

          {/* Definicije */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">2. Definicije</h2>
            <ul className="space-y-2 text-text-secondary">
              <li><strong>"Platforma"</strong> — Memorial i sve povezane usluge</li>
              <li><strong>"Korisnik"</strong> — svaka osoba koja koristi Platformu</li>
              <li><strong>"Memorijal"</strong> — digitalna stranica posvećena preminuloj osobi</li>
              <li><strong>"Sadržaj"</strong> — tekst, fotografije, video snimci i drugi materijali</li>
              <li><strong>"Partner"</strong> — pogrebna preduzeća, groblja i kamenorezačke radnje</li>
            </ul>
          </section>

          {/* Kreiranje naloga */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">3. Kreiranje naloga</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Za korišćenje određenih funkcija Platforme potrebno je kreiranje korisničkog naloga.
              Prilikom registracije, pristajete na sledeće:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>Da ćete pružiti tačne i potpune informacije</li>
              <li>Da ćete održavati sigurnost svoje lozinke</li>
              <li>Da ste stariji od 16 godina ili imate saglasnost roditelja</li>
              <li>Da prihvatate odgovornost za sve aktivnosti na vašem nalogu</li>
            </ul>
          </section>

          {/* Kreiranje memorijala */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">4. Kreiranje memorijala</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Kreiranjem memorijala potvrđujete da:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>Imate pravo da kreirate memorijal za datu osobu (član porodice, prijatelj, ili ovlašćeno lice)</li>
              <li>Podaci koje unosite su tačni po vašem najboljem znanju</li>
              <li>Imate pravo da delite fotografije i druge materijale</li>
              <li>Ne kreirate memorijal u zlonamerne svrhe</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              Zadržavamo pravo da uklonimo memorijale koji krše ove uslove ili koji su
              prijavljeni od strane porodice preminule osobe.
            </p>
          </section>

          {/* Pravila sadržaja */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">5. Pravila sadržaja</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Sav sadržaj koji postavljate na Platformu mora biti u skladu sa sledećim pravilima:
            </p>
            <div className="card p-6 bg-rose/5 border border-rose/20 my-6">
              <h3 className="font-semibold text-text-primary mb-3">Zabranjeno je:</h3>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li>Postavljanje lažnih informacija</li>
                <li>Uvredljiv, diskriminatorski ili govor mržnje</li>
                <li>Sadržaj koji krši autorska prava</li>
                <li>Reklamiranje proizvoda ili usluga van konteksta memorijala</li>
                <li>Pornografski ili seksualno eksplicitan sadržaj</li>
                <li>Sadržaj koji podstiče nasilje ili nezakonite aktivnosti</li>
                <li>Spam ili automatizovano postavljanje sadržaja</li>
              </ul>
            </div>
            <p className="text-text-secondary leading-relaxed">
              Komentari i posvete podležu moderaciji. Zadržavamo pravo da uklonimo
              sadržaj koji smatramo neprikladnim, bez prethodne najave.
            </p>
          </section>

          {/* Virtuelni pokloni */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">6. Virtuelni pokloni i plaćanja</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Platforma omogućava kupovinu virtuelnih poklona (sveća, cveće, venci).
              Sva plaćanja se obrađuju putem sigurnog sistema (Stripe).
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>Cene su jasno naznačene pre kupovine</li>
              <li>Plaćanja su konačna i ne podležu povraćaju novca</li>
              <li>Virtuelni pokloni nemaju fizičku vrednost</li>
              <li>Prihodi od poklona pomažu održavanju Platforme</li>
            </ul>
          </section>

          {/* Umrlice */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">7. Objavljivanje umrlica</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Objavljivanje umrlica je usluga koja se naplaćuje. Cena i trajanje objave
              su jasno naznačeni pre potvrde narudžbine.
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>Informacije u umrlici moraju biti tačne</li>
              <li>Podaci o sahrani moraju odgovarati stvarnosti</li>
              <li>Umrlica se može izmeniti u roku od 24 sata od objave</li>
              <li>Ne snosimo odgovornost za netačne podatke koje korisnik unese</li>
            </ul>
          </section>

          {/* Intelektualna svojina */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">8. Intelektualna svojina</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Sav sadržaj koji postavljate na Platformu ostaje vaše vlasništvo.
              Međutim, postavljanjem sadržaja nam dajete licencu da:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>Prikazujemo sadržaj na Platformi</li>
              <li>Čuvamo sadržaj na našim serverima</li>
              <li>Prilagodimo sadržaj za različite uređaje (veličina slika, itd.)</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              Logo, dizajn i kod Memorial platforme su zaštićeni autorskim pravima.
            </p>
          </section>

          {/* Privatnost */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">9. Privatnost</h2>
            <p className="text-text-secondary leading-relaxed">
              Vaša privatnost nam je važna. Način na koji prikupljamo, koristimo i
              štitimo vaše podatke opisan je u našoj{' '}
              <Link to="/privatnost" className="text-sky hover:text-sky-dark">
                Politici privatnosti
              </Link>.
            </p>
          </section>

          {/* Ograničenje odgovornosti */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">10. Ograničenje odgovornosti</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Platforma se pruža "kako jeste" i "kako je dostupna". Ne garantujemo:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>Neprekidan pristup Platformi</li>
              <li>Odsustvo tehničkih grešaka</li>
              <li>Tačnost sadržaja koji postavljaju korisnici</li>
              <li>Kompatibilnost sa svim uređajima i pregledačima</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              Nismo odgovorni za bilo kakvu štetu nastalu korišćenjem Platforme,
              osim u slučajevima predviđenim zakonom.
            </p>
          </section>

          {/* Raskid */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">11. Raskid i suspenzija</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Možete zatvoriti svoj nalog u bilo kom trenutku. Mi možemo suspendovati
              ili zatvoriti vaš nalog ako:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>Prekršite ove Uslove korišćenja</li>
              <li>Postavljate zabranjeni sadržaj</li>
              <li>Koristite Platformu u nezakonite svrhe</li>
              <li>Zloupotrebljavate funkcije Platforme</li>
            </ul>
          </section>

          {/* Izmene */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">12. Izmene uslova</h2>
            <p className="text-text-secondary leading-relaxed">
              Zadržavamo pravo da izmenimo ove Uslove korišćenja. O značajnim izmenama
              ćemo vas obavestiti putem email-a ili obaveštenja na Platformi. Nastavak
              korišćenja Platforme nakon izmena predstavlja prihvatanje novih uslova.
            </p>
          </section>

          {/* Merodavno pravo */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">13. Merodavno pravo</h2>
            <p className="text-text-secondary leading-relaxed">
              Ovi Uslovi korišćenja su regulisani zakonima Republike Srbije.
              Za sve sporove nadležan je sud u Beogradu, Republika Srbija.
            </p>
          </section>

          {/* Kontakt */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">14. Kontakt</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Za sva pitanja u vezi sa ovim Uslovima korišćenja, kontaktirajte nas:
            </p>
            <div className="card p-6 bg-sand-light">
              <ul className="space-y-2 text-text-secondary">
                <li><strong>Email:</strong> info@memorijalna-platforma.rs</li>
                <li><strong>Adresa:</strong> Beograd, Srbija</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Linkovi */}
        <div className="mt-12 pt-8 border-t border-border-light flex flex-wrap gap-4 text-sm">
          <Link to="/privatnost" className="text-sky hover:text-sky-dark">
            Politika privatnosti
          </Link>
          <Link to="/kontakt" className="text-sky hover:text-sky-dark">
            Kontakt
          </Link>
          <Link to="/faq" className="text-sky hover:text-sky-dark">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  )
}
