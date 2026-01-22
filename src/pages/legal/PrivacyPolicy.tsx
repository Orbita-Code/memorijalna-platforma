import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Politika privatnosti - Zaštita vaših podataka"
        description="Politika privatnosti Memorial platforme. Saznajte kako prikupljamo, koristimo i štitimo vaše lične podatke u skladu sa GDPR regulativom."
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sand to-ivory py-12 lg:py-16 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="text-sky hover:text-sky-dark text-sm mb-4 inline-block">
            ← Nazad na početnu
          </Link>
          <h1 className="font-serif text-3xl lg:text-4xl font-medium text-text-primary mb-4">
            Politika privatnosti
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
              Memorial posvećena je zaštiti vaše privatnosti. Ova politika
              objašnjava koje podatke prikupljamo, kako ih koristimo i koja prava imate
              u vezi sa vašim ličnim podacima.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Korišćenjem naše Platforme, pristajete na prikupljanje i obradu podataka
              kako je opisano u ovoj politici.
            </p>
          </section>

          {/* Ko smo mi */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">2. Ko smo mi</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Rukovalac podacima je:
            </p>
            <div className="card p-6 bg-sand-light">
              <p className="text-text-secondary">
                <strong>Memorial</strong><br />
                Beograd, Srbija<br />
                Email: privatnost@memorijalna-platforma.rs
              </p>
            </div>
          </section>

          {/* Koje podatke prikupljamo */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">3. Koje podatke prikupljamo</h2>

            <h3 className="font-semibold text-text-primary mt-6 mb-3">3.1 Podaci koje vi pružate</h3>
            <ul className="space-y-2 text-text-secondary">
              <li><strong>Podaci za registraciju:</strong> email adresa, lozinka, ime (opciono)</li>
              <li><strong>Podaci o memorijalu:</strong> ime preminule osobe, datumi rođenja i smrti, biografija, fotografije, video snimci</li>
              <li><strong>Komentari i posvete:</strong> tekst koji pišete na memorijalima</li>
              <li><strong>Podaci za plaćanje:</strong> obrađuju se putem Stripe-a, mi ne čuvamo podatke o kartici</li>
              <li><strong>Komunikacija:</strong> poruke koje nam šaljete putem kontakt forme</li>
            </ul>

            <h3 className="font-semibold text-text-primary mt-6 mb-3">3.2 Automatski prikupljeni podaci</h3>
            <ul className="space-y-2 text-text-secondary">
              <li><strong>Podaci o uređaju:</strong> tip uređaja, operativni sistem, verzija pregledača</li>
              <li><strong>Podaci o korišćenju:</strong> stranice koje posetite, vreme provedeno na sajtu</li>
              <li><strong>IP adresa:</strong> za sigurnosne svrhe i sprečavanje zloupotrebe</li>
            </ul>
          </section>

          {/* Zašto koristimo podatke */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">4. Zašto koristimo vaše podatke</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Vaše podatke koristimo za sledeće svrhe:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-text-secondary">
                <thead>
                  <tr className="border-b border-border-light">
                    <th className="text-left py-3 pr-4 font-semibold text-text-primary">Svrha</th>
                    <th className="text-left py-3 font-semibold text-text-primary">Pravni osnov</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  <tr>
                    <td className="py-3 pr-4">Pružanje usluge (kreiranje memorijala)</td>
                    <td className="py-3">Izvršenje ugovora</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Obrada plaćanja</td>
                    <td className="py-3">Izvršenje ugovora</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Slanje obaveštenja o vašem nalogu</td>
                    <td className="py-3">Izvršenje ugovora</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Sigurnost i sprečavanje prevare</td>
                    <td className="py-3">Legitimni interes</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Poboljšanje usluge</td>
                    <td className="py-3">Legitimni interes</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Marketing (uz vašu saglasnost)</td>
                    <td className="py-3">Pristanak</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Deljenje podataka */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">5. Deljenje podataka</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Vaše podatke ne prodajemo niti iznajmljujemo. Delimo ih samo sa:
            </p>
            <ul className="space-y-3 text-text-secondary">
              <li>
                <strong>Supabase</strong> — hosting i baza podataka (serveri u EU)
              </li>
              <li>
                <strong>Stripe</strong> — obrada plaćanja (PCI DSS sertifikovan)
              </li>
              <li>
                <strong>Državni organi</strong> — samo ako to zakon nalaže
              </li>
            </ul>
          </section>

          {/* Kolačići */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">6. Kolačići (Cookies)</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Koristimo minimalan broj kolačića, isključivo za funkcionisanje sajta:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-text-secondary">
                <thead>
                  <tr className="border-b border-border-light">
                    <th className="text-left py-3 pr-4 font-semibold text-text-primary">Kolačić</th>
                    <th className="text-left py-3 pr-4 font-semibold text-text-primary">Svrha</th>
                    <th className="text-left py-3 font-semibold text-text-primary">Trajanje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  <tr>
                    <td className="py-3 pr-4">sb-*-auth-token</td>
                    <td className="py-3 pr-4">Autentifikacija korisnika</td>
                    <td className="py-3">Sesija</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">language</td>
                    <td className="py-3 pr-4">Izbor jezika</td>
                    <td className="py-3">1 godina</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-text-secondary leading-relaxed mt-4">
              Ne koristimo kolačiće za praćenje ili reklamiranje.
            </p>
          </section>

          {/* Čuvanje podataka */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">7. Čuvanje podataka</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Vaše podatke čuvamo dok god je vaš nalog aktivan. Specifično:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li><strong>Podaci naloga:</strong> dok ne zatvorite nalog</li>
              <li><strong>Memorijali:</strong> trajno (jer je to svrha platforme)</li>
              <li><strong>Podaci o plaćanju:</strong> 10 godina (zakonska obaveza)</li>
              <li><strong>Logovi:</strong> 90 dana</li>
            </ul>
          </section>

          {/* Vaša prava */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">8. Vaša prava</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              U skladu sa GDPR regulativom, imate sledeća prava:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="card p-4">
                <h3 className="font-semibold text-text-primary mb-2">Pristup podacima</h3>
                <p className="text-text-secondary text-sm">
                  Možete zatražiti kopiju svih podataka koje imamo o vama.
                </p>
              </div>
              <div className="card p-4">
                <h3 className="font-semibold text-text-primary mb-2">Ispravka</h3>
                <p className="text-text-secondary text-sm">
                  Možete zatražiti ispravku netačnih podataka.
                </p>
              </div>
              <div className="card p-4">
                <h3 className="font-semibold text-text-primary mb-2">Brisanje</h3>
                <p className="text-text-secondary text-sm">
                  Možete zatražiti brisanje vaših podataka ("pravo na zaborav").
                </p>
              </div>
              <div className="card p-4">
                <h3 className="font-semibold text-text-primary mb-2">Prenosivost</h3>
                <p className="text-text-secondary text-sm">
                  Možete zatražiti da vam pošaljemo podatke u mašinski čitljivom formatu.
                </p>
              </div>
              <div className="card p-4">
                <h3 className="font-semibold text-text-primary mb-2">Prigovor</h3>
                <p className="text-text-secondary text-sm">
                  Možete uložiti prigovor na obradu podataka zasnovanu na legitimnom interesu.
                </p>
              </div>
              <div className="card p-4">
                <h3 className="font-semibold text-text-primary mb-2">Povlačenje pristanka</h3>
                <p className="text-text-secondary text-sm">
                  Ako ste dali pristanak, možete ga povući u bilo kom trenutku.
                </p>
              </div>
            </div>
            <p className="text-text-secondary leading-relaxed mt-6">
              Za ostvarivanje ovih prava, kontaktirajte nas na:{' '}
              <a href="mailto:privatnost@memorijalna-platforma.rs" className="text-sky hover:text-sky-dark">
                privatnost@memorijalna-platforma.rs
              </a>
            </p>
          </section>

          {/* Sigurnost */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">9. Sigurnost podataka</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Primenjujemo tehničke i organizacione mere zaštite:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>SSL/TLS enkripcija za sve komunikacije</li>
              <li>Enkripcija podataka u mirovanju</li>
              <li>Redovne sigurnosne provere</li>
              <li>Ograničen pristup podacima (need-to-know princip)</li>
              <li>Serveri u EU sa strogim sigurnosnim standardima</li>
            </ul>
          </section>

          {/* Međunarodni transfer */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">10. Međunarodni transfer podataka</h2>
            <p className="text-text-secondary leading-relaxed">
              Vaši podaci se primarno čuvaju na serverima u Evropskoj uniji.
              Neki naši dobavljači (npr. Stripe za plaćanja) mogu prenositi podatke
              u SAD, ali samo uz odgovarajuće garantije (Standardne ugovorne klauzule).
            </p>
          </section>

          {/* Deca */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">11. Deca</h2>
            <p className="text-text-secondary leading-relaxed">
              Naša platforma nije namenjena deci mlađoj od 16 godina. Ne prikupljamo
              svesno podatke od dece. Ako saznamo da smo prikupili podatke od deteta
              bez saglasnosti roditelja, izbrisaćemo ih.
            </p>
          </section>

          {/* Izmene */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">12. Izmene ove politike</h2>
            <p className="text-text-secondary leading-relaxed">
              Ovu politiku možemo ažurirati. O značajnim promenama ćemo vas obavestiti
              putem email-a ili obaveštenja na platformi najmanje 30 dana unapred.
              Datum poslednje izmene je naveden na vrhu ove stranice.
            </p>
          </section>

          {/* Pritužbe */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">13. Pritužbe</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Ako smatrate da smo prekršili vaša prava u vezi sa zaštitom podataka,
              možete uložiti pritužbu nadležnom organu:
            </p>
            <div className="card p-6 bg-sand-light">
              <p className="text-text-secondary">
                <strong>Poverenik za informacije od javnog značaja i zaštitu podataka o ličnosti</strong><br />
                Bulevar kralja Aleksandra 15, Beograd<br />
                <a href="https://www.poverenik.rs" className="text-sky hover:text-sky-dark">
                  www.poverenik.rs
                </a>
              </p>
            </div>
          </section>

          {/* Kontakt */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">14. Kontakt za pitanja o privatnosti</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Za sva pitanja u vezi sa zaštitom vaših podataka:
            </p>
            <div className="card p-6 bg-sand-light">
              <ul className="space-y-2 text-text-secondary">
                <li><strong>Email:</strong> privatnost@memorijalna-platforma.rs</li>
                <li><strong>Vreme odgovora:</strong> do 30 dana</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Linkovi */}
        <div className="mt-12 pt-8 border-t border-border-light flex flex-wrap gap-4 text-sm">
          <Link to="/uslovi-koriscenja" className="text-sky hover:text-sky-dark">
            Uslovi korišćenja
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
