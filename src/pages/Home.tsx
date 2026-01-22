import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getRecentMemorials } from '../lib/memorials'
import type { Memorial } from '../types/memorial'
import MemorialCard from '../components/MemorialCard'
import SEO, { SEO_CONFIGS } from '../components/SEO'
import {
  HeartIcon,
  LockIcon,
  GlobeIcon,
  ShieldIcon,
  SearchIcon,
  FuneralHomeIcon,
  CemeteryIcon,
  StoneMasonIcon,
} from '../components/icons/FeatureIcons'
import { EternalFlame } from '../components/icons/ReligiousSymbols'

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [recentMemorials, setRecentMemorials] = useState<Memorial[]>([])
  const [loading, setLoading] = useState(true)

  // Search state
  const [searchName, setSearchName] = useState('')
  const [searchCity, setSearchCity] = useState('')
  const [searchYear, setSearchYear] = useState('')

  useEffect(() => {
    loadRecentMemorials()
  }, [])

  const loadRecentMemorials = async () => {
    const { data } = await getRecentMemorials(6)
    if (data) {
      setRecentMemorials(data)
    }
    setLoading(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchName) params.set('search', searchName)
    if (searchCity) params.set('death_place', searchCity)
    if (searchYear) params.set('year_of_death', searchYear)
    navigate(`/memorijali?${params.toString()}`)
  }

  return (
    <div className="bg-ivory">
      <SEO {...SEO_CONFIGS.home} />

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sand via-sand-light to-ivory" />

        <div className="relative max-w-5xl mx-auto px-4 py-10 sm:py-12 lg:py-16">
          <div className="text-center">
            {/* Main heading */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-text-primary leading-tight mb-4">
              Mesto za trajno sećanje
              <br />
              <span className="text-sky-dark">na one koje volimo</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-6 leading-relaxed">
              Digitalni memorijali koji čuvaju uspomene, priče i ljubav — zauvek.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to={user ? '/kreiraj-memorijal' : '/registracija'}
                className="btn-primary text-lg px-8 py-4"
              >
                Kreiraj memorijal
              </Link>
              <Link
                to="/tvoja-prica"
                className="bg-sage hover:bg-sage-dark text-white text-lg px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Tvoja priča
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-sky-dark mb-1">11</div>
                <div className="text-sm text-text-secondary">Jezika</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-sky-dark mb-1">∞</div>
                <div className="text-sm text-text-secondary">Trajno čuvanje</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-sky-dark mb-1">0 €</div>
                <div className="text-sm text-text-secondary">Kreiranje</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SEARCH SECTION
          ============================================ */}
      <section className="py-12 bg-white border-y border-border-light">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="heading-2 mb-2">Pronađite memorijal</h2>
            <p className="text-text-secondary">Pretražite po imenu, mestu ili godini</p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="searchName" className="sr-only">Ime i prezime</label>
              <input
                id="searchName"
                type="text"
                placeholder="Ime i prezime"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="input"
              />
            </div>
            <div className="md:w-48">
              <label htmlFor="searchCity" className="sr-only">Grad / država</label>
              <input
                id="searchCity"
                type="text"
                placeholder="Grad / država"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="input"
              />
            </div>
            <div className="md:w-32">
              <label htmlFor="searchYear" className="sr-only">Godina</label>
              <input
                id="searchYear"
                type="number"
                placeholder="Godina"
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
                min="1900"
                max={new Date().getFullYear()}
                className="input"
              />
            </div>
            <button type="submit" className="btn-primary flex items-center justify-center gap-2">
              <SearchIcon size={18} />
              Pretraži
            </button>
          </form>
        </div>
      </section>

      {/* ============================================
          WHY DIGITAL MEMORIAL
          ============================================ */}
      <section className="py-16 lg:py-24 bg-sand-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Zašto digitalni memorijal?</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Online memorijal pruža trajno mesto sećanja dostupno svima, bilo gde u svetu.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="card card-hover p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-sky-light flex items-center justify-center mx-auto mb-4">
                <EternalFlame size={24} className="text-sky-dark" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Trajno sećanje</h3>
              <p className="text-text-secondary text-sm">
                Virtuelni spomenik koji nikada ne bledi i uvek je dostupan.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card card-hover p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-4">
                <GlobeIcon size={24} className="text-sage" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Dostupno svima</h3>
              <p className="text-text-secondary text-sm">
                Porodica širom sveta može posetiti memorijal u bilo koje vreme.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card card-hover p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-rose-light flex items-center justify-center mx-auto mb-4">
                <LockIcon size={24} className="text-rose" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Privatnost i kontrola</h3>
              <p className="text-text-secondary text-sm">
                Vi odlučujete ko može videti i dodavati sadržaj na memorijal.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card card-hover p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-sand flex items-center justify-center mx-auto mb-4">
                <ShieldIcon size={24} className="text-text-secondary" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Sve veroispovesti</h3>
              <p className="text-text-secondary text-sm">
                Podržavamo simbole svih velikih svetskih religija.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TVOJA PRIČA - TEASER
          ============================================ */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-sage-light/20 via-ivory to-sky-light/20" />

        <div className="relative max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-sage-dark font-medium text-sm uppercase tracking-wide mb-3">
              Dok si tu — ti odlučuješ
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-6">
              Ko će ispričati tvoju priču?
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Ako je ne napišeš ti — napisaće je neko drugi.
              <br className="hidden sm:block" />
              Sa najboljim namerama. Ali sa svojim rečima.
            </p>
          </div>

          {/* Two columns - problem vs solution */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Problem side */}
            <div className="card p-6 bg-rose-light/30 border-rose/20">
              <h3 className="font-semibold text-text-primary mb-4">Kada drugi pišu za tebe:</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-rose-dark mt-1">×</span>
                  <span>Biraju fotografije koje možda ne bi izabrao/la</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-dark mt-1">×</span>
                  <span>Pogađaju šta si mislio/mislila</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-dark mt-1">×</span>
                  <span>Zaboravljaju ono što je tebi bilo važno</span>
                </li>
              </ul>
            </div>

            {/* Solution side */}
            <div className="card p-6 bg-sage-light/30 border-sage/20">
              <h3 className="font-semibold text-text-primary mb-4">Kada ti pišeš svoju priču:</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-sage-dark mt-1">✓</span>
                  <span>Ti biraš reči, slike i ton</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage-dark mt-1">✓</span>
                  <span>Možeš ostaviti poruke voljenima</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage-dark mt-1">✓</span>
                  <span>Čak i one male tajne koje će ih nasmejati</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Humor hook */}
          <div className="card p-6 md:p-8 bg-white/80 backdrop-blur mb-10">
            <p className="text-text-secondary text-center mb-4">
              Zamisli da tvoji jednog dana pročitaju:
            </p>
            <div className="max-w-lg mx-auto space-y-3 text-center">
              <p className="text-text-primary italic">„Nije bila mačka. Ja sam razbila šolju."</p>
              <p className="text-text-primary italic">„Onaj tvoj džemper što je 'nestao'? I dalje je u mom ormaru."</p>
            </div>
            <p className="text-text-muted text-sm text-center mt-4">
              Male istine. Veliki osmesi. Tvoje reči.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <LockIcon size={18} className="text-sage-dark" />
              <span>Ništa nije javno dok si živ/a</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldIcon size={18} className="text-sage-dark" />
              <span>Šifrovano i zaštićeno</span>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/tvoja-prica"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              Saznaj više o Tvojoj Priči
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-text-muted text-sm mt-4">
              Pametna odluka. Ne emotivna.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          DONATIONS SECTION
          ============================================ */}
      <section className="py-16 lg:py-24 bg-sand-light">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-rose-light flex items-center justify-center mx-auto mb-6">
              <HeartIcon size={32} className="text-rose" />
            </div>
            <h2 className="heading-1 mb-4">U znak sećanja — donacija</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Umesto cveća i venaca, posetioci memorijala mogu uplatiti donaciju.
              Porodica bira jednu ili obe opcije.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Pomoć porodici */}
            <div className="card p-6 md:p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-sky-light flex items-center justify-center mx-auto mb-4">
                <HeartIcon size={28} className="text-sky-dark" />
              </div>
              <h3 className="heading-3 mb-3">Pomozite porodici</h3>
              <p className="text-text-secondary mb-4">
                Direktna finansijska pomoć porodici za troškove sahrane,
                medicinske račune ili svakodnevne potrebe.
              </p>
              <div className="text-sm text-text-muted bg-sand-light rounded-lg p-3">
                Svako uplati koliko želi. Novac ide direktno na račun porodice.
              </div>
            </div>

            {/* Humanitarna organizacija */}
            <div className="card p-6 md:p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-4">
                <GlobeIcon size={28} className="text-sage-dark" />
              </div>
              <h3 className="heading-3 mb-3">Donirajte humanitarnoj organizaciji</h3>
              <p className="text-text-secondary mb-4">
                U ime pokojnika, posetioci mogu donirati organizaciji
                koja je bila bliska srcu preminulog.
              </p>
              <div className="text-sm text-text-muted bg-sand-light rounded-lg p-3">
                Porodica bira organizaciju — Crveni krst, bolnica, azil, fondacija...
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to={user ? '/kreiraj-memorijal' : '/registracija'}
              className="btn-primary text-lg px-8 py-4"
            >
              Kreirajte memorijal sa donacijama
            </Link>
            <p className="text-text-muted text-sm mt-4">
              Opcije donacija se podešavaju prilikom kreiranja memorijala
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          PARTNERS TEASER
          ============================================ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Naši partneri</h2>
            <p className="text-text-secondary">
              Saradnja sa profesionalcima u vašoj blizini
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <Link
              to="/pogrebna-preduzeca"
              className="card card-hover p-8 text-center group"
            >
              <FuneralHomeIcon size={40} className="text-text-secondary mx-auto mb-4 group-hover:text-sky-dark transition-colors" />
              <h3 className="font-semibold text-text-primary mb-2">Pogrebna preduzeća</h3>
              <p className="text-text-secondary text-sm mb-4">
                Pronađite pouzdane pogrebne usluge
              </p>
              <span className="text-sky-dark font-medium text-sm">
                Saznaj više →
              </span>
            </Link>

            <Link
              to="/kamenorezacke-radnje"
              className="card card-hover p-8 text-center group"
            >
              <StoneMasonIcon size={40} className="text-text-secondary mx-auto mb-4 group-hover:text-sky-dark transition-colors" />
              <h3 className="font-semibold text-text-primary mb-2">Kamenorezačke radnje</h3>
              <p className="text-text-secondary text-sm mb-4">
                Nadgrobni spomenici i usluge
              </p>
              <span className="text-sky-dark font-medium text-sm">
                Saznaj više →
              </span>
            </Link>

            <Link
              to="/groblja"
              className="card card-hover p-8 text-center group"
            >
              <CemeteryIcon size={40} className="text-text-secondary mx-auto mb-4 group-hover:text-sky-dark transition-colors" />
              <h3 className="font-semibold text-text-primary mb-2">Groblja</h3>
              <p className="text-text-secondary text-sm mb-4">
                Informacije o grobljima u vašoj blizini
              </p>
              <span className="text-sky-dark font-medium text-sm">
                Saznaj više →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          RECENT MEMORIALS
          ============================================ */}
      {recentMemorials.length > 0 && (
        <section className="py-16 lg:py-24 bg-sand-light">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div>
                <h2 className="heading-1 mb-2">Nedavni memorijali</h2>
                <p className="text-text-secondary">Sećanja koja ostaju zauvek</p>
              </div>
              <Link
                to="/memorijali"
                className="btn-secondary"
              >
                Pogledaj sve
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-sky border-t-transparent"></div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentMemorials.map(memorial => (
                  <MemorialCard key={memorial.id} memorial={memorial} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className="py-16 lg:py-24 bg-sky">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white mb-6">
            Započnite danas
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Kreirajte dostojanstven memorijal za vaše voljene i sačuvajte uspomene zauvek.
          </p>
          <Link
            to={user ? '/kreiraj-memorijal' : '/registracija'}
            className="inline-flex items-center justify-center bg-white text-sky-dark px-8 py-4 rounded-lg font-semibold hover:bg-ivory transition-colors shadow-large"
          >
            {user ? 'Kreiraj memorijal' : 'Besplatna registracija'}
          </Link>
        </div>
      </section>

      {/* ============================================
          STATS BAR
          ============================================ */}
      <section className="py-12 bg-white border-t border-border-light">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-serif font-semibold text-sky-dark mb-1">11</div>
              <div className="text-text-secondary text-sm">Podržanih jezika</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-serif font-semibold text-sky-dark mb-1">∞</div>
              <div className="text-text-secondary text-sm">Trajno čuvanje</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-serif font-semibold text-sky-dark mb-1">24/7</div>
              <div className="text-text-secondary text-sm">Uvek dostupno</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
