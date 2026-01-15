import { useState, useEffect, FormEvent, useCallback } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getMemorialById, updateMemorial } from '../lib/memorials'
import { getPendingCommentsCount } from '../lib/comments'
import type { UpdateMemorialInput, Memorial } from '../types/memorial'
import ModerationQueue from '../components/ModerationQueue'

export default function EditMemorial() {
  const { id } = useParams<{ id: string }>()
  const { session } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [memorial, setMemorial] = useState<Memorial | null>(null)
  const [pendingCount, setPendingCount] = useState(0)

  const [formData, setFormData] = useState<UpdateMemorialInput>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    date_of_death: '',
    place_of_birth: '',
    place_of_death: '',
    father_name: '',
    mother_name: '',
    biography: '',
  })

  const fetchPendingCount = useCallback(async () => {
    if (!id) return
    const { count } = await getPendingCommentsCount(id)
    setPendingCount(count)
  }, [id])

  useEffect(() => {
    async function fetchMemorial() {
      if (!id) {
        setError('Memorijal nije pronaden.')
        setLoading(false)
        return
      }

      const { data, error: fetchError } = await getMemorialById(id)

      if (fetchError || !data) {
        setError('Memorijal nije pronaden.')
        setLoading(false)
        return
      }

      // Check ownership
      if (session?.user?.id !== data.user_id) {
        setError('Nemate dozvolu da izmenite ovaj memorijal.')
        setLoading(false)
        return
      }

      setMemorial(data)
      setFormData({
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: data.date_of_birth,
        date_of_death: data.date_of_death,
        place_of_birth: data.place_of_birth,
        place_of_death: data.place_of_death,
        father_name: data.father_name || '',
        mother_name: data.mother_name || '',
        biography: data.biography || '',
      })
      setLoading(false)

      // Fetch pending comments count
      const { count } = await getPendingCommentsCount(id)
      setPendingCount(count)
    }

    fetchMemorial()
  }, [id, session?.user?.id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!session?.user?.id) {
      setError('Morate biti prijavljeni da biste izmenili memorijal')
      return
    }

    if (!id) {
      setError('Memorijal nije pronaden')
      return
    }

    // Validate required fields
    if (!formData.first_name?.trim()) {
      setError('Ime je obavezno')
      return
    }
    if (!formData.last_name?.trim()) {
      setError('Prezime je obavezno')
      return
    }
    if (!formData.date_of_birth) {
      setError('Datum rodjenja je obavezan')
      return
    }
    if (!formData.date_of_death) {
      setError('Datum smrti je obavezan')
      return
    }
    if (!formData.place_of_birth?.trim()) {
      setError('Mesto rodjenja je obavezno')
      return
    }
    if (!formData.place_of_death?.trim()) {
      setError('Mesto smrti je obavezno')
      return
    }

    // Validate dates
    if (
      new Date(formData.date_of_death!) < new Date(formData.date_of_birth!)
    ) {
      setError('Datum smrti ne moze biti pre datuma rodjenja')
      return
    }

    setSaving(true)

    const input: UpdateMemorialInput = {
      first_name: formData.first_name?.trim(),
      last_name: formData.last_name?.trim(),
      date_of_birth: formData.date_of_birth,
      date_of_death: formData.date_of_death,
      place_of_birth: formData.place_of_birth?.trim(),
      place_of_death: formData.place_of_death?.trim(),
      father_name: formData.father_name?.trim() || null,
      mother_name: formData.mother_name?.trim() || null,
      biography: formData.biography?.trim() || null,
    }

    const { error: updateError } = await updateMemorial(
      id,
      input,
      session.user.id
    )

    if (updateError) {
      setError(
        updateError.message || 'Greska pri cuvanju memorijala. Pokusajte ponovo.'
      )
      setSaving(false)
      return
    }

    navigate(`/memorijal/${id}`)
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ucitavanje...</p>
        </div>
      </div>
    )
  }

  if (error && !memorial) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-400 mb-4">Greska</h1>
          <p className="text-gray-600 text-lg mb-4">{error}</p>
          <Link
            to="/memorijali"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Nazad na memorijale
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Izmeni memorijal</h1>
          <Link
            to={`/memorijal/${id}`}
            className="text-gray-500 hover:text-gray-700"
          >
            Odustani
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ime *
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ime preminulog"
              />
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Prezime *
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Prezime preminulog"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date_of_birth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Datum rodjenja *
              </label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="date_of_death"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Datum smrti *
              </label>
              <input
                type="date"
                id="date_of_death"
                name="date_of_death"
                value={formData.date_of_death}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="place_of_birth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mesto rodjenja *
              </label>
              <input
                type="text"
                id="place_of_birth"
                name="place_of_birth"
                value={formData.place_of_birth}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Grad, drzava"
              />
            </div>

            <div>
              <label
                htmlFor="place_of_death"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mesto smrti *
              </label>
              <input
                type="text"
                id="place_of_death"
                name="place_of_death"
                value={formData.place_of_death}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Grad, drzava"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="father_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ime oca
              </label>
              <input
                type="text"
                id="father_name"
                name="father_name"
                value={formData.father_name || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ime oca (opciono)"
              />
            </div>

            <div>
              <label
                htmlFor="mother_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ime majke
              </label>
              <input
                type="text"
                id="mother_name"
                name="mother_name"
                value={formData.mother_name || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ime majke (opciono)"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="biography"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Biografija
            </label>
            <textarea
              id="biography"
              name="biography"
              value={formData.biography || ''}
              onChange={handleChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              placeholder="Napisite biografiju preminulog (opciono)"
            />
          </div>

          <p className="text-sm text-gray-500">* Obavezna polja</p>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Cuvanje...' : 'Sacuvaj izmene'}
            </button>
            <Link
              to={`/memorijal/${id}`}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Odustani
            </Link>
          </div>
        </form>
      </div>

      {/* Comments Moderation Section */}
      {id && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Moderacija komentara
              {pendingCount > 0 && (
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  {pendingCount} na cekanju
                </span>
              )}
            </h2>
          </div>
          <ModerationQueue
            memorialId={id}
            onUpdate={fetchPendingCount}
          />
        </div>
      )}
    </div>
  )
}
