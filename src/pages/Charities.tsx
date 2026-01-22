import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { HeartIcon, ExternalLinkIcon } from '../components/icons/FeatureIcons'

interface Charity {
  id: string
  name: string
  description: string
  category: string
  website: string
  donationUrl?: string
  phone?: string
  email?: string
  logo?: string
}

const charities: Charity[] = [
  // Humanitarne organizacije
  {
    id: 'crveni-krst',
    name: 'Crveni krst Srbije',
    description: 'Nacionalna humanitarna organizacija koja pruža pomoć ugroženim kategorijama stanovništva, organizuje dobrovoljno davanje krvi i pruža prvu pomoć.',
    category: 'Humanitarne organizacije',
    website: 'https://www.redcross.org.rs',
    donationUrl: 'https://www.redcross.org.rs/donacije',
    phone: '+381 11 3032 125',
    email: 'info@redcross.org.rs'
  },
  {
    id: 'unicef',
    name: 'UNICEF Srbija',
    description: 'Fond Ujedinjenih nacija za decu radi na zaštiti prava dece, poboljšanju zdravlja, obrazovanja i zaštite najugroženije dece.',
    category: 'Humanitarne organizacije',
    website: 'https://www.unicef.org/serbia',
    donationUrl: 'https://www.unicef.org/serbia/donacije',
    phone: '+381 11 360 2100'
  },
  {
    id: 'caritas',
    name: 'Caritas Srbije',
    description: 'Humanitarna organizacija Katoličke crkve koja pruža pomoć siromašnima, bolesnima, izbeglicama i svima kojima je potrebna pomoć.',
    category: 'Humanitarne organizacije',
    website: 'https://caritas.rs',
    email: 'office@caritas.rs'
  },

  // Zdravstvo
  {
    id: 'tirsova',
    name: 'Univerzitetska dečja klinika Tiršova',
    description: 'Vodeća pedijatrijska ustanova u Srbiji. Donacije pomažu lečenju dece i nabavci medicinske opreme.',
    category: 'Zdravstvo',
    website: 'https://www.tirsova.rs',
    phone: '+381 11 206 0676'
  },
  {
    id: 'budi-human',
    name: 'Fondacija Budi human',
    description: 'Platforma za humanitarne akcije koja pomaže u prikupljanju sredstava za lečenje dece i odraslih u zemlji i inostranstvu.',
    category: 'Zdravstvo',
    website: 'https://www.budihuman.rs',
    donationUrl: 'https://www.budihuman.rs/sr/donacija'
  },
  {
    id: 'belhospice',
    name: 'BelHospice',
    description: 'Prva hospis organizacija u Srbiji koja pruža palijativnu negu onkološkim pacijentima i podršku njihovim porodicama.',
    category: 'Zdravstvo',
    website: 'https://www.bfrh.rs',
    phone: '+381 11 715 5710',
    email: 'office@bfrh.rs'
  },

  // Deca i mladi
  {
    id: 'nasa-deca',
    name: 'Fondacija Naša deca',
    description: 'Organizacija koja pomaže deci bez roditeljskog staranja i deci iz socijalno ugroženih porodica.',
    category: 'Deca i mladi',
    website: 'https://www.nasadeca.rs',
    email: 'office@nasadeca.rs'
  },
  {
    id: 'prijatelji-dece',
    name: 'Prijatelji dece Srbije',
    description: 'Najstarija dečja organizacija u Srbiji koja radi na zaštiti i unapređenju položaja dece.',
    category: 'Deca i mladi',
    website: 'https://www.prijateljidece.rs',
    phone: '+381 11 268 0234'
  },
  {
    id: 'sos-sela',
    name: 'SOS Dečija sela Srbije',
    description: 'Međunarodna organizacija koja pruža dom i porodicu deci bez roditeljskog staranja.',
    category: 'Deca i mladi',
    website: 'https://www.sos-decijasela.rs',
    donationUrl: 'https://www.sos-decijasela.rs/pomozite',
    phone: '+381 11 365 5070'
  },

  // Stariji
  {
    id: 'crveni-krst-stariji',
    name: 'Program pomoći starijima (Crveni krst)',
    description: 'Program Crvenog krsta za pomoć starim i iznemoglim osobama - dostava hrane, lekova i kućne posete.',
    category: 'Pomoć starijima',
    website: 'https://www.redcross.org.rs/sr/programi/pomoc-starijim-osobama'
  },
  {
    id: 'humana-srca',
    name: 'Udruženje Humana srca',
    description: 'Organizacija koja pruža podršku starijim osobama kroz posete, druženje i praktičnu pomoć.',
    category: 'Pomoć starijima',
    website: 'https://www.humanasrca.rs'
  },

  // Životinje
  {
    id: 'orca',
    name: 'ORCA',
    description: 'Organizacija za poštovanje i brigu o životinjama koja radi na zaštiti napuštenih životinja.',
    category: 'Zaštita životinja',
    website: 'https://www.orca.rs',
    email: 'office@orca.rs'
  },
  {
    id: 'animal-rescue',
    name: 'Animal Rescue Serbia',
    description: 'Volonterska organizacija za spasavanje i zbrinjavanje napuštenih pasa i mačaka.',
    category: 'Zaštita životinja',
    website: 'https://www.animalrescueserbia.org'
  },

  // Ekologija
  {
    id: 'mladi-istrazivaci',
    name: 'Mladi istraživači Srbije',
    description: 'Organizacija koja radi na zaštiti životne sredine i edukaciji mladih o ekologiji.',
    category: 'Ekologija',
    website: 'https://www.mis.org.rs',
    email: 'office@mis.org.rs'
  }
]

