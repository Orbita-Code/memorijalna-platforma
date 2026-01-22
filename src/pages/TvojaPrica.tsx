import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useAuth } from '../contexts/AuthContext'
import {
  ShieldIcon,
  DocumentIcon,
  PhotoIcon
} from '../components/icons/FeatureIcons'

// Custom icons for this page
const PenIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
)

const MailIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 6L2 7" />
  </svg>
)

const SmileIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
)

const LockIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const UsersIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

export default function TvojaPrica() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Tvoja Priča - Živi Memorijal"
        description="Napravi svoj memorijal dok si živ/živa. Ti odlučuješ kako želiš da te pamte. Potpuna privatnost, sigurnost i kontrola nad tvojim digitalnim nasleđem."
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-sage-light/30 to-ivory py-16 md:py-24 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary mb-6">
            Tvoja Priča
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Pametno je razmišljati o budućnosti.<br />
            <span className="text-sage-dark font-medium">Još pametnije je ništa ne prepustiti slučaju.</span>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">

        {/* Intro Section */}
        <section className="mb-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Ne praviš ovo jer misliš da će se nešto desiti sutra.
              Praviš ovo jer si odgovorna, zrela osoba koja razmišlja unapred.
            </p>

            <p className="text-text-secondary text-lg mb-4">Kao što:</p>
            <ul className="text-text-secondary space-y-2 mb-6">
              <li>planiraš život</li>
              <li>čuvaš važna dokumenta</li>
              <li>praviš rezerve</li>
              <li>razmišljaš šta ostavljaš iza sebe</li>
            </ul>

            <p className="text-text-secondary text-lg leading-relaxed">
              Tako i ovde.
            </p>

            <div className="bg-sage-light/30 border-l-4 border-sage rounded-r-lg p-6 my-8">
              <p className="text-text-primary text-xl font-serif italic mb-0">
                Niko te ne poznaje bolje od tebe samog/same.<br />
                Zato je logično da ti napišeš svoju priču.
              </p>
            </div>
          </div>
        </section>

        {/* What is Tvoja Priča */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Šta je „Tvoja Priča"?</h2>

          <div className="card p-6 md:p-8">
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              „Tvoja Priča" je <strong>living memorial</strong> – lični memorijal koji praviš sam/sama, dok si živ/živa.
            </p>

            <p className="text-text-secondary text-lg mb-4">To je mesto gde:</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-sage-dark mt-1">●</span>
                <span className="text-text-secondary"><strong>ti odlučuješ</strong> kako želiš da te pamte</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-dark mt-1">●</span>
                <span className="text-text-secondary"><strong>ti biraš</strong> reči, slike i poruke</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-dark mt-1">●</span>
                <span className="text-text-secondary"><strong>ništa nije javno</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-dark mt-1">●</span>
                <span className="text-text-secondary"><strong>ništa se ne objavljuje odmah</strong></span>
              </li>
            </ul>

            <div className="bg-sky-light/30 border border-sky/30 rounded-lg p-4">
              <p className="text-text-primary mb-0">
                Sve što kreiraš ostaje sigurno sačuvano i postaje dostupno <strong>isključivo nakon zvanične potvrde smrti</strong>, tačno onako kako si ti odredio/odredila.
              </p>
            </div>
          </div>
        </section>

        {/* Why Now */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Zašto sada?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6 bg-sage-light/20">
              <h3 className="font-semibold text-text-primary mb-4">Zato što je sada:</h3>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="text-sage-dark">✓</span> sveže
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sage-dark">✓</span> jasno
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sage-dark">✓</span> pod tvojom kontrolom
                </li>
              </ul>
            </div>

            <div className="card p-6 bg-rose-light/20">
              <h3 className="font-semibold text-text-primary mb-4">Kasnije će neko drugi:</h3>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="text-rose-dark">×</span> birati reči umesto tebe
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-dark">×</span> tumačiti te
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-dark">×</span> pogađati šta si mislio/mislila
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-text-secondary text-lg mt-8">
            Ovo nije emotivna odluka.<br />
            <strong className="text-text-primary">Ovo je pametna odluka.</strong>
          </p>
        </section>

        {/* What happens with content */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Šta se dešava sa tvojim sadržajem?</h2>

          <div className="card p-6 md:p-8">
            <p className="text-text-secondary text-lg mb-6">Jasno i jednostavno:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-sand-light rounded-lg">
                <LockIcon size={24} className="text-sage-dark flex-shrink-0" />
                <span className="text-text-secondary">Ništa nije javno</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-sand-light rounded-lg">
                <ShieldIcon size={24} className="text-sage-dark flex-shrink-0" />
                <span className="text-text-secondary">Ništa se ne vidi dok si živ/živa</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-sand-light rounded-lg">
                <LockIcon size={24} className="text-sage-dark flex-shrink-0" />
                <span className="text-text-secondary">Sve je zaštićeno i zaključano</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-sand-light rounded-lg">
                <ShieldIcon size={24} className="text-sage-dark flex-shrink-0" />
                <span className="text-text-secondary">Aktivira se tek nakon potvrde smrti</span>
              </div>
            </div>

            <p className="text-text-secondary mb-4">
              Objavljuje se i šalje samo ono što si ti izričito odobrio/odobrila:
            </p>
            <ul className="text-text-secondary space-y-1">
              <li>● tvoj memorijal</li>
              <li>● tvoje poruke</li>
              <li>● tvoji dokumenti</li>
              <li>● tvoje želje</li>
            </ul>
          </div>
        </section>

        {/* What you can create */}
        <section className="mb-16">
          <h2 className="heading-2 mb-8">Šta možeš da kreiraš?</h2>

          <div className="space-y-6">
            {/* Memorial */}
            <div className="card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky/10 rounded-full flex-shrink-0">
                  <PenIcon size={28} className="text-sky" />
                </div>
                <div>
                  <h3 className="heading-3 mb-3">Tvoj memorijal</h3>
                  <p className="text-text-secondary mb-4">Napiši kako želiš da te pamte:</p>
                  <ul className="text-text-secondary space-y-1">
                    <li>● sa humorom</li>
                    <li>● sa stilom</li>
                    <li>● iskreno</li>
                    <li>● bez ulepšavanja</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose/20 rounded-full flex-shrink-0">
                  <PhotoIcon size={28} className="text-rose-dark" />
                </div>
                <div>
                  <h3 className="heading-3 mb-3">Tvoje fotografije</h3>
                  <p className="text-text-secondary mb-4">Ti biraš:</p>
                  <ul className="text-text-secondary space-y-1">
                    <li>● najlepše momente</li>
                    <li>● verziju sebe koju želiš da ostaviš</li>
                    <li>● slike koje te predstavljaju</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sage/20 rounded-full flex-shrink-0">
                  <MailIcon size={28} className="text-sage-dark" />
                </div>
                <div>
                  <h3 className="heading-3 mb-3">Poruke koje stižu kad dođe vreme</h3>
                  <p className="text-text-secondary mb-4">
                    Možeš da napišeš jednu poruku, deset, ili sto. I da ih pošalješ:
                  </p>
                  <ul className="text-text-secondary space-y-1 mb-4">
                    <li>● porodici</li>
                    <li>● prijateljima</li>
                    <li>● partneru</li>
                    <li>● bilo kome, na bilo koju e-mail adresu</li>
                  </ul>
                  <p className="text-text-muted text-sm italic">
                    Poruke se šalju automatski, tek nakon potvrde smrti.
                  </p>
                </div>
              </div>
            </div>

            {/* Secrets / Humor */}
            <div className="card p-6 md:p-8 bg-gradient-to-br from-sand-light to-ivory">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky/10 rounded-full flex-shrink-0">
                  <SmileIcon size={28} className="text-sky" />
                </div>
                <div>
                  <h3 className="heading-3 mb-3">Male tajne, veliki osmesi</h3>
                  <p className="text-text-secondary mb-4">
                    Ovo nije mesto za dramu.<br />
                    Ovo je mesto za one istine koje će nasmejati.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4 space-y-3">
                    <p className="text-text-secondary italic">„Nije bila mačka. Ja sam razbila šolju."</p>
                    <p className="text-text-secondary italic">„Nisam spavao kod Nikole. Bila je žurka u Čačku."</p>
                    <p className="text-text-secondary italic">„Ja sam ubila orhideju. Ne sama."</p>
                    <p className="text-text-secondary italic">„Onaj tvoj džemper što je 'nestao'? Verovatno je i dalje u mom ormaru."</p>
                  </div>
                  <p className="text-text-muted text-sm mt-4">
                    Istina, ali ona koja greje.
                  </p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose/20 rounded-full flex-shrink-0">
                  <DocumentIcon size={28} className="text-rose-dark" />
                </div>
                <div>
                  <h3 className="heading-3 mb-3">Važna dokumenta i pristupi</h3>
                  <p className="text-text-secondary mb-4">Na jednom mestu možeš da ostaviš:</p>
                  <ul className="text-text-secondary space-y-1 mb-4">
                    <li>● dokumenta</li>
                    <li>● uputstva</li>
                    <li>● pristupe</li>
                    <li>● važne fajlove</li>
                  </ul>
                  <p className="text-text-muted text-sm italic">
                    Sve je sigurno, šifrovano i dostupno samo kad dođe vreme.
                  </p>
                </div>
              </div>
            </div>

            {/* Control */}
            <div className="card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sage/20 rounded-full flex-shrink-0">
                  <UsersIcon size={28} className="text-sage-dark" />
                </div>
                <div>
                  <h3 className="heading-3 mb-3">Kontrola i nakon tebe</h3>
                  <p className="text-text-secondary mb-4">Ti biraš ko:</p>
                  <ul className="text-text-secondary space-y-1 mb-4">
                    <li>● upravlja memorijalom</li>
                    <li>● može da odgovara na poruke</li>
                    <li>● može da doda sadržaj</li>
                  </ul>
                  <p className="text-text-primary font-medium">
                    Ništa nije prepušteno slučaju.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Bezbednost i poverljivost</h2>

          <div className="card p-6 md:p-8 border-2 border-sage/30">
            <p className="text-text-secondary text-lg mb-6">
              Sve što uneseš spada u <strong>najpoverljivije lične podatke</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sage-dark rounded-full"></div>
                <span className="text-text-secondary">Podaci su šifrovani</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sage-dark rounded-full"></div>
                <span className="text-text-secondary">Nisu javno dostupni</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sage-dark rounded-full"></div>
                <span className="text-text-secondary">Platforma nema pristup sadržaju</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sage-dark rounded-full"></div>
                <span className="text-text-secondary">Aktivacija po tvojim pravilima</span>
              </div>
            </div>

            <div className="bg-sage-light/30 rounded-lg p-4">
              <p className="text-text-primary font-medium mb-0">
                Tvoja priča je čuvana, zaključana i zaštićena.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="mb-8">
          <div className="card p-8 md:p-12 text-center bg-gradient-to-br from-sand to-ivory">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-text-primary mb-6">
              Jedna prosta istina
            </h2>

            <p className="text-text-secondary text-xl mb-2">
              Priče koje ne napišeš ti –
            </p>
            <p className="text-text-primary text-xl font-medium mb-8">
              napisaće neko drugi.
            </p>

            <div className="bg-white/60 rounded-lg p-6 mb-8 max-w-lg mx-auto">
              <p className="text-text-secondary mb-1">Pametni ljudi razmišljaju o budućnosti.</p>
              <p className="text-sage-dark font-medium">Najpametniji ništa ne prepuštaju slučaju.</p>
            </div>

            <Link
              to={user ? "/moj-profil/kreiraj" : "/registracija"}
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              Započni svoju priču
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {!user && (
              <p className="text-text-muted text-sm mt-4">
                Već imaš nalog? <Link to="/prijava" className="text-sky hover:text-sky-dark underline">Prijavi se</Link>
              </p>
            )}
          </div>
        </section>

        {/* P.S. Section - humor */}
        <section className="text-center">
          <p className="text-text-muted text-sm italic">
            P.S. Ako ti se ovo čini morbidno – razmisli ponovo.
            Osiguranje kuće takođe nije morbidno. A brak ima prenup.
            Ovo je samo... zdrav razum sa stilom.
          </p>
        </section>

      </div>
    </div>
  )
}
