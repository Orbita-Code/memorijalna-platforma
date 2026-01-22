import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function AdvertisingTerms() {
  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Uslovi oglašavanja | Memorial"
        description="Uslovi i pravila za oglašavanje partnera na Memorial platformi."
      />

      {/* Header */}
      <div className="bg-gradient-to-b from-sand to-ivory py-12 border-b border-border-light">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="heading-1 mb-2">Uslovi oglašavanja</h1>
          <p className="text-text-secondary">
            Poslednja izmena: {new Date().toLocaleDateString('sr-Latn-RS', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">

          {/* Intro */}
          <div className="bg-rose-light/30 border border-rose/30 rounded-lg p-6 mb-8">
            <p className="text-rose-dark font-medium mb-0">
              <strong>VAŽNO:</strong> Pažljivo pročitajte ove uslove pre registracije kao partner.
              Podnošenjem prijave za oglašavanje, potvrđujete da ste pročitali, razumeli i prihvatili
              sve uslove navedene u ovom dokumentu.
            </p>
          </div>

          {/* 1. Opšte odredbe */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">1. Opšte odredbe</h2>

            <p className="text-text-secondary mb-4">
              1.1. Memorial (u daljem tekstu: "Platforma", "mi", "nas") pruža uslugu
              online oglašavanja za poslovne subjekte iz oblasti pogrebnih usluga i srodnih delatnosti
              (u daljem tekstu: "Partner", "Oglašivač").
            </p>

            <p className="text-text-secondary mb-4">
              1.2. Platforma je <strong>isključivo posrednik</strong> koji omogućava vidljivost Partnera
              korisnicima Platforme. Platforma <strong>NE PRUŽA</strong> pogrebne usluge, izradu spomenika,
              štampu QR kodova, niti bilo koje druge usluge koje Partneri nude.
            </p>

            <p className="text-text-secondary mb-4">
              1.3. Platforma <strong>NE VRŠI PROVERU</strong> pravnog statusa, registracije, licenci,
              kvalifikacija, niti kvaliteta usluga Partnera. Svaki Partner je samostalno odgovoran za
              tačnost podataka koje objavljuje.
            </p>
          </section>

          {/* 2. Odricanje odgovornosti */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">2. Odricanje odgovornosti</h2>

            <div className="bg-sand-light border border-border-light rounded-lg p-6 mb-4">
              <p className="text-text-primary font-semibold mb-2">
                PLATFORMA SE U POTPUNOSTI ODRIČE ODGOVORNOSTI ZA:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-0">
                <li>Kvalitet, tačnost, potpunost ili zakonitost usluga koje Partneri pružaju</li>
                <li>Bilo kakvu štetu (materijalnu, nematerijalnu, direktnu ili indirektnu) nastalu korišćenjem usluga Partnera</li>
                <li>Netačne, nepotpune ili zastarele informacije koje Partner objavi</li>
                <li>Kašnjenja, propuste ili greške u pružanju usluga od strane Partnera</li>
                <li>Sporove između korisnika i Partnera</li>
                <li>Kršenje zakona ili propisa od strane Partnera</li>
                <li>Gubitak prihoda, poslovne prilike ili reputacije Partnera</li>
                <li>Tehničke probleme, prekide u radu Platforme ili gubitak podataka</li>
              </ul>
            </div>

            <p className="text-text-secondary mb-4">
              2.1. Korisnici Platforme koriste usluge Partnera <strong>isključivo na sopstvenu odgovornost</strong>.
              Pre angažovanja bilo kog Partnera, korisnicima se preporučuje da samostalno provere
              registraciju, reference i kvalifikacije Partnera.
            </p>

            <p className="text-text-secondary mb-4">
              2.2. Platforma ne garantuje dostupnost, kontinuitet rada, niti bilo kakve rezultate
              od oglašavanja. Oglašavanje na Platformi ne garantuje Partneru određeni broj kontakata,
              klijenata ili prihoda.
            </p>
          </section>

          {/* 3. Obaveze partnera */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">3. Obaveze Partnera</h2>

            <p className="text-text-secondary mb-4">
              3.1. Partner garantuje i potvrđuje da:
            </p>

            <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
              <li>Je pravno registrovan za obavljanje delatnosti koju oglašava</li>
              <li>Poseduje sve potrebne dozvole, licence i sertifikate za svoju delatnost</li>
              <li>Svi podaci navedeni u prijavi su tačni, potpuni i ažurni</li>
              <li>Ima pravo da koristi sve slike, logotipe i materijale koje objavljuje</li>
              <li>Neće objavljivati lažne, obmanjujuće ili nezakonite sadržaje</li>
              <li>Će poštovati sve važeće zakone Republike Srbije</li>
            </ul>

            <p className="text-text-secondary mb-4">
              3.2. Partner je dužan da <strong>odmah obavesti</strong> Platformu o bilo kakvim promenama
              u podacima (adresa, telefon, radno vreme, prestanak rada, itd.).
            </p>

            <p className="text-text-secondary mb-4">
              3.3. Partner se obavezuje da neće:
            </p>

            <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
              <li>Koristiti Platformu za bilo kakve nezakonite aktivnosti</li>
              <li>Objavljivati sadržaje koji su uvredljivi, diskriminatorski ili štetni</li>
              <li>Lažno se predstavljati ili davati netačne informacije</li>
              <li>Ometati rad Platforme ili drugih Partnera</li>
              <li>Prikupljati podatke drugih korisnika bez dozvole</li>
            </ul>
          </section>

          {/* 4. Plaćanje i refundacija */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">4. Plaćanje i politika povraćaja</h2>

            <div className="bg-rose-light/30 border border-rose/30 rounded-lg p-6 mb-4">
              <p className="text-rose-dark font-semibold mb-0">
                SVE UPLATE ZA OGLAŠAVANJE SU KONAČNE I NEPOVRATNE.
              </p>
            </div>

            <p className="text-text-secondary mb-4">
              4.1. Naknada za oglašavanje plaća se unapred, pre aktivacije oglasa.
            </p>

            <p className="text-text-secondary mb-4">
              4.2. <strong>Povraćaj sredstava NIJE moguć</strong> ni u jednom od sledećih slučajeva:
            </p>

            <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
              <li>Partner se predomislio nakon plaćanja</li>
              <li>Partner nije zadovoljan rezultatima oglašavanja</li>
              <li>Partner je prestao sa radom</li>
              <li>Oglas je uklonjen zbog kršenja uslova</li>
              <li>Partner nije ažurirao svoje podatke</li>
              <li>Iz bilo kog drugog razloga</li>
            </ul>

            <p className="text-text-secondary mb-4">
              4.3. Izuzetno, Platforma može razmotriti delimični povraćaj isključivo u slučaju
              dokazane tehničke greške na strani Platforme koja je onemogućila prikazivanje oglasa
              u dužem vremenskom periodu.
            </p>
          </section>

          {/* 5. Prava platforme */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">5. Prava Platforme</h2>

            <p className="text-text-secondary mb-4">
              5.1. Platforma zadržava pravo da <strong>bez prethodne najave i bez obrazloženja</strong>:
            </p>

            <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
              <li>Odbije prijavu za oglašavanje</li>
              <li>Ukloni ili suspenduje bilo koji oglas</li>
              <li>Izmeni sadržaj oglasa radi usklađivanja sa standardima Platforme</li>
              <li>Promeni poziciju, vidljivost ili način prikazivanja oglasa</li>
              <li>Prekine saradnju sa Partnerom</li>
              <li>Izmeni cene i uslove oglašavanja za buduće periode</li>
            </ul>

            <p className="text-text-secondary mb-4">
              5.2. U slučaju uklanjanja oglasa zbog kršenja ovih uslova, Partner
              <strong> NEMA pravo na povraćaj sredstava</strong>.
            </p>

            <p className="text-text-secondary mb-4">
              5.3. Platforma može u bilo kom trenutku izmeniti ove uslove. Nastavak korišćenja
              usluga nakon izmene smatra se prihvatanjem novih uslova.
            </p>
          </section>

          {/* 6. Obeštećenje */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">6. Obeštećenje (Indemnifikacija)</h2>

            <p className="text-text-secondary mb-4">
              6.1. Partner se obavezuje da će <strong>obeštetiti, braniti i osloboditi od odgovornosti</strong>
              Platformu, njene vlasnike, zaposlene, partnere i saradnike od svih:
            </p>

            <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
              <li>Potraživanja, tužbi i pravnih postupaka</li>
              <li>Gubitaka, šteta i troškova (uključujući advokatske troškove)</li>
              <li>Kazni, penala i naknada</li>
            </ul>

            <p className="text-text-secondary mb-4">
              koji proizilaze iz ili su povezani sa:
            </p>

            <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
              <li>Poslovanjem Partnera</li>
              <li>Uslugama koje Partner pruža</li>
              <li>Kršenjem ovih uslova od strane Partnera</li>
              <li>Kršenjem zakona ili prava trećih lica od strane Partnera</li>
              <li>Netačnim ili obmanjujućim informacijama koje je Partner objavio</li>
            </ul>
          </section>

          {/* 7. Intelektualna svojina */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">7. Intelektualna svojina</h2>

            <p className="text-text-secondary mb-4">
              7.1. Partner zadržava sva prava na svoje logotipe, slike i materijale koje objavljuje.
            </p>

            <p className="text-text-secondary mb-4">
              7.2. Objavljivanjem sadržaja na Platformi, Partner daje Platformi neekskluzivnu,
              besplatnu licencu za korišćenje tog sadržaja u svrhu prikazivanja oglasa i
              promocije Platforme.
            </p>

            <p className="text-text-secondary mb-4">
              7.3. Partner garantuje da ima sva prava na sadržaje koje objavljuje i da ti sadržaji
              ne krše prava intelektualne svojine trećih lica.
            </p>
          </section>

          {/* 8. Privatnost podataka */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">8. Privatnost i zaštita podataka</h2>

            <p className="text-text-secondary mb-4">
              8.1. Podaci koje Partner dostavi biće javno vidljivi na Platformi (naziv, adresa,
              telefon, email, radno vreme, opis usluga).
            </p>

            <p className="text-text-secondary mb-4">
              8.2. Platforma može koristiti kontakt podatke Partnera za slanje obaveštenja
              vezanih za oglašavanje.
            </p>

            <p className="text-text-secondary mb-4">
              8.3. Platforma neće prodavati niti deliti podatke Partnera sa trećim licima
              u marketinške svrhe bez saglasnosti.
            </p>
          </section>

          {/* 9. Ograničenje odgovornosti */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">9. Ograničenje odgovornosti</h2>

            <div className="bg-sand-light border border-border-light rounded-lg p-6 mb-4">
              <p className="text-text-primary mb-4">
                U MAKSIMALNOJ MERI DOZVOLJENOJ ZAKONOM:
              </p>
              <p className="text-text-secondary mb-4">
                Ukupna odgovornost Platforme prema Partneru, bez obzira na osnov (ugovor,
                delikti, nemar ili drugo), ograničena je na iznos koji je Partner platio
                za oglašavanje u poslednjih 12 meseci.
              </p>
              <p className="text-text-secondary mb-0">
                Platforma ni u kom slučaju neće biti odgovorna za indirektne, posledične,
                specijalne ili kaznene štete, gubitak profita, gubitak podataka ili
                prekid poslovanja.
              </p>
            </div>
          </section>

          {/* 10. Rešavanje sporova */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">10. Rešavanje sporova</h2>

            <p className="text-text-secondary mb-4">
              10.1. Na ove uslove primenjuje se pravo Republike Srbije.
            </p>

            <p className="text-text-secondary mb-4">
              10.2. Svi sporovi koji nastanu iz ili u vezi sa ovim uslovima rešavaće se
              pred nadležnim sudom u Beogradu, Republika Srbija.
            </p>

            <p className="text-text-secondary mb-4">
              10.3. Pre pokretanja sudskog postupka, strane će pokušati da spor reše
              mirnim putem u roku od 30 dana.
            </p>
          </section>

          {/* 11. Završne odredbe */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">11. Završne odredbe</h2>

            <p className="text-text-secondary mb-4">
              11.1. Ako se bilo koja odredba ovih uslova proglasi nevažećom, ostale
              odredbe ostaju na snazi.
            </p>

            <p className="text-text-secondary mb-4">
              11.2. Nepostupanje Platforme po bilo kojoj odredbi ovih uslova ne predstavlja
              odricanje od prava na buduće postupanje.
            </p>

            <p className="text-text-secondary mb-4">
              11.3. Ovi uslovi predstavljaju celokupan sporazum između Partnera i Platforme
              u vezi sa oglašavanjem.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="heading-2 mb-4">12. Kontakt</h2>

            <p className="text-text-secondary mb-4">
              Za sva pitanja u vezi sa oglašavanjem, možete nas kontaktirati putem emaila
              na adresu koja je navedena na stranici <Link to="/kontakt" className="text-sky hover:text-sky-dark underline">Kontakt</Link>.
            </p>
          </section>

          {/* Agreement confirmation */}
          <div className="bg-sky-light/30 border border-sky/30 rounded-lg p-6 mt-8">
            <p className="text-text-primary mb-4">
              <strong>Podnošenjem prijave za oglašavanje potvrđujete:</strong>
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-0">
              <li>Da ste pročitali i razumeli sve gore navedene uslove</li>
              <li>Da se u potpunosti slažete sa svim odredbama</li>
              <li>Da ste ovlašćeni da prihvatite ove uslove u ime vašeg poslovnog subjekta</li>
              <li>Da razumete da su uplate nepovratne</li>
              <li>Da razumete da Platforma ne snosi odgovornost za vaše poslovanje</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              to="/postani-partner"
              className="btn-primary inline-flex items-center gap-2"
            >
              Prijavi se kao partner
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
