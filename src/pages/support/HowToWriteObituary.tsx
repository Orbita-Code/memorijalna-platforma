import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import { QuillIcon, CheckIcon } from '../../components/icons/FeatureIcons'

export default function HowToWriteObituary() {
  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Kako napisati čitulju - Vodič za pisanje osmrtnica"
        description="Praktični saveti za pisanje dostojanstvene čitulje. Naučite šta čitulja treba da sadrži, kako je strukturirati i primeri čitulja za inspiraciju."
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sand to-ivory py-16 lg:py-20 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="text-sky hover:text-sky-dark text-sm mb-4 inline-block">
            ← Nazad na početnu
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-sky-light flex items-center justify-center">
              <QuillIcon size={28} className="text-sky-dark" />
            </div>
            <div>
              <p className="text-sky-dark font-medium text-sm">Podrška porodicama</p>
              <h1 className="font-serif text-3xl lg:text-4xl font-medium text-text-primary">
                Kako napisati čitulju
              </h1>
            </div>
          </div>
          <p className="text-lg text-text-secondary max-w-3xl">
            Pisanje čitulje može biti emotivno težak zadatak. Ovaj vodič će vam pomoći
            da napišete dostojanstvenu osmrtnicu koja odaje počast životu voljene osobe.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
        {/* Uvod */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-text-secondary leading-relaxed">
            Čitulja je javna objava o smrti koja obaveštava zajednicu o gubitku i daje
            informacije o sahrani. Iako je to težak zadatak u momentu tuge, dobro napisana
            čitulja može biti način da odate počast preminuloj osobi i pomognete drugima
            da izraze saučešće.
          </p>
        </div>

        {/* Struktura čitulje */}
        <section className="mb-12">
          <h2 className="heading-2 mb-6">Šta čitulja treba da sadrži</h2>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-sky-light flex items-center justify-center text-sky-dark text-sm font-bold">1</span>
                Osnovni podaci
              </h3>
              <ul className="space-y-2 ml-10">
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Puno ime preminule osobe (ime, srednje ime, prezime, devojačko prezime)
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Datum i mesto rođenja
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Datum i mesto smrti
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Starost u trenutku smrti
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-sage-light flex items-center justify-center text-sage text-sm font-bold">2</span>
                Informacije o sahrani
              </h3>
              <ul className="space-y-2 ml-10">
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Datum, vreme i mesto sahrane
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Ime groblja ili crkve
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Da li je sahrana javna ili privatna
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Informacije o komemoraciji (ako je planirana)
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-rose-light flex items-center justify-center text-rose text-sm font-bold">3</span>
                Porodica
              </h3>
              <ul className="space-y-2 ml-10">
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Imena najbližih članova porodice koji su ostali
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Imena preminulih članova porodice (roditelji, supružnik)
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Posebne veze (npr. "voljena baka petoro unučadi")
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-sky-light flex items-center justify-center text-sky-dark text-sm font-bold">4</span>
                Kako izraziti saučešće
              </h3>
              <ul className="space-y-2 ml-10">
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Adresa za slanje saučešća (opciono)
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Link na online memorijal
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                  Informacije o donacijama umesto cveća (ako je primenjivo)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Primer čitulje */}
        <section className="mb-12">
          <h2 className="heading-2 mb-6">Primer čitulje</h2>

          <div className="card p-8 bg-sand-light border-l-4 border-sky">
            <p className="text-text-primary leading-relaxed mb-4">
              <strong>Milica Petrović</strong> (rođ. Jovanović), 1945–2024
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              Sa dubokim bolom objavljujemo da je naša voljena majka, baka i prijateljica
              Milica Petrović preminula 10. januara 2024. godine u Beogradu, u 79. godini života.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              Milica je rođena 15. marta 1945. godine u Beogradu. Ceo život je posvetila
              porodici i obrazovanju kao profesorka srpskog jezika. Ostala je u srcima
              svoje dece Marka i Jelene, unučadi Nikole, Ane i Stefana, kao i brojnih
              prijatelja i bivših učenika.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              Sahrana će se održati u subotu, 13. januara 2024. godine u 13 časova na
              Novom groblju u Beogradu.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Umesto cveća, porodica moli da se donacije upute Dečijoj klinici u Tiršovoj.
              Posetite njen memorijal na memorijalna-platforma.rs/milica-petrovic gde
              možete ostaviti posvetu.
            </p>
          </div>
        </section>

        {/* Saveti */}
        <section className="mb-12">
          <h2 className="heading-2 mb-6">Korisni saveti</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3">Budite koncizni</h3>
              <p className="text-text-secondary text-sm">
                Čitulja treba da bude jasna i sažeta. Fokusirajte se na najvažnije
                informacije. Detaljnije priče mogu se podeliti na memorijalu.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3">Personalizujte</h3>
              <p className="text-text-secondary text-sm">
                Dodajte detalj koji je karakterisao osobu — hobi, karijera, osobina.
                To čini čitulju manje generičkom i više ličnom.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3">Proverite podatke</h3>
              <p className="text-text-secondary text-sm">
                Pre objavljivanja, proverite sve datume, imena i informacije o sahrani.
                Greške mogu uzrokovati konfuziju.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3">Tražite pomoć</h3>
              <p className="text-text-secondary text-sm">
                Ako vam je teško da pišete sami, zamolite člana porodice ili prijatelja
                za pomoć. Pogrebno preduzeće takođe može pomoći.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="card p-8 text-center bg-sand-light">
          <h2 className="heading-2 mb-4">Spremni da objavite čitulju?</h2>
          <p className="text-text-secondary mb-6">
            Kreirajte memorijal i objavite čitulju na našoj platformi.
            Sve informacije na jednom mestu, dostupne svima.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/umrlica/nova" className="btn-primary">
              Objavi čitulju
            </Link>
            <Link to="/kreiraj-memorijal" className="btn-secondary">
              Kreiraj memorijal
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
