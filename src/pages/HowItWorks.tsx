import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import {
  MemorialIcon,
  QuillIcon,
  CameraIcon,
  CommentsIcon,
  FlowerIcon,
  ShareIcon,
  LockIcon,
  HeartIcon,
  CheckIcon
} from '../components/icons/FeatureIcons'
import { EternalFlame } from '../components/icons/ReligiousSymbols'

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Kako funkcioniše - Kreiranje digitalnog memorijala"
        description="Saznajte kako da kreirate digitalni memorijal u samo nekoliko koraka. Besplatno kreiranje, dodavanje fotografija, video zapisa i pozivanje porodice da ostavi uspomene."
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sand to-ivory py-16 lg:py-24 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-medium text-text-primary mb-6">
            Kako funkcioniše Memorial
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Kreiranje digitalnog memorijala je jednostavno i besplatno. Pratite ove korake
            da biste sačuvali uspomene na vašu voljenu osobu zauvek.
          </p>
        </div>
      </section>

      {/* Koraci */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="heading-1 text-center mb-16">Kreiranje memorijala u 5 koraka</h2>

          {/* Korak 1 */}
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <div className="w-16 h-16 rounded-full bg-sky-light flex items-center justify-center mb-4">
                  <span className="text-sky-dark font-serif text-2xl font-semibold">1</span>
                </div>
                <h3 className="heading-2 mb-2">Registracija</h3>
                <p className="text-text-muted text-sm">Potrebno vreme: 1 minut</p>
              </div>
            </div>
            <div className="md:w-2/3 card p-8">
              <div className="flex items-center gap-4 mb-6">
                <MemorialIcon size={32} className="text-sky-dark" />
                <h4 className="font-semibold text-lg">Kreirajte besplatan nalog</h4>
              </div>
              <p className="text-text-secondary mb-6">
                Registracija je potpuno besplatna i traje manje od minute. Potrebna je samo
                vaša email adresa i lozinka. Nakon registracije, možete odmah početi sa
                kreiranjem memorijala.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Besplatna registracija — bez skrivenih troškova</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Bez obaveze — obrišite nalog kad god želite</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Sigurna prijava — vaši podaci su zaštićeni</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Korak 2 */}
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <div className="w-16 h-16 rounded-full bg-sage-light flex items-center justify-center mb-4">
                  <span className="text-sage font-serif text-2xl font-semibold">2</span>
                </div>
                <h3 className="heading-2 mb-2">Osnovni podaci</h3>
                <p className="text-text-muted text-sm">Potrebno vreme: 2-3 minuta</p>
              </div>
            </div>
            <div className="md:w-2/3 card p-8">
              <div className="flex items-center gap-4 mb-6">
                <QuillIcon size={32} className="text-sage" />
                <h4 className="font-semibold text-lg">Unesite informacije o osobi</h4>
              </div>
              <p className="text-text-secondary mb-6">
                Unesite osnovne podatke o preminuloj osobi: ime i prezime, datum rođenja i
                smrti, mesto rođenja i smrti. Ove informacije pomažu da memorijal bude
                prepoznatljiv i lako pretraživ.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Ime, prezime i nadimak (opciono)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Datumi rođenja i smrti</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Mesta rođenja i smrti</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Izbor verskog simbola</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Korak 3 */}
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <div className="w-16 h-16 rounded-full bg-rose-light flex items-center justify-center mb-4">
                  <span className="text-rose font-serif text-2xl font-semibold">3</span>
                </div>
                <h3 className="heading-2 mb-2">Fotografije i video</h3>
                <p className="text-text-muted text-sm">Potrebno vreme: 5-10 minuta</p>
              </div>
            </div>
            <div className="md:w-2/3 card p-8">
              <div className="flex items-center gap-4 mb-6">
                <CameraIcon size={32} className="text-rose" />
                <h4 className="font-semibold text-lg">Dodajte uspomene u slikama</h4>
              </div>
              <p className="text-text-secondary mb-6">
                Otpremite fotografije i video snimke koji najbolje prikazuju život i osobnost
                preminule osobe. Možete dodati neograničen broj slika — od detinjstva do
                poslednjih dana.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Profilna fotografija — glavna slika memorijala</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Naslovna fotografija — pozadina profila</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Galerija fotografija — neograničen broj slika</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Video snimci — do 100MB po fajlu</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Korak 4 */}
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <div className="w-16 h-16 rounded-full bg-sky-light flex items-center justify-center mb-4">
                  <span className="text-sky-dark font-serif text-2xl font-semibold">4</span>
                </div>
                <h3 className="heading-2 mb-2">Biografija</h3>
                <p className="text-text-muted text-sm">Potrebno vreme: 10-20 minuta</p>
              </div>
            </div>
            <div className="md:w-2/3 card p-8">
              <div className="flex items-center gap-4 mb-6">
                <QuillIcon size={32} className="text-sky-dark" />
                <h4 className="font-semibold text-lg">Ispričajte njihovu priču</h4>
              </div>
              <p className="text-text-secondary mb-6">
                Napišite biografiju koja će sačuvati sećanje na život preminule osobe.
                Ne morate biti profesionalni pisac — najvažnije je da biografija bude
                iskrena i da odražava ko je ta osoba bila.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Detinjstvo i odrastanje</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Karijera i dostignuća</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Porodica i prijatelji</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Hobiji, interesovanja i omiljene stvari</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Korak 5 */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <div className="w-16 h-16 rounded-full bg-sage-light flex items-center justify-center mb-4">
                  <span className="text-sage font-serif text-2xl font-semibold">5</span>
                </div>
                <h3 className="heading-2 mb-2">Podelite</h3>
                <p className="text-text-muted text-sm">Potrebno vreme: 1 minut</p>
              </div>
            </div>
            <div className="md:w-2/3 card p-8">
              <div className="flex items-center gap-4 mb-6">
                <ShareIcon size={32} className="text-sage" />
                <h4 className="font-semibold text-lg">Pozovite porodicu i prijatelje</h4>
              </div>
              <p className="text-text-secondary mb-6">
                Kada završite memorijal, podelite ga sa porodicom i prijateljima. Oni mogu
                da posete memorijal, ostave posvetu, zapale virtuelnu sveću ili pošalju
                virtualne cveće i vence.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Delite link preko email-a, SMS-a ili društvenih mreža</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Posetioci mogu ostaviti posvete i komentare</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">Virtuelne sveće, cveće i venci</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">QR kod za nadgrobni spomenik (uskoro)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dodatne mogućnosti */}
      <section className="py-16 lg:py-24 bg-sand-light">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="heading-1 text-center mb-4">Šta još možete uraditi</h2>
          <p className="text-text-secondary text-center text-lg mb-12 max-w-3xl mx-auto">
            Pored osnovnog memorijala, platforma nudi dodatne mogućnosti za čuvanje uspomena.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6">
              <CommentsIcon size={32} className="text-sky-dark mb-4" />
              <h3 className="heading-3 mb-3">Knjiga sećanja</h3>
              <p className="text-text-secondary text-sm">
                Posetioci mogu ostaviti svoje uspomene i priče. Svaki komentar se moderira
                pre objavljivanja kako bi se očuvalo dostojanstvo memorijala.
              </p>
            </div>

            <div className="card p-6">
              <FlowerIcon size={32} className="text-rose mb-4" />
              <h3 className="heading-3 mb-3">Virtuelni pokloni</h3>
              <p className="text-text-secondary text-sm">
                Pošaljite virtuelnu sveću, cveće ili venac. Simbolični gest koji pokazuje
                da mislite na preminulu osobu i njenu porodicu.
              </p>
            </div>

            <div className="card p-6">
              <HeartIcon size={32} className="text-rose mb-4" />
              <h3 className="heading-3 mb-3">Donacije</h3>
              <p className="text-text-secondary text-sm">
                Omogućite posetiocima da umesto cveća doniraju humanitarnim organizacijama
                u ime pokojnika. Pretvorite tugu u pozitivnu promenu.
              </p>
            </div>

            <div className="card p-6">
              <LockIcon size={32} className="text-sky-dark mb-4" />
              <h3 className="heading-3 mb-3">Privatni memorijali</h3>
              <p className="text-text-secondary text-sm">
                Učinite memorijal privatnim — vidljiv samo onima sa kojima podelite link.
                Potpuna kontrola nad tim ko može da vidi uspomene.
              </p>
            </div>

            <div className="card p-6">
              <EternalFlame size={32} className="text-rose mb-4" />
              <h3 className="heading-3 mb-3">Living profil</h3>
              <p className="text-text-secondary text-sm">
                Pripremite memorijal dok ste još živi. Napišite svoju priču, izaberite
                fotografije i ostavite poruke voljenima za budućnost.
              </p>
            </div>

            <div className="card p-6">
              <ShareIcon size={32} className="text-sage mb-4" />
              <h3 className="heading-3 mb-3">Čitulje</h3>
              <p className="text-text-secondary text-sm">
                Objavite čitulju sa detaljima o sahrani. Informacije o vremenu, mestu
                i načinu kako izraziti saučešće.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="heading-1 mb-6">Spremni da započnete?</h2>
          <p className="text-text-secondary text-lg mb-8">
            Kreiranje memorijala je besplatno i traje samo nekoliko minuta.
            Vaše uspomene zaslužuju trajno mesto na internetu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registracija" className="btn-primary text-lg px-8 py-4">
              Registruj se besplatno
            </Link>
            <Link to="/memorijali" className="btn-secondary text-lg px-8 py-4">
              Pogledaj memorijale
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
