import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import { PhotoIcon, VideoIcon, QuillIcon, CheckIcon } from '../../components/icons/FeatureIcons'

export default function HowToPreserveMemories() {
  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Kako sačuvati uspomene - Čuvanje sećanja na voljene"
        description="Vodič za čuvanje uspomena na voljenu osobu. Digitalizacija fotografija, organizacija porodične arhive, kreiranje memorijala i načini da sećanja ostanu živa."
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sand to-ivory py-16 lg:py-20 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="text-sky hover:text-sky-dark text-sm mb-4 inline-block">
            ← Nazad na početnu
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-sky-light flex items-center justify-center">
              <PhotoIcon size={28} className="text-sky-dark" />
            </div>
            <div>
              <p className="text-sky-dark font-medium text-sm">Podrška porodicama</p>
              <h1 className="font-serif text-3xl lg:text-4xl font-medium text-text-primary">
                Kako sačuvati uspomene
              </h1>
            </div>
          </div>
          <p className="text-lg text-text-secondary max-w-3xl">
            Sećanja na voljene osobe su neprocenjiva. Ovaj vodič vam pomaže da
            sačuvate fotografije, priče i uspomene za generacije koje dolaze.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
        {/* Uvod */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-text-secondary leading-relaxed">
            Svaka porodica ima priče koje zaslužuju da budu ispričane i sačuvane. Fotografije
            u kutijama na tavanu, pisma u fiokama, video snimci na starim kasetama — sve to
            predstavlja neprocenjivo blago koje vremenom može da se izgubi. Digitalizacija
            i organizacija ovih uspomena osigurava da će buduće generacije moći da upoznaju
            svoje pretke i čuvaju porodičnu istoriju.
          </p>
        </div>

        {/* Fotografije */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sky-light flex items-center justify-center">
              <PhotoIcon size={20} className="text-sky-dark" />
            </div>
            <h2 className="heading-2">Čuvanje fotografija</h2>
          </div>

          <div className="card p-6 mb-6">
            <h3 className="font-semibold text-text-primary mb-4">Digitalizacija starih fotografija</h3>
            <p className="text-text-secondary mb-4">
              Stare fotografije su najranjivije — papir bledi, oštećuje se i propada.
              Digitalizacija ih čuva zauvek i omogućava lako deljenje sa porodicom.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  <strong>Skenirajte u visokoj rezoluciji</strong> — minimalno 300 DPI,
                  idealno 600 DPI za stare fotografije. To omogućava uvećanje bez gubitka kvaliteta.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  <strong>Koristite TIFF ili PNG format</strong> za arhiviranje originala.
                  JPEG je kompresovan i gubi kvalitet pri svakom otvaranju i čuvanju.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  <strong>Čuvajte originale u kutijama bez kiseline</strong> ako planirate
                  da ih zadržite fizički. Izbegavajte plastične albume koji mogu oštetiti slike.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  <strong>Zapišite ko je na fotografiji</strong> — dok znate, zapišite imena,
                  datume i priče iza fotografija. Za desetak godina možda nećete pamtiti.
                </span>
              </li>
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-text-primary mb-4">Organizacija digitalne kolekcije</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  <strong>Organizujte u foldere po godinama ili događajima</strong> —
                  npr. "1985-Venčanje" ili "1990-Rođendan-Bake".
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  <strong>Imenujte fajlove smisleno</strong> — umesto "IMG_0001.jpg",
                  koristite "1985-Mama-i-Tata-Venčanje.jpg".
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  <strong>Napravite backup na više lokacija</strong> — eksterni hard disk,
                  cloud servis (Google Photos, Dropbox), i memorijal na našoj platformi.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Video */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center">
              <VideoIcon size={20} className="text-sage" />
            </div>
            <h2 className="heading-2">Čuvanje video snimaka</h2>
          </div>

          <div className="card p-6">
            <p className="text-text-secondary mb-4">
              Video snimci čuvaju glas, pokret i osobnost voljene osobe na način koji
              fotografije ne mogu. Ako imate stare VHS kasete ili 8mm filmove, prioritet
              vam je da ih digitalizujete pre nego što postanu neupotrebljivi.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-sand-light p-4 rounded-lg">
                <h4 className="font-semibold text-text-primary mb-2">VHS i kasete</h4>
                <p className="text-text-secondary text-sm">
                  VHS kasete imaju rok trajanja od 10-25 godina. Ako ih niste gledali
                  godinama, možda su već oštećene. Potražite lokalni servis za digitalizaciju
                  ili kupite USB video capture uređaj.
                </p>
              </div>
              <div className="bg-sand-light p-4 rounded-lg">
                <h4 className="font-semibold text-text-primary mb-2">8mm i Super 8 filmovi</h4>
                <p className="text-text-secondary text-sm">
                  Stari porodični filmovi na 8mm traci su pravo blago. Profesionalna
                  digitalizacija može koštati, ali rezultat je neprocenjiv.
                  Proverite lokalne foto/video studije.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-sky-light/30 rounded-lg border border-sky/20">
              <p className="text-text-secondary text-sm">
                <strong>Savet:</strong> Prilikom digitalizacije, zatražite MP4 format u
                1080p rezoluciji. To je univerzalni format koji će raditi na svim uređajima
                i platformama, uključujući naš memorijal.
              </p>
            </div>
          </div>
        </section>

        {/* Priče i dokumenti */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center">
              <QuillIcon size={20} className="text-rose" />
            </div>
            <h2 className="heading-2">Čuvanje priča i dokumenata</h2>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3">Porodične priče</h3>
              <p className="text-text-secondary text-sm mb-4">
                Priče koje nam pričaju bake i deke su neprocenjive — i često se gube kada
                oni odu. Iskoristite svaku priliku da ih zabeležite.
              </p>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-sage mt-1 flex-shrink-0" />
                  <span>Snimite audio ili video intervjue sa starijim članovima porodice</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-sage mt-1 flex-shrink-0" />
                  <span>Pitajte ih o detinjstvu, roditeljima, važnim događajima</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-sage mt-1 flex-shrink-0" />
                  <span>Zapišite porodične recepte sa pričama iza njih</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-sage mt-1 flex-shrink-0" />
                  <span>Sačuvajte pisma, razglednice i dnevnike</span>
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3">Važni dokumenti</h3>
              <p className="text-text-secondary text-sm mb-4">
                Neki dokumenti imaju istorijsku i sentimentalnu vrednost:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky rounded-full"></span>
                    Rodne liste i krštenice
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky rounded-full"></span>
                    Venčani listovi
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky rounded-full"></span>
                    Diplome i svedočanstva
                  </li>
                </ul>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sage rounded-full"></span>
                    Vojna dokumenta
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sage rounded-full"></span>
                    Nagrade i priznanja
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sage rounded-full"></span>
                    Novinarski članci
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Digitalni memorijal */}
        <section className="mb-12">
          <h2 className="heading-2 mb-6">Kreiranje digitalnog memorijala</h2>

          <div className="card p-6 bg-sand-light">
            <p className="text-text-secondary mb-6">
              Digitalni memorijal je centralno mesto gde se sve uspomene čuvaju — fotografije,
              video snimci, biografija i priče. Za razliku od fizičkog albuma koji može da
              se ošteti ili izgubi, digitalni memorijal je siguran, dostupan svima i traje zauvek.
            </p>

            <h3 className="font-semibold text-text-primary mb-4">Prednosti digitalnog memorijala:</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-text-primary text-sm">Trajnost</strong>
                  <p className="text-text-secondary text-sm">
                    Ne bledi, ne gori, ne može se izgubiti u poplavi ili selidbi.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-text-primary text-sm">Pristupačnost</strong>
                  <p className="text-text-secondary text-sm">
                    Porodica širom sveta može da pristupi u bilo kom trenutku.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-text-primary text-sm">Interaktivnost</strong>
                  <p className="text-text-secondary text-sm">
                    Članovi porodice mogu dodavati svoje uspomene i komentare.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckIcon size={16} className="text-sage mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-text-primary text-sm">QR kod</strong>
                  <p className="text-text-secondary text-sm">
                    Povezivanje sa fizičkim spomenikom — skeniranjem se pristupa memorijalu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Saveti za organizaciju */}
        <section className="mb-12">
          <h2 className="heading-2 mb-6">Praktični saveti za organizaciju</h2>

          <div className="space-y-4">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-sky-light flex items-center justify-center flex-shrink-0 text-sky-dark font-bold">1</span>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Počnite sa onim što je najugroženije</h3>
                  <p className="text-text-secondary text-sm">
                    Stare VHS kasete i fotografije na tavanu su prioritet. Digitalizujte ih
                    pre nego što budu oštećene ili izgubljene.
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-sky-light flex items-center justify-center flex-shrink-0 text-sky-dark font-bold">2</span>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Uključite celu porodicu</h3>
                  <p className="text-text-secondary text-sm">
                    Organizujte porodično okupljanje gde ćete zajedno pregledati fotografije.
                    Stariji članovi će moći da identifikuju osobe i ispričaju priče.
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-sky-light flex items-center justify-center flex-shrink-0 text-sky-dark font-bold">3</span>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Radite u malim koracima</h3>
                  <p className="text-text-secondary text-sm">
                    Ne pokušavajte da sve završite odjednom. Svake nedelje odvojite sat
                    vremena za skeniranje ili organizaciju. Za godinu dana imaćete
                    kompletnu digitalnu arhivu.
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-sky-light flex items-center justify-center flex-shrink-0 text-sky-dark font-bold">4</span>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Delite odgovornost</h3>
                  <p className="text-text-secondary text-sm">
                    Dajte pristup memorijalu više članova porodice kako bi svi mogli
                    da doprinesu. Jedan čuva stare fotografije, drugi snima intervjue,
                    treći piše biografiju.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="card p-8 text-center bg-sand-light">
          <h2 className="heading-2 mb-4">Sačuvajte uspomene zauvek</h2>
          <p className="text-text-secondary mb-6">
            Kreirajte digitalni memorijal i okupite sve uspomene na jednom mestu.
            Podelite ga sa porodicom i osigurajte da sećanja žive večno.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kreiraj-memorijal" className="btn-primary">
              Kreiraj memorijal
            </Link>
            <Link to="/kako-funkcionise" className="btn-secondary">
              Kako funkcioniše
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
