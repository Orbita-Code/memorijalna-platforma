import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { ShieldIcon, LockIcon, CheckIcon } from '../components/icons/FeatureIcons'

export default function DataSecurity() {
  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Bezbednost podataka | Memorial"
        description="Saznajte kako Memorial štiti vaše podatke. Šifrovanje, nezavisno čuvanje ključeva, i potpuna kontrola nad vašim sadržajem."
      />

      {/* Hero */}
      <div className="bg-gradient-to-b from-sage-light/30 to-ivory py-16 md:py-24 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-8">
            <ShieldIcon size={40} className="text-sage-dark" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-text-primary mb-6">
            Bezbednost i poverenje
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Jer neke stvari jednostavno ne smeju da budu prepuštene slučaju.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">

        {/* Intro */}
        <section className="mb-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Kada nam poveriš svoju priču, poruke, dokumenta ili podatke za pristup,
              ti nam ne daješ običan sadržaj.
            </p>
            <p className="text-text-secondary text-lg mb-4">Daješ nam nešto što je:</p>
            <ul className="text-text-secondary space-y-2 mb-6">
              <li>● lično</li>
              <li>● poverljivo</li>
              <li>● i važno onima koje ostavljaš iza sebe</li>
            </ul>
            <div className="bg-sage-light/30 border-l-4 border-sage rounded-r-lg p-6">
              <p className="text-text-primary text-lg font-medium mb-0">
                Zato je bezbednost osnova ove platforme, a ne dodatna opcija.
              </p>
            </div>
          </div>
        </section>

        {/* Šta sve čuvamo */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Šta sve čuvamo?</h2>
          <div className="card p-6 md:p-8">
            <p className="text-text-secondary mb-4">
              U okviru platforme mogu se čuvati isključivo podaci koje korisnik sam unese i odobri, kao što su:
            </p>
            <ul className="space-y-2 text-text-secondary mb-6">
              <li>● tekst ličnog memorijala („Tvoja priča")</li>
              <li>● poruke i pisma namenjena određenim osobama</li>
              <li>● fotografije i drugi lični sadržaj</li>
              <li>● važna dokumenta</li>
              <li>● podaci za pristup (lozinke, uputstva, informacije)</li>
            </ul>
            <div className="bg-rose-light/30 border border-rose/30 rounded-lg p-4">
              <p className="text-rose-dark font-medium mb-0">
                Svi ovi podaci se tretiraju kao visoko poverljivi.
              </p>
            </div>
          </div>
        </section>

        {/* Šta je važno da znate */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Šta je važno da znate</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="card p-5 flex items-start gap-3">
              <LockIcon size={24} className="text-sage-dark flex-shrink-0 mt-0.5" />
              <span className="text-text-secondary">Ništa što unesete nije javno</span>
            </div>
            <div className="card p-5 flex items-start gap-3">
              <LockIcon size={24} className="text-sage-dark flex-shrink-0 mt-0.5" />
              <span className="text-text-secondary">Ništa se ne prikazuje dok ste živi</span>
            </div>
            <div className="card p-5 flex items-start gap-3">
              <LockIcon size={24} className="text-sage-dark flex-shrink-0 mt-0.5" />
              <span className="text-text-secondary">Ništa se ne šalje bez vaše izričite dozvole</span>
            </div>
            <div className="card p-5 flex items-start gap-3">
              <LockIcon size={24} className="text-sage-dark flex-shrink-0 mt-0.5" />
              <span className="text-text-secondary">Sadržaj se aktivira isključivo nakon potvrde smrti</span>
            </div>
          </div>

          <div className="card p-6 bg-sand-light">
            <p className="text-text-secondary mb-4">Korisnik unapred određuje:</p>
            <ul className="space-y-2 text-text-secondary">
              <li>● šta se objavljuje</li>
              <li>● šta se šalje</li>
              <li>● kome</li>
              <li>● i pod kojim uslovima</li>
            </ul>
          </div>
        </section>

        {/* Da li platforma može da čita */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Da li platforma može da čita moje poruke i dokumente?</h2>
          <div className="card p-6 md:p-8">
            <p className="text-2xl font-semibold text-sage-dark mb-4">Ne.</p>
            <p className="text-text-secondary mb-6">
              Platforma ne može da čita vaše poruke, niti da otvara ili pregleda vaša dokumenta.
            </p>

            <div className="bg-sky-light/30 border border-sky/30 rounded-lg p-6 mb-6">
              <p className="text-text-primary mb-4">
                <strong>Razlog je jednostavan:</strong><br />
                podaci su šifrovani, a ključeve za pristup ne čuva platforma.
              </p>
              <p className="text-text-secondary mb-0">
                Ključeve za dešifrovanje čuva nezavisan, specijalizovani provajder,
                koji je potpuno odvojen od same platforme.
              </p>
            </div>

            <p className="text-text-secondary mb-3">Zbog toga:</p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start gap-2">
                <CheckIcon size={20} className="text-sage-dark flex-shrink-0 mt-0.5" />
                <span>platforma nema tehničku mogućnost pristupa sadržaju</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={20} className="text-sage-dark flex-shrink-0 mt-0.5" />
                <span>poruke i dokumenti nisu čitljivi unutar sistema</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={20} className="text-sage-dark flex-shrink-0 mt-0.5" />
                <span>pristup se može ostvariti samo kada se ispune uslovi koje je korisnik unapred definisao</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Kako su podaci zaštićeni */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Kako su podaci zaštićeni?</h2>
          <p className="text-text-secondary mb-6">Jasno i bez tehničkog žargona:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card p-5 text-center">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <LockIcon size={24} className="text-sage-dark" />
              </div>
              <p className="text-text-secondary">Svi podaci su šifrovani</p>
            </div>
            <div className="card p-5 text-center">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldIcon size={24} className="text-sage-dark" />
              </div>
              <p className="text-text-secondary">Pristupni ključevi se čuvaju van platforme</p>
            </div>
            <div className="card p-5 text-center">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <LockIcon size={24} className="text-sage-dark" />
              </div>
              <p className="text-text-secondary">Sadržaj bez ključeva nije upotrebljiv</p>
            </div>
            <div className="card p-5 text-center">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckIcon size={24} className="text-sage-dark" />
              </div>
              <p className="text-text-secondary">Platforma funkcioniše kao čuvar i izvršilac volje korisnika</p>
            </div>
          </div>
        </section>

        {/* Šta se dešava nakon potvrde smrti */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Šta se dešava nakon potvrde smrti?</h2>
          <div className="card p-6 md:p-8">
            <p className="text-text-secondary mb-6">
              Tek nakon zvanične potvrde smrti, aktivira se sadržaj koji je korisnik unapred podesio:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-sage-dark font-bold">1.</span>
                <span className="text-text-secondary">Memorijal postaje vidljiv</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-dark font-bold">2.</span>
                <span className="text-text-secondary">Poruke se automatski šalju na određene e-mail adrese</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-dark font-bold">3.</span>
                <span className="text-text-secondary">Dokumenti postaju dostupni ovlašćenim osobama</span>
              </li>
            </ul>
            <p className="text-text-primary font-medium">
              Ništa više od toga. Ništa manje.
            </p>
          </div>
        </section>

        {/* Šta ako se nešto desi platformi */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Šta ako se nešto desi platformi?</h2>
          <div className="card p-6 md:p-8">
            <p className="text-text-secondary mb-4">Sistem je osmišljen tako da:</p>
            <ul className="space-y-2 text-text-secondary mb-6">
              <li>● pristup ključevima nije vezan za jednu osobu</li>
              <li>● platforma nema kontrolu nad sadržajem u otvorenom obliku</li>
              <li>● podaci ne zavise od jednog scenarija ili jedne odluke</li>
            </ul>

            <div className="bg-sage-light/30 rounded-lg p-4">
              <p className="text-text-primary mb-2">Cilj je da sadržaj koji ste poverili:</p>
              <ul className="space-y-1 text-text-secondary">
                <li>● ne nestane</li>
                <li>● ne bude zloupotrebljen</li>
                <li>● bude dostupan onda kada treba</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Šta platforma ne radi */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Šta platforma NE radi</h2>
          <div className="card p-6 md:p-8 border-2 border-rose/30">
            <p className="text-text-secondary mb-4">Ovo je važno i jasno:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-3 text-text-secondary">
                <span className="text-rose-dark font-bold text-lg">×</span>
                ne čita poruke
              </li>
              <li className="flex items-center gap-3 text-text-secondary">
                <span className="text-rose-dark font-bold text-lg">×</span>
                ne otvara dokumente
              </li>
              <li className="flex items-center gap-3 text-text-secondary">
                <span className="text-rose-dark font-bold text-lg">×</span>
                ne analizira sadržaj
              </li>
              <li className="flex items-center gap-3 text-text-secondary">
                <span className="text-rose-dark font-bold text-lg">×</span>
                ne koristi podatke u marketinške svrhe
              </li>
              <li className="flex items-center gap-3 text-text-secondary">
                <span className="text-rose-dark font-bold text-lg">×</span>
                ne prodaje niti deli podatke sa trećim stranama
              </li>
            </ul>
            <div className="bg-sand-light rounded-lg p-4">
              <p className="text-text-primary font-medium mb-0">
                Sadržaj koji unesete nije proizvod.<br />
                On je vaša volja.
              </p>
            </div>
          </div>
        </section>

        {/* Vaša kontrola, uvek */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Vaša kontrola, uvek</h2>
          <div className="card p-6 md:p-8">
            <p className="text-text-secondary mb-4">Dok ste živi, u svakom trenutku možete:</p>
            <ul className="space-y-2 text-text-secondary mb-6">
              <li className="flex items-start gap-2">
                <CheckIcon size={20} className="text-sage-dark flex-shrink-0 mt-0.5" />
                <span>menjati sadržaj</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={20} className="text-sage-dark flex-shrink-0 mt-0.5" />
                <span>dodavati ili uklanjati poruke</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={20} className="text-sage-dark flex-shrink-0 mt-0.5" />
                <span>menjati primaoce</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={20} className="text-sage-dark flex-shrink-0 mt-0.5" />
                <span>odrediti ko upravlja memorijalom nakon vas</span>
              </li>
            </ul>
            <p className="text-sage-dark font-medium">
              Sve dok ste tu — sve je pod vašom kontrolom.
            </p>
          </div>
        </section>

        {/* Pravni okvir */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Pravni okvir</h2>
          <div className="card p-6">
            <p className="text-text-secondary mb-4">
              Detaljna pravna pravila možete pronaći ovde:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/uslovi-koriscenja"
                className="btn-secondary text-center"
              >
                Uslovi korišćenja
              </Link>
              <Link
                to="/privatnost"
                className="btn-secondary text-center"
              >
                Politika privatnosti
              </Link>
            </div>
            <p className="text-text-muted text-sm mt-4">
              Ova stranica postoji da jasno i ljudski objasni kako sistem funkcioniše u praksi.
            </p>
          </div>
        </section>

        {/* Na kraju */}
        <section className="text-center">
          <div className="card p-8 md:p-12 bg-gradient-to-br from-sage-light/30 to-ivory">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-text-primary mb-6">
              Na kraju
            </h2>
            <p className="text-text-secondary text-lg mb-2">
              Bezbednost nije obećanje.
            </p>
            <p className="text-text-primary text-xl font-medium mb-6">
              Ona je način na koji je sistem napravljen.
            </p>
            <p className="text-sage-dark font-medium">
              I upravo tako smo mu pristupili.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
