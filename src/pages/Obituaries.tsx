import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRecentObituaries } from '../lib/obituaries'
import type { Obituary } from '../types/obituary'
import ObituaryCard from '../components/ObituaryCard'
import SEO, { SEO_CONFIGS } from '../components/SEO'
import { useAuth } from '../contexts/AuthContext'
import { PlusIcon, SearchIcon } from '../components/icons/FeatureIcons'
import { EternalFlame } from '../components/icons/ReligiousSymbols'

export default function Obituaries() {
  const { session } = useAuth()
  const [obituaries, setObituaries] = useState<Obituary[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')

  useEffect(() => {
    loadObituaries()
  }, [])

  const loadObituaries = async () => {
    setLoading(true)
    const { data } = await getRecentObituaries(50)
    if (data) {
      setObituaries(data)
    }
    setLoading(false)
  }

  const filteredObituaries = obituaries.filter(obituary => {
    const matchesSearch = searchQuery === '' ||
      `${obituary.first_name} ${obituary.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLocation = locationFilter === '' ||
      (obituary.place_of_death?.toLowerCase().includes(locationFilter.toLowerCase()) ||
       obituary.funeral_location?.toLowerCase().includes(locationFilter.toLowerCase()))

    return matchesSearch && matchesLocation
  })

  // Extract unique locations for filter
  const locations = [...new Set(
    obituaries
      .map(o => o.place_of_death || o.funeral_location)
      .filter((loc): loc is string => Boolean(loc))
  )].slice(0, 10)

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-ivory">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-sky border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <SEO {...SEO_CONFIGS.obituaries} />

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-sand to-ivory py-12 border-b border-border-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="heading-1 mb-2">Čitulje</h1>
              <p className="text-text-secondary text-lg">Svi objavljeni osmrtnici i čitulje</p>
            </div>
            {session && (
              <Link
                to="/umrlica/nova"
                className="btn-primary flex items-center gap-2"
              >
                <PlusIcon size={18} />
                Objavi čitulju
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
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
                  placeholder="Ime i prezime..."
                  className="input pl-10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="location" className="label">
                Lokacija
              </label>
              <select
                id="location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="input"
              >
                <option value="">Sve lokacije</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-text-secondary mb-6">
          Prikazano {filteredObituaries.length} čitulja
        </p>

        {/* Grid */}
        {filteredObituaries.length === 0 ? (
          <div className="text-center py-16 card">
            <EternalFlame size={48} className="text-rose mx-auto mb-4" />
            <p className="text-text-secondary text-lg mb-4">Nema čitulja za prikaz</p>
            {session && (
              <Link
                to="/umrlica/nova"
                className="btn-primary"
              >
                Objavi prvu čitulju
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredObituaries.map(obituary => (
              <ObituaryCard key={obituary.id} obituary={obituary} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
