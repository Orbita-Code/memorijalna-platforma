import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { Memorial } from '../types/memorial'
import { getMemorials } from '../lib/memorials'
import MemorialCard from '../components/MemorialCard'
import SEO, { SEO_CONFIGS } from '../components/SEO'
import { SearchIcon, PlusIcon } from '../components/icons/FeatureIcons'
import { EternalFlame } from '../components/icons/ReligiousSymbols'
import { useAuth } from '../contexts/AuthContext'

export default function Memorials() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const [memorials, setMemorials] = useState<Memorial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Search state - initialized from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [placeFilter, setPlaceFilter] = useState(searchParams.get('death_place') || '')
  const [yearFilter, setYearFilter] = useState(searchParams.get('year_of_death') || '')

  useEffect(() => {
    async function fetchMemorials() {
      const { data, error: fetchError } = await getMemorials()
      if (fetchError) {
        setError('Došlo je do greške prilikom učitavanja memorijala.')
      } else {
        setMemorials(data || [])
      }
      setLoading(false)
    }

    fetchMemorials()
  }, [])

  // Filter memorials based on search criteria
  const filteredMemorials = memorials.filter(memorial => {
    const matchesSearch = searchQuery === '' ||
      `${memorial.first_name} ${memorial.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPlace = placeFilter === '' ||
      memorial.death_place?.toLowerCase().includes(placeFilter.toLowerCase())

    const matchesYear = yearFilter === '' ||
      (memorial.death_date && new Date(memorial.death_date).getFullYear().toString() === yearFilter)

    return matchesSearch && matchesPlace && matchesYear
  })

  // Get unique places for filtering
  const places = [...new Set(
    memorials
      .map(m => m.death_place)
      .filter((place): place is string => Boolean(place))
  )].sort().slice(0, 20)

  // Get unique years for filtering
  const years = [...new Set(
    memorials
      .filter(m => m.death_date)
      .map(m => new Date(m.death_date!).getFullYear())
  )].sort((a, b) => b - a).slice(0, 20)

  return (
    <div className="min-h-screen bg-ivory">
      <SEO {...SEO_CONFIGS.memorials} />

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-sand to-ivory py-12 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="heading-1 mb-2">Memorijali</h1>
              <p className="text-text-secondary text-lg">Sećanja koja ostaju zauvek</p>
            </div>
            {user && (
              <Link
                to="/kreiraj-memorijal"
                className="btn-primary flex items-center gap-2"
              >
                <PlusIcon size={18} />
                Kreiraj memorijal
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <label htmlFor="place" className="label">
                Mesto
              </label>
              <select
                id="place"
                value={placeFilter}
                onChange={(e) => setPlaceFilter(e.target.value)}
                className="input"
              >
                <option value="">Sva mesta</option>
                {places.map(place => (
                  <option key={place} value={place}>{place}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="year" className="label">
                Godina
              </label>
              <select
                id="year"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="input"
              >
                <option value="">Sve godine</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-sky border-t-transparent"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="alert-error text-center py-8">
            <p>{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredMemorials.length === 0 && (
          <div className="text-center py-16 card">
            <EternalFlame size={48} className="text-rose mx-auto mb-4" />
            <p className="text-text-secondary text-lg mb-4">
              {searchQuery || placeFilter || yearFilter
                ? 'Nema memorijala koji odgovaraju pretrazi.'
                : 'Još uvek nema memorijala.'}
            </p>
            {user && !searchQuery && !placeFilter && !yearFilter && (
              <Link to="/kreiraj-memorijal" className="btn-primary">
                Kreiraj prvi memorijal
              </Link>
            )}
          </div>
        )}

        {/* Results count */}
        {!loading && !error && filteredMemorials.length > 0 && (
          <p className="text-text-secondary mb-6">
            Prikazano {filteredMemorials.length} memorijala
          </p>
        )}

        {/* Grid */}
        {!loading && !error && filteredMemorials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemorials.map((memorial) => (
              <MemorialCard key={memorial.id} memorial={memorial} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
