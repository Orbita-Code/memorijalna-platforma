import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import { CommentsIcon, HeartIcon } from '../../components/icons/FeatureIcons'

export default function HowToWriteTribute() {
  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Kako ostaviti posvetu - Pisanje sećanja na voljene"
        description="Naučite kako da napišete dirljivu posvetu za memorijal. Primeri posveta, saveti za pisanje i kako izraziti saučešće porodici preminule osobe."
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sand to-ivory py-16 lg:py-20 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="text-sky hover:text-sky-dark text-sm mb-4 inline-block">
            ← Nazad na početnu
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center">
              <CommentsIcon size={28} className="text-sage" />
            </div>
            <div>
              <p className="text-sage font-medium text-sm">Podrška porodicama</p>
              <h1 className="font-serif text-3xl lg:text-4xl font-medium text-text-primary">
                Kako ostaviti posvetu
              </h1>
            </div>
          </div>
          <p className="text-lg text-text-secondary max-w-3xl">
            Posveta je način da podelite svoja sećanja i izrazite saučešće porodici.
            Ovaj vodič će vam pomoći da napišete iskrenu i dirljivu poruku.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
        {/* Uvod */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-text-secondary leading-relaxed">
            Kada posetite memorijal preminule osobe, prirodno je želeti da ostavite
            poruku — za porodicu, ali i kao trajni zapis vašeg odnosa sa tom osobom.
            Posvete čine memorijal živim, jer pokazuju koliko je ljudi ta osoba dodirnula
            tokom svog života.
          </p>
        </div>

        {/* Šta napisati */}
        <section className="mb-12">
          <h2 className="heading-2 mb-6">Šta možete napisati u posveti</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="w-10 h-10 rounded-full bg-sky-light flex items-center justify-center mb-4">
                <HeartIcon size={20} className="text-sky-dark" />
              </div>
              <h3 className="font-semibold text-text-primary mb-3">Lično sećanje</h3>
              <p className="text-text-secondary text-sm mb-4">
                Podelite specifičan trenutak koji pamtite sa tom osobom — zajednički
                doživljaj, razgovor, ili nešto što vas je nasmejalo.
              </p>
              <p className="text-text-muted text-sm italic">
                "Pamtim kako smo satima pričali na terasi dok je padala kiša.
                Njeni saveti su me vodili kroz život."
              </p>
            </div>

            <div className="card p-6">
              <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center mb-4">
                <HeartIcon size={20} className="text-sage" />
              </div>
              <h3 className="font-semibold text-text-primary mb-3">Osobine koje pamtite</h3>
              <p className="text-text-secondary text-sm mb-4">
                Opišite šta je tu osobu činilo posebnom — njen osmeh, smisao za humor,
                dobrotu, mudrost, strpljenje...
              </p>
              <p className="text-text-muted text-sm italic">
                "Njena vrata su uvek bila otvorena za sve. Imala je dar da svakog
                učini da se oseća dobrodošlim."
              </p>
            </div>

            <div className="card p-6">
              <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center mb-4">
                <HeartIcon size={20} className="text-rose" />
              </div>
              <h3 className="font-semibold text-text-primary mb-3">Uticaj na vaš život</h3>
              <p className="text-text-secondary text-sm mb-4">
                Kako je ta osoba uticala na vas? Šta ste naučili od nje?
                Kako je oblikovala osobu koja ste danas?
              </p>
              <p className="text-text-muted text-sm italic">
                "Naučio me je da nikada ne odustajem. Zahvaljujući njemu, našao sam
                snagu da idem za svojim snovima."
              </p>
            </div>

            <div className="card p-6">
              <div className="w-10 h-10 rounded-full bg-sky-light flex items-center justify-center mb-4">
                <HeartIcon size={20} className="text-sky-dark" />
              </div>
              <h3 className="font-semibold text-text-primary mb-3">Poruka porodici</h3>
              <p className="text-text-secondary text-sm mb-4">
                Izrazite saučešće porodici. Recite im da mislite na njih i da delite
                njihovu tugu.
              </p>
              <p className="text-text-muted text-sm italic">
                "Draga porodico, delim vaš bol. Znajte da je ostavila dubok trag
                u srcima svih nas koji smo je poznavali."
              </p>
            </div>
          </div>
        </section>

        {/* Primeri posveta */}
        <section className="mb-12">
          <h2 className="heading-2 mb-6">Primeri posveta</h2>

          <div className="space-y-6">
            <div className="card p-6 border-l-4 border-sky">
              <p className="text-text-secondary italic mb-3">
                "Draga tetka Milice, hvala ti za sve subote provedene u tvojoj kuhinji,
                za priče o detinjstvu moje mame, za kolače koji su uvek čekali na stolu.
                Tvoja toplina i ljubav ostaće zauvek u mom srcu. Počivaj u miru."
              </p>
              <p className="text-text-muted text-sm">— Nevena, sestrična</p>
            </div>

            <div className="card p-6 border-l-4 border-sage">
              <p className="text-text-secondary italic mb-3">
                "Profesore, hvala vam što ste u meni probudili ljubav prema književnosti.
                Vaši časovi nisu bili samo predavanja — bili su prozori u nove svetove.
                Generacije učenika pamtiće vas sa zahvalnošću."
              </p>
              <p className="text-text-muted text-sm">— Marko, bivši učenik</p>
            </div>

            <div className="card p-6 border-l-4 border-rose">
              <p className="text-text-secondary italic mb-3">
                "Moj dragi prijatelju, ko će me sada tešiti kad je teško? Ko će me
                naterati da se smejem kad mi nije do smeha? Trideset godina prijateljstva
                nije dovoljno. Nedostajaćeš mi više nego što reči mogu da izraze."
              </p>
              <p className="text-text-muted text-sm">— Zoran, prijatelj iz detinjstva</p>
            </div>

            <div className="card p-6 border-l-4 border-sky">
              <p className="text-text-secondary italic mb-3">
                "Draga porodico Petrović, primite naše najiskrenije saučešće. Milica
                je bila divna žena i draga komšinica. Uvek će nam nedostajati njeni
                saveti iz bašte i njeni ukusni kolači koje je delila sa celom zgradom."
              </p>
              <p className="text-text-muted text-sm">— Komšije iz zgrade</p>
            </div>
          </div>
        </section>

        {/* Saveti */}
        <section className="mb-12">
          <h2 className="heading-2 mb-6">Saveti za pisanje posveta</h2>

          <div className="card p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-sm font-bold">1</span>
                </span>
                <div>
                  <strong className="text-text-primary">Budite iskreni</strong>
                  <p className="text-text-secondary text-sm mt-1">
                    Ne pokušavajte da zvučite formalno ili uzvišeno. Najbolje posvete dolaze
                    iz srca i izražavaju vaša istinska osećanja.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-sm font-bold">2</span>
                </span>
                <div>
                  <strong className="text-text-primary">Budite konkretni</strong>
                  <p className="text-text-secondary text-sm mt-1">
                    Umesto opštih fraza, podelite specifično sećanje ili detalj.
                    To čini posvetu mnogo ličnijom i značajnijom za porodicu.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-sm font-bold">3</span>
                </span>
                <div>
                  <strong className="text-text-primary">Ne plašite se emocija</strong>
                  <p className="text-text-secondary text-sm mt-1">
                    U redu je izraziti tugu, bol, pa čak i bes zbog gubitka.
                    Autentičnost je važnija od savršene forme.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-sm font-bold">4</span>
                </span>
                <div>
                  <strong className="text-text-primary">Kratko je često bolje</strong>
                  <p className="text-text-secondary text-sm mt-1">
                    Ne morate napisati esej. Ponekad je jedna iskrena rečenica
                    vrednija od stranice teksta.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-sm font-bold">5</span>
                </span>
                <div>
                  <strong className="text-text-primary">Potpišite se</strong>
                  <p className="text-text-secondary text-sm mt-1">
                    Navedite svoje ime i vezu sa preminulom osobom (prijatelj, kolega, komšija).
                    To pomaže porodici da razume kontekst vaše posvete.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Šta izbegavati */}
        <section className="mb-12">
          <h2 className="heading-2 mb-6">Šta izbegavati</h2>

          <div className="card p-6 bg-rose/5 border border-rose/20">
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-rose mt-1">×</span>
                <span>Generičke fraze bez ličnog dodira ("Bio/la je dobra osoba")</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose mt-1">×</span>
                <span>Nagađanja o uzroku smrti ili okolnostima</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose mt-1">×</span>
                <span>Pominjanje sukoba ili negativnih trenutaka</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose mt-1">×</span>
                <span>Saveti kako se porodica treba osećati ("Treba da budete jaki")</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose mt-1">×</span>
                <span>Poređenja sa sopstvenim gubicima ("Znam kako se osećate jer...")</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="card p-8 text-center bg-sand-light">
          <h2 className="heading-2 mb-4">Pronađite memorijal</h2>
          <p className="text-text-secondary mb-6">
            Pretražite memorijale i ostavite posvetu osobi koju ste poznavali.
            Vaše reči znače mnogo porodici.
          </p>
          <Link to="/memorijali" className="btn-primary">
            Pretraži memorijale
          </Link>
        </section>
      </div>
    </div>
  )
}
