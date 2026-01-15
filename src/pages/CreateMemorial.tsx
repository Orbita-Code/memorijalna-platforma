import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { createMemorial } from '../lib/memorials'
import type { CreateMemorialInput } from '../types/memorial'
import { findPotentialDuplicates } from '../lib/duplicateDetection'
import type { DuplicateMatch } from '../lib/duplicateDetection'
import DuplicateWarning from '../components/DuplicateWarning'

export default function CreateMemorial() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [duplicates, setDuplicates] = useState<DuplicateMatch[]>([])
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false)
  const [skipDuplicateCheck, setSkipDuplicateCheck] = useState(false)

  const [formData, setFormData] = useState<CreateMemorialInput>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    date_of_death: '',
    place_of_birth: '',
    place_of_death: '',
    father_name: '',
    mother_name: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!session?.user?.id) {
      setError('Morate biti prijavljeni da biste kreirali memorijal')
      return
    }

    // Validate required fields
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
    if (!formData.date_of_death) {
      setError('Datum smrti je obavezan')
      return
    }
    if (!formData.place_of_birth.trim()) {
      setError('Mesto rodjenja je obavezno')
      return
    }
    if (!formData.place_of_death.trim()) {
      setError('Mesto smrti je obavezno')
      return
    }

    // Validate dates
    if (new Date(formData.date_of_death) < new Date(formData.date_of_birth)) {
      setError('Datum smrti ne moze biti pre datuma rodjenja')
      return
    }

    // Check for duplicates before creating
    if (!skipDuplicateCheck) {
      setChecking(true)
      const matches = await findPotentialDuplicates({
        first_name: formData.first_name,
        last_name: formData.last_name,
        date_of_birth: formData.date_of_birth,
        date_of_death: formData.date_of_death,
        place_of_birth: formData.place_of_birth,
        place_of_death: formData.place_of_death,
      })
      setChecking(false)

      if (matches.length > 0) {
        setDuplicates(matches)
        setShowDuplicateWarning(true)
        return
      }
    }

    setLoading(true)

    const input: CreateMemorialInput = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      date_of_birth: formData.date_of_birth,
      date_of_death: formData.date_of_death,
      place_of_birth: formData.place_of_birth.trim(),
      place_of_death: formData.place_of_death.trim(),
      father_name: formData.father_name?.trim() || undefined,
      mother_name: formData.mother_name?.trim() || undefined,
    }

    const { data, error: createError } = await createMemorial(input, session.user.id)

    if (createError) {
      setError('Greska pri kreiranju memorijala. Pokusajte ponovo.')
      setLoading(false)
      return
    }

    if (data) {
      navigate(`/memorijal/${data.id}`)
    }
  }

  const handleProceedWithCreate = () => {
    setShowDuplicateWarning(false)
    setSkipDuplicateCheck(true)
    // Re-submit the form
    const form = document.querySelector('form')
    if (form) {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    }
  }

  const handleCancelDuplicate = () => {
    setShowDuplicateWarning(false)
    setDuplicates([])
  }

  return (
    <>
      {showDuplicateWarning && (
        <DuplicateWarning
          matches={duplicates}
          onProceed={handleProceedWithCreate}
          onCancel={handleCancelDuplicate}
        />
      )}

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Kreiraj memorijal
          </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ime preminulog"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Prezime preminulog"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="place_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="place_of_death" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="father_name" className="block text-sm font-medium text-gray-700 mb-1">
                Ime oca
              </label>
              <input
                type="text"
                id="father_name"
                name="father_name"
                value={formData.father_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ime oca (opciono)"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ime majke (opciono)"
              />
            </div>
          </div>

          <p className="text-sm text-gray-500">
            * Obavezna polja
          </p>

          <button
            type="submit"
            disabled={loading || checking}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {checking ? 'Provera duplikata...' : loading ? 'Kreiranje u toku...' : 'Kreiraj memorijal'}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
