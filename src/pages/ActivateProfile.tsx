import { useState, useEffect, FormEvent } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getLivingProfileById, activateProfile } from '../lib/livingProfiles'
import type { LivingProfile } from '../types/livingProfile'

export default function ActivateProfile() {
  const { id } = useParams<{ id: string }>()
  const { session } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<LivingProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activating, setActivating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ memorialId: string } | null>(null)

  const [formData, setFormData] = useState({
    secret_phrase: '',
    date_of_death: '',
    confirm: false,
  })

  useEffect(() => {
    if (id) {
      loadProfile()
    }
  }, [id])

  const loadProfile = async () => {
    if (!id) return

    const { data, error: fetchError } = await getLivingProfileById(id)

    if (fetchError || !data) {
      setError('Profil nije pronaden')
      setLoading(false)
      return
    }

    if (data.status === 'converted') {
      setError('Ovaj profil je vec aktiviran')
    }

    setProfile(data)
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!profile || !session?.user?.id) {
      setError('Morate biti prijavljeni')
      return
    }

    if (!formData.secret_phrase.trim()) {
      setError('Unesite tajnu frazu')
      return
    }

    if (!formData.date_of_death) {
      setError('Unesite datum smrti')
      return
    }

    if (!formData.confirm) {
      setError('Morate potvrditi aktivaciju')
      return
    }

    setActivating(true)

    const { data, error: activateError } = await activateProfile(
      profile.id,
      formData.secret_phrase,
      formData.date_of_death,
      session.user.id
    )

    if (activateError) {
      setError(activateError.message)
      setActivating(false)
      return
    }

    if (data) {
      setSuccess(data)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">&#10004;</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Memorijal je kreiran</h1>
          <p className="text-gray-600 mb-4">
            Zivotni profil je uspesno konvertovan u memorijal.
          </p>
          <Link
            to={`/memorijal/${success.memorialId}`}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Pogledaj memorijal
          </Link>
        </div>
      </div>
    )
  }

  if (!profile || profile.status === 'converted') {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
          {error || 'Profil nije dostupan za aktivaciju'}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">&#128591;</div>
          <h1 className="text-2xl font-bold text-gray-900">
            Aktivacija memorijala
          </h1>
          <p className="text-gray-600 mt-2">
            Aktivirajte memorijal za{' '}
            <span className="font-semibold">
              {profile.first_name} {profile.last_name}
            </span>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Vazno:</strong> Aktivacija memorijala je nepovratna akcija.
            Zivotni profil ce biti trajno konvertovan u javni memorijal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="secret_phrase" className="block text-sm font-medium text-gray-700 mb-1">
              Tajna fraza *
            </label>
            <input
              type="text"
              id="secret_phrase"
              name="secret_phrase"
              value={formData.secret_phrase}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Unesite tajnu frazu"
            />
            <p className="text-sm text-gray-500 mt-1">
              Ovu frazu je postavio vlasnik profila
            </p>
          </div>

          <div>
            <label htmlFor="date_of_death" className="block text-sm font-medium text-gray-700 mb-1">
              Datum smrti *
            </label>
            <input
              type="date"
              id="date_of_death"
              name="date_of_death"
              value={formData.date_of_death}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="confirm"
                checked={formData.confirm}
                onChange={handleChange}
                required
                className="w-5 h-5 text-blue-600 rounded mt-0.5"
              />
              <span className="text-sm text-gray-700">
                Potvrdaujem da je{' '}
                <strong>{profile.first_name} {profile.last_name}</strong>{' '}
                preminuo/la i zelim da aktiviram memorijal. Razumem da je ova akcija nepovratna.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={activating || !formData.confirm}
            className="w-full bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {activating ? 'Aktivacija u toku...' : 'Aktiviraj memorijal'}
          </button>
        </form>
      </div>
    </div>
  )
}
