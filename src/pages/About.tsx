import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import {
  HeartIcon,
  GlobeIcon,
  ShieldIcon,
  LockIcon,
  MemorialIcon,
  CandleIcon
} from '../components/icons/FeatureIcons'
import { EternalFlame } from '../components/icons/ReligiousSymbols'

export default function About() {
  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="O nama - Digitalni memorijali za čuvanje uspomena"
        description="Memorial je vodeći servis za kreiranje digitalnih memorijala u Srbiji i regionu. Sačuvajte uspomene na voljene osobe zauvek - besplatno i dostupno svima."
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sand to-ivory py-16 lg:py-24 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-sky-light flex items-center justify-center mx-auto mb-8">
            <EternalFlame size={40} className="text-sky-dark" />
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-medium text-text-primary mb-6">
            O Memorial platformi
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Verujemo da svaki život zaslužuje da bude upamćen. Naša misija je da pomognemo
            porodicama da sačuvaju uspomene na voljene osobe kroz digitalne memorijale
            koji će trajati zauvek.
          </p>
        </div>
      </section>

      {/* Naša priča */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="heading-1 text-center mb-12">Naša priča</h2>

          <div className="prose prose-lg max-w-none text-text-secondary">
            <p className="text-lg leading-relaxed mb-6">
              Memorial nastala je iz jednostavne, ali duboke potrebe — potrebe da
              sačuvamo sećanja na one koje volimo, čak i kada više nisu sa nama. U digitalnom
              dobu, kada su naše fotografije, priče i uspomene raspršene po različitim uređajima
              i platformama, shvatili smo da postoji praznina — mesto gde bi sve to moglo da
              živi zajedno, zauvek.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Kao što porodice vekovima čuvaju fotografije u albumima i priče prenose s generacije
              na generaciju, mi smo stvorili digitalni prostor koji objedinjuje sve te uspomene.
              Prostor koji je dostupan porodici širom sveta, u bilo koje vreme, sa bilo kog uređaja.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Naša platforma je više od web stranice — to je digitalni spomenik, knjiga sećanja,
              i mesto gde porodica i prijatelji mogu da se okupe i podele svoje uspomene, bez
              obzira na geografske granice.
            </p>
          </div>
        </div>
      </section>

      {/* Zašto digitalni memorijal */}
      <section className="py-16 lg:py-24 bg-sand-light">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="heading-1 text-center mb-4">Zašto digitalni memorijal?</h2>
          <p className="text-text-secondary text-center text-lg mb-12 max-w-3xl mx-auto">
            U modernom svetu, digitalni memorijali nude prednosti koje tradicionalni
            spomenici ne mogu da pruže.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8">
              <div className="w-14 h-14 rounded-full bg-sky-light flex items-center justify-center mb-6">
                <GlobeIcon size={28} className="text-sky-dark" />
              </div>
              <h3 className="heading-3 mb-4">Dostupnost svuda u svetu</h3>
              <p className="text-text-secondary">
                Porodica i prijatelji mogu posetiti memorijal iz bilo kog dela sveta.
                Nema potrebe za putovanjem do groblja — digitalni memorijal je uvek
                na dohvat ruke, 24 sata dnevno, 365 dana u godini.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center mb-6">
                <CandleIcon size={28} className="text-sage" />
              </div>
              <h3 className="heading-3 mb-4">Trajno čuvanje uspomena</h3>
              <p className="text-text-secondary">
                Za razliku od fizičkih fotografija koje blede i albuma koji se gube,
                digitalni memorijal čuva sve uspomene na sigurnom mestu. Slike, video
                snimci, priče — sve ostaje sačuvano za buduće generacije.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-14 h-14 rounded-full bg-rose-light flex items-center justify-center mb-6">
                <HeartIcon size={28} className="text-rose" />
              </div>
              <h3 className="heading-3 mb-4">Zajedničko sećanje</h3>
              <p className="text-text-secondary">
                Članovi porodice i prijatelji mogu dodavati svoje uspomene, fotografije
                i priče. Memorijal postaje živa knjiga sećanja koju svi zajedno grade
                i čuvaju.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-14 h-14 rounded-full bg-sky-light flex items-center justify-center mb-6">
                <LockIcon size={28} className="text-sky-dark" />
              </div>
              <h3 className="heading-3 mb-4">Kontrola privatnosti</h3>
              <p className="text-text-secondary">
                Vi odlučujete ko može da vidi memorijal i ko može da dodaje sadržaj.
                Javni ili privatni — izbor je vaš. Zaštitite uspomene na način koji
                odgovara vašoj porodici.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center mb-6">
                <ShieldIcon size={28} className="text-sage" />
              </div>
              <h3 className="heading-3 mb-4">Sve veroispovesti</h3>
              <p className="text-text-secondary">
                Podržavamo simbole svih velikih svetskih religija — pravoslavlje,
                katoličanstvo, islam, judaizam, budizam. Svaki memorijal može da
                odražava verske tradicije vaše porodice.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-14 h-14 rounded-full bg-rose-light flex items-center justify-center mb-6">
                <MemorialIcon size={28} className="text-rose" />
              </div>
              <h3 className="heading-3 mb-4">Besplatno kreiranje</h3>
              <p className="text-text-secondary">
                Osnovni memorijal je potpuno besplatan. Verujemo da svako zaslužuje
                mesto za sećanje, bez obzira na finansijsku situaciju. Napredne opcije
                su dostupne za one koji žele više.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Naše vrednosti */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="heading-1 text-center mb-12">Naše vrednosti</h2>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-sky-light flex items-center justify-center flex-shrink-0">
                <span className="text-sky-dark font-semibold">1</span>
              </div>
              <div>
                <h3 className="heading-3 mb-2">Dostojanstvo i poštovanje</h3>
                <p className="text-text-secondary">
                  Svaki memorijal tretiramo sa najvećim poštovanjem. Razumemo da iza
                  svakog profila stoji porodica koja žali i želi da sačuva uspomenu na
                  voljenu osobu. To nikada ne zaboravljamo.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                <span className="text-sage font-semibold">2</span>
              </div>
              <div>
                <h3 className="heading-3 mb-2">Pristupačnost svima</h3>
                <p className="text-text-secondary">
                  Verujemo da mogućnost da sačuvamo sećanja ne sme da zavisi od
                  finansijske situacije. Zato nudimo besplatne memorijale i trudimo se
                  da platforma bude jednostavna za korišćenje svim generacijama.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-rose-light flex items-center justify-center flex-shrink-0">
                <span className="text-rose font-semibold">3</span>
              </div>
              <div>
                <h3 className="heading-3 mb-2">Sigurnost i privatnost</h3>
                <p className="text-text-secondary">
                  Vaši podaci i uspomene su nam sveti. Koristimo najsavremenije mere
                  zaštite i nikada ne delimo vaše podatke sa trećim stranama. Vi imate
                  potpunu kontrolu nad svojim memorijalima.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-sky-light flex items-center justify-center flex-shrink-0">
                <span className="text-sky-dark font-semibold">4</span>
              </div>
              <div>
                <h3 className="heading-3 mb-2">Trajnost</h3>
                <p className="text-text-secondary">
                  Memorijali koje kreirate ostaju zauvek. Obavezujemo se da čuvamo
                  vaše uspomene i podatke za sve buduće generacije. Ovo nije privremeno
                  rešenje — ovo je trajno nasleđe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistika */}
      <section className="py-16 bg-sky">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl lg:text-5xl font-serif font-semibold mb-2">11</div>
              <div className="text-white/80">Podržanih jezika</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-serif font-semibold mb-2">6+</div>
              <div className="text-white/80">Religija</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-serif font-semibold mb-2">∞</div>
              <div className="text-white/80">Trajno čuvanje</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-serif font-semibold mb-2">24/7</div>
              <div className="text-white/80">Uvek dostupno</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="heading-1 mb-6">Spremni da sačuvate uspomene?</h2>
          <p className="text-text-secondary text-lg mb-8">
            Kreirajte besplatan digitalni memorijal za vašu voljenu osobu.
            Proces traje samo nekoliko minuta, a uspomene ostaju zauvek.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kreiraj-memorijal" className="btn-primary text-lg px-8 py-4">
              Kreiraj memorijal
            </Link>
            <Link to="/kako-funkcionise" className="btn-secondary text-lg px-8 py-4">
              Saznaj više
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
