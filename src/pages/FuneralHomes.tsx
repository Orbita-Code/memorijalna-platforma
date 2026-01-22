import { useState, useEffect } from 'react'
import { getFuneralHomes } from '../lib/funeralHomes'
import type { FuneralHome } from '../types/partners'
import FuneralHomeCard from '../components/FuneralHomeCard'
import SEO, { SEO_CONFIGS } from '../components/SEO'
import { FuneralHomeIcon, SearchIcon, LocationIcon } from '../components/icons/FeatureIcons'
import { serbianCities } from '../data/serbianCities'

export default function FuneralHomes() {
  const [funeralHomes, setFuneralHomes] = useState<FuneralHome[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [cityFilter, setCityFilter] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const homesResult = await getFuneralHomes()
    if (homesResult.data) {
      setFuneralHomes(homesResult.data)
    }
    setLoading(false)
  }

  const filteredHomes = funeralHomes.filter(home => {
    const matchesSearch = searchQuery === '' ||
      home.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      home.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCity = cityFilter === '' ||
      home.city.toLowerCase() === cityFilter.toLowerCase()

    return matchesSearch && matchesCity
  })

  const featuredHomes = filteredHomes.filter(h => h.is_featured || h.listing_tier === 'premium' || h.listing_tier === 'featured')
  const regularHomes = filteredHomes.filter(h => !h.is_featured && h.listing_tier !== 'premium' && h.listing_tier !== 'featured')

  return (
    <div className="min-h-screen bg-ivory">
      <SEO {...SEO_CONFIGS.funeralHomes} />

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-sand to-ivory py-12 border-b border-border-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-sky/10 rounded-full">
              <FuneralHomeIcon size={32} className="text-sky" />
            </div>
            <div>
              <h1 className="heading-1 mb-1">Pogrebna preduzeća</h1>
              <p className="text-text-secondary text-lg">Pronađite pogrebno preduzeće u vašem gradu</p>
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
                  placeholder="Naziv preduzeća..."
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
        {!loading && filteredHomes.length === 0 && (
          <div className="text-center py-16 card">
            <FuneralHomeIcon size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary text-lg mb-2">
              {searchQuery || cityFilter
                ? 'Nema rezultata za vašu pretragu.'
                : 'Još uvek nema registrovanih pogrebnih preduzeća.'}
            </p>
            <p className="text-text-muted text-sm">
              Ako želite da registrujete svoje preduzeće, kontaktirajte nas.
            </p>
          </div>
        )}

        {/* Featured Section */}
        {!loading && featuredHomes.length > 0 && (
          <div className="mb-10">
            <h2 className="heading-2 mb-6">Istaknuta preduzeća</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredHomes.map(home => (
                <FuneralHomeCard key={home.id} funeralHome={home} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Listings */}
        {!loading && regularHomes.length > 0 && (
          <div>
            {featuredHomes.length > 0 && (
              <h2 className="heading-2 mb-6">Sva preduzeća</h2>
            )}
            <p className="text-text-secondary mb-6">
              Prikazano {filteredHomes.length} preduzeća
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularHomes.map(home => (
                <FuneralHomeCard key={home.id} funeralHome={home} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
