import { useState, useEffect } from 'react'
import { getStoneMasons } from '../lib/stoneMasons'
import type { StoneMason } from '../types/partners'
import StoneMasonBanner from '../components/StoneMasonBanner'
import SEO, { SEO_CONFIGS } from '../components/SEO'
import { StoneMasonIcon, SearchIcon, LocationIcon } from '../components/icons/FeatureIcons'
import { serbianCities } from '../data/serbianCities'

export default function StoneMasons() {
  const [stoneMasons, setStoneMasons] = useState<StoneMason[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [cityFilter, setCityFilter] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const masonsResult = await getStoneMasons()
    if (masonsResult.data) {
      setStoneMasons(masonsResult.data)
    }
    setLoading(false)
  }

  const filteredMasons = stoneMasons.filter(mason => {
    const matchesSearch = searchQuery === '' ||
      mason.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mason.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCity = cityFilter === '' ||
      mason.city.toLowerCase() === cityFilter.toLowerCase()

    return matchesSearch && matchesCity
  })

  const premiumMasons = filteredMasons.filter(m => m.ad_tier === 'premium')
  const regularMasons = filteredMasons.filter(m => m.ad_tier !== 'premium')

  return (
    <div className="min-h-screen bg-ivory">
      <SEO {...SEO_CONFIGS.stoneMasons} />

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-sand to-ivory py-12 border-b border-border-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-rose/20 rounded-full">
              <StoneMasonIcon size={32} className="text-rose-dark" />
            </div>
            <div>
              <h1 className="heading-1 mb-1">Kamenorezačke radnje</h1>
              <p className="text-text-secondary text-lg">Izrada i postavljanje nadgrobnih spomenika</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
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
        {!loading && filteredMasons.length === 0 && (
          <div className="text-center py-16 card">
            <StoneMasonIcon size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary text-lg mb-2">
              {searchQuery || cityFilter
                ? 'Nema rezultata za vašu pretragu.'
                : 'Još uvek nema registrovanih kamenorezačkih radnji.'}
            </p>
            <p className="text-text-muted text-sm">
              Ako želite da registrujete svoju radnju, kontaktirajte nas.
            </p>
          </div>
        )}

        {/* Premium Listings (Banner style) */}
        {!loading && premiumMasons.length > 0 && (
          <div className="mb-10">
            <h2 className="heading-2 mb-6">Istaknute radnje</h2>
            <div className="space-y-6">
              {premiumMasons.map(mason => (
                <StoneMasonBanner key={mason.id} stoneMason={mason} variant="banner" />
              ))}
            </div>
          </div>
        )}

        {/* Regular Listings (Card style) */}
        {!loading && regularMasons.length > 0 && (
          <div>
            {premiumMasons.length > 0 && (
              <h2 className="heading-2 mb-6">Sve radnje</h2>
            )}
            <p className="text-text-secondary mb-6">
              Prikazano {filteredMasons.length} radnji
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularMasons.map(mason => (
                <StoneMasonBanner key={mason.id} stoneMason={mason} variant="card" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
