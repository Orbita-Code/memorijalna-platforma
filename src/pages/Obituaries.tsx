import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRecentObituaries } from '../lib/obituaries'
import type { Obituary } from '../types/obituary'
import ObituaryCard from '../components/ObituaryCard'
import { useAuth } from '../contexts/AuthContext'

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
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Umrlice</h1>
          <p className="text-gray-600 mt-1">Svi objavljeni osmrtnici i umrlice</p>
        </div>
        {session && (
          <Link
            to="/umrlica/nova"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <span>+</span> Kreiraj umrlicu
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Pretraga
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ime i prezime..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Lokacija
            </label>
            <select
              id="location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <p className="text-gray-600 mb-4">
        Prikazano {filteredObituaries.length} umrlica
      </p>

      {/* Grid */}
      {filteredObituaries.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="text-4xl mb-4">&#128220;</div>
          <p className="text-gray-600">Nema umrlica za prikaz</p>
          {session && (
            <Link
              to="/umrlica/nova"
              className="inline-block mt-4 text-blue-600 hover:text-blue-800"
            >
              Kreiraj prvu umrlicu
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
  )
}
