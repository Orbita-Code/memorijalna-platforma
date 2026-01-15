import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { createLivingProfile, getUserLivingProfile } from '../lib/livingProfiles'
import type { CreateLivingProfileInput } from '../types/livingProfile'

export default function CreateLivingProfile() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<CreateLivingProfileInput>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    place_of_birth: '',
    father_name: '',
    mother_name: '',
    biography: '',
    activation_settings: {
      secret_phrase: '',
      require_verification: true,
      notify_family_on_activation: true,
    },
  })

  useEffect(() => {
    checkExistingProfile()
  }, [session?.user?.id])

  const checkExistingProfile = async () => {
    if (!session?.user?.id) {
      setChecking(false)
      return
    }

    const { data } = await getUserLivingProfile(session.user.id)
    if (data) {
      navigate('/moj-profil')
    }
    setChecking(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.startsWith('activation_')) {
      const settingName = name.replace('activation_', '')
      setFormData(prev => ({
        ...prev,
        activation_settings: {
          ...prev.activation_settings,
          [settingName]: value,
        },
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!session?.user?.id) {
      setError('Morate biti prijavljeni')
      return
    }

    if (!formData.first_name.trim()) {
      setError('Ime je obavezno')
      return
    }
    if (!formData.last_name.trim()) {
      setError('Prezime je obavezno')
      return
    }
    if (!formData.date_of_birth) {
      setError('Datum rodjenja je obavezan')
      return
    }

    setLoading(true)

    const { data, error: createError } = await createLivingProfile(formData, session.user.id)

    if (createError) {
      setError(createError.message)
      setLoading(false)
      return
    }

    if (data) {
      navigate('/moj-profil')
    }
  }

  if (checking) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Kreiraj moj zivotni profil
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Pripremite vas memorijal dok ste jos zivi. Porodica ce ga aktivirati kada dodje vreme.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Licni podaci</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ime *
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Prezime *
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                  Datum rodjenja *
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="place_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                  Mesto rodjenja
                </label>
                <input
                  type="text"
                  id="place_of_birth"
                  name="place_of_birth"
                  value={formData.place_of_birth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Grad, drzava"
                />
              </div>

              <div>
                <label htmlFor="father_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ime oca
                </label>
                <input
                  type="text"
                  id="father_name"
                  name="father_name"
                  value={formData.father_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="mother_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ime majke
                </label>
                <input
                  type="text"
                  id="mother_name"
                  name="mother_name"
                  value={formData.mother_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Biography */}
          <div>
            <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-1">
              Biografija
            </label>
            <textarea
              id="biography"
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Napisite nesto o sebi, svom zivotu, postignucima..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Mozete azurirati biografiju bilo kada
            </p>
          </div>

          {/* Activation Settings */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Podesavanja aktivacije
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Ova podesavanja odredjuju kako ce porodica aktivirati vas memorijal.
            </p>

            <div>
              <label htmlFor="activation_secret_phrase" className="block text-sm font-medium text-gray-700 mb-1">
                Tajna fraza
              </label>
              <input
                type="text"
                id="activation_secret_phrase"
                name="activation_secret_phrase"
                value={formData.activation_settings?.secret_phrase || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nesto sto samo porodica zna..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Porodica ce morati da unese ovu frazu da bi aktivirala memorijal
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500">* Obavezna polja</p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Kreiranje...' : 'Kreiraj profil'}
          </button>
        </form>
      </div>
    </div>
  )
}
