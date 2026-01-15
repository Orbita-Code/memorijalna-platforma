import { useEffect, useState } from 'react'
import type { Memorial } from '../types/memorial'
import { getMemorials } from '../lib/memorials'
import MemorialCard from '../components/MemorialCard'

export default function Memorials() {
  const [memorials, setMemorials] = useState<Memorial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMemorials() {
      const { data, error } = await getMemorials()
      if (error) {
        setError('Doslo je do greske prilikom ucitavanja memorijala.')
      } else {
        setMemorials(data || [])
      }
      setLoading(false)
    }

    fetchMemorials()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Memorijali
      </h1>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && memorials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            Jos uvek nema memorijala.
          </p>
        </div>
      )}

      {!loading && !error && memorials.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memorials.map((memorial) => (
            <MemorialCard key={memorial.id} memorial={memorial} />
          ))}
        </div>
      )}
    </div>
  )
}
