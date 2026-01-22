import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { ChevronDownIcon } from '../components/icons/FeatureIcons'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  // Opšta pitanja
  {
    category: 'Opšta pitanja',
    question: 'Šta je digitalni memorijal?',
    answer: 'Digitalni memorijal je online stranica posvećena uspomeni na preminulu osobu. Sadrži fotografije, biografiju, video zapise i knjige sećanja gde porodica i prijatelji mogu ostaviti svoje uspomene. Za razliku od fizičkog spomenika, digitalni memorijal je dostupan svuda u svetu, 24 sata dnevno, i može sadržati neograničen broj fotografija i priča.'
  },
  {
    category: 'Opšta pitanja',
    question: 'Da li je kreiranje memorijala besplatno?',
    answer: 'Da, osnovni memorijal je potpuno besplatan. Možete kreirati memorijal, dodati fotografije, napisati biografiju i pozvati porodicu da ostavi uspomene — sve bez ikakvog plaćanja. Nudimo i napredne opcije za one koji žele dodatne mogućnosti, ali osnovne funkcije su i uvek će biti besplatne.'
  },
  {
    category: 'Opšta pitanja',
    question: 'Koliko dugo će memorijal postojati?',
    answer: 'Memorijali koje kreirate ostaju zauvek. Mi se obavezujemo da čuvamo vaše uspomene i podatke trajno. Razumemo koliko je važno da sećanja na voljene osobe budu sačuvana za buduće generacije, zato je trajnost jedan od naših osnovnih principa.'
  },
  {
    category: 'Opšta pitanja',
    question: 'Ko može da vidi memorijal?',
    answer: 'Vi odlučujete o privatnosti memorijala. Možete ga učiniti javnim (vidljivim svima), ili privatnim (vidljivim samo onima sa kojima podelite link). Takođe možete kontrolisati ko može da ostavlja komentare i posvete.'
  },

  // Kreiranje memorijala
  {
    category: 'Kreiranje memorijala',
    question: 'Kako da kreiram memorijal?',
    answer: 'Kreiranje memorijala je jednostavno: 1) Registrujte se besplatno sa email adresom, 2) Kliknite na "Kreiraj memorijal", 3) Unesite osnovne podatke o osobi, 4) Dodajte fotografije i biografiju, 5) Podelite memorijal sa porodicom i prijateljima. Ceo proces traje 15-20 minuta.'
  },
  {
    category: 'Kreiranje memorijala',
    question: 'Mogu li da izmenim memorijal nakon kreiranja?',
    answer: 'Da, možete izmeniti memorijal u bilo kom trenutku. Dodajte nove fotografije, ažurirajte biografiju, promenite podešavanja privatnosti — sve je pod vašom kontrolom. Samo se prijavite i kliknite na "Izmeni" na stranici memorijala.'
  },
  {
    category: 'Kreiranje memorijala',
    question: 'Koliko fotografija mogu da dodam?',
    answer: 'Nema ograničenja na broj fotografija! Možete dodati koliko god želite slika — od detinjstva do poslednjih dana. Svaka fotografija može imati opis i datum. Podržani formati su JPEG, PNG i WebP, do 10MB po fotografiji.'
  },
  {
    category: 'Kreiranje memorijala',
    question: 'Mogu li da dodam video snimke?',
    answer: 'Da, možete dodati video snimke do 100MB po fajlu. Podržani su MP4, WebM i QuickTime formati. Video snimci su odličan način da sačuvate glas i pokrete voljene osobe.'
  },

  // Komentari i interakcija
  {
    category: 'Komentari i interakcija',
    question: 'Ko može da ostavlja komentare?',
    answer: 'Svi posetioci mogu ostaviti komentare i posvete, ali svaki komentar prolazi kroz moderaciju pre objavljivanja. Vi kao vlasnik memorijala pregledate i odobravate komentare, tako da imate potpunu kontrolu nad sadržajem.'
  },
  {
    category: 'Komentari i interakcija',
    question: 'Šta su virtuelni pokloni?',
    answer: 'Virtuelni pokloni su simbolični gestovi — sveće, cveće, venci — koje posetioci mogu poslati memorijalu. To je način da izraze saučešće i pokažu da misle na preminulu osobu i njenu porodicu. Svaki poklon se prikazuje na memorijalu.'
  },
  {
    category: 'Komentari i interakcija',
    question: 'Mogu li da omogućim donacije umesto cveća?',
    answer: 'Da, možete omogućiti opciju doniranja humanitarnim organizacijama u ime pokojnika. Sve više porodica bira ovu opciju — umesto venaca i cveća koji uvenu, prijatelji i rodbina doniraju organizacijama koje su bile bliske srcu preminule osobe.'
  },

  // Privatnost i sigurnost
  {
    category: 'Privatnost i sigurnost',
    question: 'Da li su moji podaci sigurni?',
    answer: 'Da, koristimo najsavremenije mere zaštite podataka. Svi podaci su enkriptovani, a serveri su zaštićeni prema industrijskim standardima. Nikada ne delimo vaše podatke sa trećim stranama bez vašeg pristanka.'
  },
  {
    category: 'Privatnost i sigurnost',
    question: 'Mogu li da obrišem memorijal?',
    answer: 'Da, možete obrisati memorijal u bilo kom trenutku. Svi podaci, fotografije i komentari će biti trajno uklonjeni. Ova akcija se ne može poništiti, zato dobro razmislite pre brisanja.'
  },
  {
    category: 'Privatnost i sigurnost',
    question: 'Ko može da izmeni moj memorijal?',
    answer: 'Samo vi kao vlasnik memorijala imate pravo da ga izmenite. Drugi posetioci mogu samo da ostavljaju komentare i šalju poklone, ali ne mogu menjati sadržaj memorijala.'
  },

  // Living profil
  {
    category: 'Living profil',
    question: 'Šta je Living profil?',
    answer: 'Living profil je memorijal koji kreirate dok ste još živi. Možete napisati svoju biografiju, izabrati fotografije i ostaviti poruke voljenima. Nakon vašeg odlaska, porodica može aktivirati profil i pretvoriti ga u memorijal. To je način da sami ispričate svoju priču.'
  },
  {
    category: 'Living profil',
    question: 'Kako funkcioniše aktivacija Living profila?',
    answer: 'Kada kreirate Living profil, dobijate tajni kod koji predajete osobi od poverenja. Kada dođe vreme, ta osoba koristi kod da aktivira profil. Profil se tada pretvara u memorijal koji je vidljiv javnosti ili po vašim podešavanjima privatnosti.'
  },

  // Čitulje
  {
    category: 'Čitulje',
    question: 'Šta je čitulja i kako je objaviti?',
    answer: 'Čitulja (umrlica) je javna objava o smrti sa informacijama o sahrani. Možete objaviti čitulju sa datumom i vremenom sahrane, mestom održavanja, i načinima kako izraziti saučešće. Čitulja može biti povezana sa memorijalnom.'
  },
  {
    category: 'Čitulje',
    question: 'Da li se čitulja plaća?',
    answer: 'Objavljivanje čitulje košta simboličnu naknadu koja pokriva troškove održavanja platforme. Tačna cena zavisi od trajanja objave i dodatnih opcija. Osnovne čitulje su pristupačne svima.'
  },

  // Partneri
  {
    category: 'Partneri',
    question: 'Kako mogu da registrujem svoje pogrebno preduzeće?',
    answer: 'Ako imate pogrebno preduzeće, kamenorezačku radnju ili upravljate grobljem, možete se registrovati kao partner. Posetite stranicu "Postanite partner" i popunite prijavu. Vaše preduzeće će biti vidljivo porodicama koje traže usluge u vašem gradu.'
  },
  {
    category: 'Partneri',
    question: 'Koliko košta oglašavanje za partnere?',
    answer: 'Nudimo različite pakete oglašavanja — od osnovnog listinga do premium pozicija. Cene su pristupačne i prilagođene veličini preduzeća. Kontaktirajte nas za detaljnu ponudu prilagođenu vašim potrebama.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('Sva pitanja')

  const categories = ['Sva pitanja', ...new Set(faqData.map(item => item.category))]

  const filteredFAQ = activeCategory === 'Sva pitanja'
    ? faqData
    : faqData.filter(item => item.category === activeCategory)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Često postavljana pitanja - FAQ"
        description="Pronađite odgovore na najčešća pitanja o digitalnim memorijalima. Kako kreirati memorijal, koliko košta, ko može da vidi, i još mnogo toga."
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sand to-ivory py-16 lg:py-20 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-medium text-text-primary mb-6">
            Često postavljana pitanja
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Pronađite odgovore na najčešća pitanja o Memorial platformi.
            Ako ne pronađete odgovor, slobodno nas kontaktirajte.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Kategorije */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category)
                setOpenIndex(null)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-sky text-white'
                  : 'bg-sand-light text-text-secondary hover:bg-sand'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Lista */}
        <div className="space-y-4">
          {filteredFAQ.map((item, index) => (
            <div
              key={index}
              className="card overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-sand-light/50 transition-colors"
              >
                <span className="font-semibold text-text-primary pr-4">
                  {item.question}
                </span>
                <ChevronDownIcon
                  size={20}
                  className={`text-text-muted flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 pt-0">
                  <div className="border-t border-border-light pt-4">
                    <p className="text-text-secondary leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 card p-8 text-center bg-sand-light">
          <h2 className="heading-2 mb-4">Niste pronašli odgovor?</h2>
          <p className="text-text-secondary mb-6">
            Naš tim za podršku je tu da vam pomogne. Pišite nam i odgovorićemo
            u najkraćem mogućem roku.
          </p>
          <Link to="/kontakt" className="btn-primary">
            Kontaktirajte nas
          </Link>
        </div>
      </div>
    </div>
  )
}
