import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import { HeartIcon, PhoneIcon } from '../../components/icons/FeatureIcons'

export default function HowToCope() {
  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Kako se nositi sa gubitkom - Podrška u tugovanju"
        description="Vodič za suočavanje sa gubitkom voljene osobe. Faze tugovanja, saveti psihologa, resursi za podršku i kako pomoći sebi i drugima u najtežim trenucima."
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sand to-ivory py-16 lg:py-20 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="text-sky hover:text-sky-dark text-sm mb-4 inline-block">
            ← Nazad na početnu
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-rose-light flex items-center justify-center">
              <HeartIcon size={28} className="text-rose" />
            </div>
            <div>
              <p className="text-rose font-medium text-sm">Podrška porodicama</p>
              <h1 className="font-serif text-3xl lg:text-4xl font-medium text-text-primary">
                Kako se nositi sa gubitkom
              </h1>
            </div>
          </div>
          <p className="text-lg text-text-secondary max-w-3xl">
            Gubitak voljene osobe je jedan od najtežih životnih iskustava.
            Ovaj vodič pruža podršku i praktične savete za suočavanje sa tugom.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
        {/* Uvod */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-text-secondary leading-relaxed">
            Tugovanje je prirodan proces koji prolazimo nakon gubitka. Ne postoji "ispravan"
            način da se tuguje — svako od nas to doživljava na svoj način. Važno je znati da
            niste sami i da je u redu tražiti pomoć. Ova stranica nudi informacije koje vam
            mogu pomoći da razumete šta prolazite i kako da se nosite sa bolom.
          </p>
        </div>

        {/* Faze tugovanja */}
        <section className="mb-12">
          <h2 className="heading-2 mb-6">Razumevanje tugovanja</h2>

          <div className="card p-6 mb-6">
            <p className="text-text-secondary mb-6">
              Psihologinja Elisabeth Kübler-Ross je opisala pet faza tugovanja. Važno je
              napomenuti da ove faze nisu linearne — možete ih proživljavati različitim
              redosledom, vraćati se na neke, ili ih doživljavati istovremeno. To je normalno.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                  <span className="text-text-secondary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Poricanje</h3>
                  <p className="text-text-secondary text-sm mt-1">
                    "Ovo se ne dešava." Poricanje nam pomaže da preživimo početni šok.
                    Svet gubi smisao i osećamo se utrnulo. To je odbrambeni mehanizam koji
                    nam daje vreme da se postepeno prilagodimo novoj realnosti.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                  <span className="text-text-secondary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Bes</h3>
                  <p className="text-text-secondary text-sm mt-1">
                    "Zašto se ovo desilo?" Bes može biti usmeren prema sebi, drugima, pa čak
                    i prema preminuloj osobi. Ispod besa je bol. Bes je neophodan deo procesa
                    ozdravljenja — pustite ga da izađe.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                  <span className="text-text-secondary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Pregovaranje</h3>
                  <p className="text-text-secondary text-sm mt-1">
                    "Da sam samo..." Mentalno se vraćamo u prošlost, razmišljamo šta smo
                    mogli drugačije. Osećaj krivice je čest. Ovo je način da se nosimo sa
                    bespomoćnošću i pokušamo da vratimo kontrolu.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                  <span className="text-text-secondary font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Depresija</h3>
                  <p className="text-text-secondary text-sm mt-1">
                    Duboka tuga i praznina. Povlačimo se od drugih. Ovo nije znak slabosti
                    ili mentalnog poremećaja — to je prirodan odgovor na gubitak. Dozvolite
                    sebi da osećate tugu.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                  <span className="text-sage font-bold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Prihvatanje</h3>
                  <p className="text-text-secondary text-sm mt-1">
                    Prihvatanje ne znači da smo "u redu" sa gubitkom. Znači da priznajemo
                    novu realnost i učimo da živimo sa njom. Počinjemo da pronalazimo nove
                    načine da idemo dalje, čuvajući sećanja na voljenu osobu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Praktični saveti */}
        <section className="mb-12">
          <h2 className="heading-2 mb-6">Praktični saveti za svaki dan</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3">Dozvolite sebi da tugujete</h3>
              <p className="text-text-secondary text-sm">
                Nemojte potiskivati emocije. Plakanje, tuga, bes — sve je to deo procesa.
                Dajte sebi dozvolu da osećate bez osude. Tugovanje nije znak slabosti,
                već znak ljubavi.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3">Pričajte o preminuloj osobi</h3>
              <p className="text-text-secondary text-sm">
                Deljenje sećanja može biti lekovito. Pričajte sa porodicom i prijateljima
                o voljenoj osobi. Smeh dok se prisećate lepih trenutaka nije nepoštovanje —
                to je slavljenje života.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3">Brinite o sebi</h3>
              <p className="text-text-secondary text-sm">
                Tuga iscrpljuje telo i um. Trudite se da jedete redovno, spavate dovoljno
                i krećete se. Čak i kratka šetnja može pomoći. Izbegavajte alkohol i
                druge načine "utapanja tuge".
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3">Prihvatite pomoć</h3>
              <p className="text-text-secondary text-sm">
                Kada vam neko ponudi pomoć, prihvatite je. Ljudi žele da pomognu, ali
                često ne znaju kako. Recite im konkretno šta vam treba — čak i ako je
                to samo da sede pored vas.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3">Odložite velike odluke</h3>
              <p className="text-text-secondary text-sm">
                Tugovanje utiče na sposobnost rasuđivanja. Ako je moguće, odložite
                važne odluke (prodaja kuće, selidba) bar godinu dana. Dajte sebi
                vremena da se stabilizujete.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-text-primary mb-3">Kreirajte rituale sećanja</h3>
              <p className="text-text-secondary text-sm">
                Zapalite sveću na godišnjicu, posetite grob, napišite pismo.
                Rituali nam pomažu da održimo vezu sa preminulom osobom i obeležimo
                važne datume na smislen način.
              </p>
            </div>
          </div>
        </section>

        {/* Kada potražiti pomoć */}
        <section className="mb-12">
          <h2 className="heading-2 mb-6">Kada potražiti stručnu pomoć</h2>

          <div className="card p-6 bg-rose/5 border border-rose/20 mb-6">
            <p className="text-text-secondary mb-4">
              Tugovanje je normalno, ali ponekad nam je potrebna dodatna podrška.
              Razmislite o razgovoru sa stručnjakom ako:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-rose mt-1">•</span>
                <span>Osećate se nesposobnim da obavljate osnovne dnevne aktivnosti</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose mt-1">•</span>
                <span>Imate misli o samopovređivanju ili samoubistvu</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose mt-1">•</span>
                <span>Intenzitet tuge ne opada ni nakon nekoliko meseci</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose mt-1">•</span>
                <span>Posežete za alkoholom ili drogama da biste se nosili sa bolom</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose mt-1">•</span>
                <span>Osećate se potpuno izolovano i nesposobno da razgovarate s bilo kim</span>
              </li>
            </ul>
          </div>

          <div className="card p-6 bg-sky-light/30 border border-sky/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-sky-light flex items-center justify-center flex-shrink-0">
                <PhoneIcon size={20} className="text-sky-dark" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Linije za pomoć u Srbiji</h3>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li>
                    <strong>Centar Srce:</strong>{' '}
                    <a href="tel:0800300303" className="text-sky hover:text-sky-dark">0800 300 303</a>
                    {' '}(besplatno, 24h)
                  </li>
                  <li>
                    <strong>Institut za mentalno zdravlje:</strong>{' '}
                    <a href="tel:0113307500" className="text-sky hover:text-sky-dark">011 3307 500</a>
                  </li>
                  <li>
                    <strong>SOS telefon za podršku:</strong>{' '}
                    <a href="tel:0800111123" className="text-sky hover:text-sky-dark">0800 111 123</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Kako pomoći drugima */}
        <section className="mb-12">
          <h2 className="heading-2 mb-6">Kako pomoći nekome ko tuguje</h2>

          <div className="card p-6">
            <p className="text-text-secondary mb-6">
              Ako neko u vašem okruženju prolazi kroz gubitak, možda se pitate kako
              da pomognete. Evo nekoliko saveta:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-sm font-bold">✓</span>
                </span>
                <div>
                  <strong className="text-text-primary">Budite prisutni</strong>
                  <p className="text-text-secondary text-sm mt-1">
                    Ponekad samo vaše prisustvo znači više od bilo kakvih reči.
                    Sedite pored osobe, držite je za ruku. Ne morate imati odgovore.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-sm font-bold">✓</span>
                </span>
                <div>
                  <strong className="text-text-primary">Slušajte bez saveta</strong>
                  <p className="text-text-secondary text-sm mt-1">
                    Dozvolite osobi da priča. Ne pokušavajte da "popravite" situaciju
                    ili da date savete. Samo slušajte sa saosećanjem.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-sm font-bold">✓</span>
                </span>
                <div>
                  <strong className="text-text-primary">Ponudite konkretnu pomoć</strong>
                  <p className="text-text-secondary text-sm mt-1">
                    Umesto "Javi ako ti nešto treba", recite "Doneću ti ručak u četvrtak"
                    ili "Mogu da povedem decu u školu sutra". Konkretne ponude su lakše prihvatiti.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-sm font-bold">✓</span>
                </span>
                <div>
                  <strong className="text-text-primary">Pominjite preminulog</strong>
                  <p className="text-text-secondary text-sm mt-1">
                    Nemojte izbegavati da pominjete preminulu osobu iz straha da ćete
                    rastužiti nekoga. Porodica želi da se o njima govori.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-rose-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-rose text-sm font-bold">×</span>
                </span>
                <div>
                  <strong className="text-text-primary">Izbegavajte klišee</strong>
                  <p className="text-text-secondary text-sm mt-1">
                    Fraze poput "Sve se dešava s razlogom" ili "Sad je na boljem mestu"
                    retko tešu. Bolje je reći "Žao mi je. Tu sam za tebe."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="card p-8 text-center bg-sand-light">
          <h2 className="heading-2 mb-4">Sačuvajte uspomene</h2>
          <p className="text-text-secondary mb-6">
            Kreiranje digitalnog memorijala može biti deo procesa ozdravljenja.
            Prikupljanje fotografija i pisanje o voljenoj osobi pomaže da
            sačuvate sećanja za generacije koje dolaze.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kreiraj-memorijal" className="btn-primary">
              Kreiraj memorijal
            </Link>
            <Link to="/kako-sacuvati-uspomene" className="btn-secondary">
              Više o čuvanju uspomena
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