const categories = [...new Set(charities.map(c => c.category))]

export default function Charities() {
  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Dobrotvorne organizacije - Donacije u ime preminulih"
        description="Lista dobrotvornih organizacija u Srbiji kojima možete donirati umesto cveća. Crveni krst, UNICEF, dečije bolnice i druge humanitarne organizacije."
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sand to-ivory py-16 lg:py-20 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-light flex items-center justify-center mx-auto mb-6">
            <HeartIcon size={32} className="text-rose" />
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-medium text-text-primary mb-6">
            Dobrotvorne organizacije
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Sve više porodica bira donacije umesto cveća. Ovde ćete pronaći proverene
            organizacije kojima možete donirati u ime i sećanje na voljenu osobu.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
        {/* Info box */}
        <div className="card p-6 bg-sky-light/30 border border-sky/20 mb-12">
          <h2 className="font-semibold text-text-primary mb-2">Zašto donirati umesto cveća?</h2>
          <p className="text-text-secondary text-sm">
            Cveće i venci uvenu za nekoliko dana, ali donacija dobrotvornoj organizaciji
            može napraviti trajnu razliku u nečijem životu. Mnoge porodice u umrlicama
            navode da umesto cveća žele da prijatelji i rodbina doniraju organizacijama
            koje su bile bliske srcu preminule osobe — bilo da je to dečija bolnica,
            azil za životinje, ili humanitarna organizacija.
          </p>
        </div>

        {/* Kategorije i organizacije */}
        {categories.map(category => (
          <section key={category} className="mb-12">
            <h2 className="heading-2 mb-6 pb-2 border-b border-border-light">{category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {charities
                .filter(c => c.category === category)
                .map(charity => (
                  <div key={charity.id} className="card p-6 flex flex-col">
                    <h3 className="font-semibold text-text-primary mb-2">{charity.name}</h3>
                    <p className="text-text-secondary text-sm mb-4 flex-grow">
                      {charity.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      {charity.phone && (
                        <p className="text-text-muted">
                          <span className="font-medium">Tel:</span>{' '}
                          <a href={`tel:${charity.phone}`} className="text-sky hover:text-sky-dark">
                            {charity.phone}
                          </a>
                        </p>
                      )}
                      {charity.email && (
                        <p className="text-text-muted">
                          <span className="font-medium">Email:</span>{' '}
                          <a href={`mailto:${charity.email}`} className="text-sky hover:text-sky-dark">
                            {charity.email}
                          </a>
                        </p>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border-light flex gap-3">
                      <a
                        href={charity.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky hover:text-sky-dark text-sm font-medium flex items-center gap-1"
                      >
                        Sajt <ExternalLinkIcon size={14} />
                      </a>
                      {charity.donationUrl && (
                        <a
                          href={charity.donationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-rose hover:text-rose-dark text-sm font-medium flex items-center gap-1"
                        >
                          Doniraj <ExternalLinkIcon size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="card p-8 text-center bg-sand-light mt-12">
          <h2 className="heading-2 mb-4">Nedostaje neka organizacija?</h2>
          <p className="text-text-secondary mb-6">
            Ako znate za proverenu dobrotvornu organizaciju koju bismo trebali
            uključiti na listu, javite nam.
          </p>
          <Link to="/kontakt" className="btn-primary">
            Predloži organizaciju
          </Link>
        </section>

        {/* Kako donirati na memorijalu */}
        <section className="mt-12 card p-6">
          <h2 className="heading-2 mb-4">Kako omogućiti donacije na memorijalu?</h2>
          <p className="text-text-secondary mb-4">
            Kada kreirate memorijal, možete dodati informaciju o preferiranoj
            dobrotvornoj organizaciji. Posetioci memorijala će videti ovu preporuku
            i moći će direktno da doniraju u ime preminule osobe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/kreiraj-memorijal" className="btn-primary">
              Kreiraj memorijal
            </Link>
            <Link to="/kako-funkcionise" className="btn-secondary">
              Saznaj više
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
