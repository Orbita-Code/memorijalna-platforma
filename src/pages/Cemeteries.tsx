import { useState, useEffect } from 'react'
import { getCemeteries } from '../lib/cemeteries'
import type { Cemetery } from '../types/partners'
import CemeteryCard from '../components/CemeteryCard'
import SEO, { SEO_CONFIGS } from '../components/SEO'
import { CemeteryIcon, SearchIcon, LocationIcon } from '../components/icons/FeatureIcons'
import { serbianCities } from '../data/serbianCities'

export default function Cemeteries() {
  const [cemeteries, setCemeteries] = useState<Cemetery[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [cityFilter, setCityFilter] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const cemeteriesResult = await getCemeteries()
    if (cemeteriesResult.data) {
      setCemeteries(cemeteriesResult.data)
    }
    setLoading(false)
  }

  const filteredCemeteries = cemeteries.filter(cemetery => {
    const matchesSearch = searchQuery === '' ||
      cemetery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cemetery.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCity = cityFilter === '' ||
      cemetery.city.toLowerCase() === cityFilter.toLowerCase()

    return matchesSearch && matchesCity
  })

  return (
    <div className="min-h-screen bg-ivory">
      <SEO {...SEO_CONFIGS.cemeteries} />

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-sand to-ivory py-12 border-b border-border-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-sage/20 rounded-full">
              <CemeteryIcon size={32} className="text-sage-dark" />
            </div>
            <div>
              <h1 className="heading-1 mb-1">Groblja</h1>
              <p className="text-text-secondary text-lg">Informacije o grobljima u Srbiji</p>
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
                  placeholder="Naziv ili adresa..."
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
        {!loading && filteredCemeteries.length === 0 && (
          <div className="text-center py-16 card">
            <CemeteryIcon size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary text-lg mb-2">
              {searchQuery || cityFilter
                ? 'Nema rezultata za vašu pretragu.'
                : 'Još uvek nema registrovanih grobalja.'}
            </p>
            <p className="text-text-muted text-sm">
              Ako želite da dodate informacije o groblju, kontaktirajte nas.
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && filteredCemeteries.length > 0 && (
          <>
            <p className="text-text-secondary mb-6">
              Prikazano {filteredCemeteries.length} grobalja
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCemeteries.map(cemetery => (
                <CemeteryCard key={cemetery.id} cemetery={cemetery} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
