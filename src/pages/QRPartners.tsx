import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getQRPartners } from '../lib/qrPartners'
import { serbianCities } from '../data/serbianCities'
import type { QRPartner } from '../types/partners'
import QRPartnerCard from '../components/QRPartnerCard'
import SEO from '../components/SEO'
import { QRCodeIcon, SearchIcon, LocationIcon } from '../components/icons/FeatureIcons'

export default function QRPartners() {
  const [qrPartners, setQRPartners] = useState<QRPartner[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [cityFilter, setCityFilter] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const partnersResult = await getQRPartners()
    if (partnersResult.data) {
      setQRPartners(partnersResult.data)
    }
    setLoading(false)
  }

  const filteredPartners = qrPartners.filter(partner => {
    const matchesSearch = searchQuery === '' ||
      partner.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCity = cityFilter === '' ||
      partner.city.toLowerCase() === cityFilter.toLowerCase()

    return matchesSearch && matchesCity
  })

  const featuredPartners = filteredPartners.filter(p => p.is_featured || p.listing_tier === 'premium' || p.listing_tier === 'featured')
  const regularPartners = filteredPartners.filter(p => !p.is_featured && p.listing_tier !== 'premium' && p.listing_tier !== 'featured')

  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="QR Partneri - Izrada QR Pločica za Spomenike"
        description="Pronađite foto-radnje i štamparije koje izrađuju QR pločice za nadgrobne spomenike. Keramika, metal, akril - trajne pločice za digitalne memorijale u Srbiji."
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-sand to-ivory py-12 border-b border-border-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-sky/10 rounded-full">
              <QRCodeIcon size={32} className="text-sky" />
            </div>
            <div>
              <h1 className="heading-1 mb-1">QR Partneri</h1>
              <p className="text-text-secondary text-lg">Štamparije i foto-radnje za izradu QR pločica</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Detailed step-by-step guide */}
        <div className="bg-white border border-border-light rounded-xl p-6 md:p-8 mb-8 shadow-soft">
          <h2 className="font-serif text-xl font-semibold text-text-primary mb-6">
            Kako napraviti QR pločicu za spomenik?
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-sky text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Kupite QR kod na memorijalu</h3>
                <p className="text-text-secondary leading-relaxed">
                  Otvorite memorijal vašeg najbližeg na našoj platformi. Na stranici memorijala
                  kliknite na dugme <strong>"QR kod za spomenik"</strong>. Cena QR koda je <strong>5 EUR</strong> (jednokratno, plaćate samo jednom).
                  Nakon kupovine, moći ćete da preuzmete QR kod kao sliku na vaš računar ili telefon.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-sky text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Preuzmite QR kod na vaš uređaj</h3>
                <p className="text-text-secondary leading-relaxed">
                  Kliknite na dugme <strong>"PNG"</strong> ili <strong>"SVG"</strong> da preuzmete sliku QR koda.
                  PNG je za štampu na papiru ili stickeru. SVG je za gravuru ili veći kvalitet.
                  Slika će se sačuvati na vašem računaru (obično u folderu "Downloads" / "Preuzimanja").
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-sky text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Odnesite QR kod u foto-radnju ili štampariju</h3>
                <p className="text-text-secondary leading-relaxed">
                  Iz liste ispod odaberite radnju u vašem gradu. Pozovite ih telefonom ili posetite lično.
                  Pokažite im sačuvanu sliku QR koda (sa telefona ili USB-a) i recite da želite
                  <strong> QR pločicu za spomenik</strong>. Oni će vam ponuditi različite materijale
                  (keramika, metal, sticker) i veličine. Cena izrade pločice zavisi od radnje i materijala
                  (obično 1.500 - 5.000 RSD).
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-sky text-white rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Postavite pločicu na spomenik</h3>
                <p className="text-text-secondary leading-relaxed">
                  Kada dobijete gotovu pločicu, zalepite je na spomenik. Preporučujemo donji deo spomenika
                  ili bočnu stranu. Pločica ima lepljivu stranu ili dolazi sa lepkom.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-sage text-white rounded-full flex items-center justify-center font-bold text-lg">
                5
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Kako posetioci koriste QR kod?</h3>
                <p className="text-text-secondary leading-relaxed">
                  Kada neko dođe na grob, otvori <strong>kameru na svom mobilnom telefonu</strong> i
                  usmeri je ka QR kodu na pločici. Telefon će automatski prepoznati QR kod i ponuditi
                  da otvori link. Klikom na taj link, otvara se memorijal vašeg najbližeg - sa fotografijama,
                  biografijom i porukama od porodice i prijatelja.
                </p>
              </div>
            </div>
          </div>

          {/* Warning box */}
          <div className="mt-8 p-4 bg-rose-light/30 border border-rose/30 rounded-lg">
            <p className="text-rose-dark">
              <strong>Važno:</strong> Ne preporučujemo gravuru QR koda direktno na kamen spomenika.
              Zašto? Ako se QR kod ošteti ili izbledi, ne možete ga zameniti bez oštećenja kamena.
              Koristite lepljive pločice (keramika, metal, sticker) koje se mogu lako zameniti
              ako dođe do oštećenja.
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="label">
                Pretraga
              </label>
              <div className="relative">
                <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Naziv radnje..."
                  className="input pl-10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="city" className="label">
                Grad
              </label>
              <div className="relative">
                <LocationIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <select
                  id="city"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="input pl-10"
                >
                  <option value="">Svi gradovi</option>
                  {serbianCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-sky border-t-transparent"></div>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredPartners.length === 0 && (
          <div className="text-center py-16 card">
            <QRCodeIcon size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary text-lg mb-2">
              {searchQuery || cityFilter
                ? 'Nema rezultata za vašu pretragu.'
                : 'Još uvek nema registrovanih QR partnera.'}
            </p>
            <p className="text-text-muted text-sm">
              Ako želite da registrujete svoju radnju, kontaktirajte nas.
            </p>
          </div>
        )}

        {/* Featured Section */}
        {!loading && featuredPartners.length > 0 && (
          <div className="mb-10">
            <h2 className="heading-2 mb-6">Preporučeni partneri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPartners.map(partner => (
                <QRPartnerCard key={partner.id} qrPartner={partner} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Listings */}
        {!loading && regularPartners.length > 0 && (
          <div>
            {featuredPartners.length > 0 && (
              <h2 className="heading-2 mb-6">Svi partneri</h2>
            )}
            <p className="text-text-secondary mb-6">
              Prikazano {filteredPartners.length} partnera
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPartners.map(partner => (
                <QRPartnerCard key={partner.id} qrPartner={partner} />
              ))}
            </div>
          </div>
        )}

        {/* Materials info - simplified */}
        <div className="mt-12 card p-6 md:p-8">
          <h2 className="font-serif text-xl font-semibold text-text-primary mb-4">
            Koji materijal da odaberem?
          </h2>
          <p className="text-text-secondary mb-6">
            Kada odete u radnju, ponudiće vam različite materijale. Evo kratkog objašnjenja:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="py-3 pr-4 font-semibold text-text-primary">Materijal</th>
                  <th className="py-3 pr-4 font-semibold text-text-primary">Trajnost</th>
                  <th className="py-3 pr-4 font-semibold text-text-primary">Cena (okvirno)</th>
                  <th className="py-3 font-semibold text-text-primary">Preporuka</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border-light">
                  <td className="py-3 pr-4 font-medium">Sticker (nalepnica)</td>
                  <td className="py-3 pr-4">2-5 godina</td>
                  <td className="py-3 pr-4">500 - 1.500 RSD</td>
                  <td className="py-3">Najjeftinija opcija</td>
                </tr>
                <tr className="border-b border-border-light bg-sage-light/20">
                  <td className="py-3 pr-4 font-medium">Keramička pločica</td>
                  <td className="py-3 pr-4">10+ godina</td>
                  <td className="py-3 pr-4">2.000 - 4.000 RSD</td>
                  <td className="py-3 text-sage-dark font-medium">Preporučujemo</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-3 pr-4 font-medium">Metalna pločica</td>
                  <td className="py-3 pr-4">15+ godina</td>
                  <td className="py-3 pr-4">3.000 - 6.000 RSD</td>
                  <td className="py-3">Premium opcija</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Akrilna pločica</td>
                  <td className="py-3 pr-4">5-10 godina</td>
                  <td className="py-3 pr-4">2.000 - 4.000 RSD</td>
                  <td className="py-3">Moderan izgled</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-text-muted mt-4">
            * Cene su okvirne i zavise od radnje, veličine pločice i dizajna.
          </p>
        </div>

        {/* CTA for partners */}
        <div className="mt-8 bg-sky-light/30 border border-sky/30 rounded-xl p-8 text-center">
          <h3 className="font-serif text-xl font-semibold text-text-primary mb-2">
            Imate foto-radnju ili štampariju?
          </h3>
          <p className="text-text-secondary mb-4">
            Registrujte svoju radnju i povežite se sa porodicama koje traže izradu QR pločica.
            Popunite jednostavnu formu - traje samo 2 minuta.
          </p>
          <Link
            to="/postani-partner"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Registruj radnju
          </Link>
        </div>
      </div>
    </div>
  )
}
