import { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { createObituary, publishObituary } from '../lib/obituaries'
import { getUserMemorials } from '../lib/memorials'
import type { CreateObituaryInput } from '../types/obituary'
import type { Memorial } from '../types/memorial'

export default function CreateObituary() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userMemorials, setUserMemorials] = useState<Memorial[]>([])
  const [useMemorial, setUseMemorial] = useState(false)
  const [selectedMemorialId, setSelectedMemorialId] = useState<string>('')

  const [formData, setFormData] = useState<CreateObituaryInput>({
    first_name: '',
    last_name: '',
    date_of_death: '',
    date_of_birth: '',
    place_of_death: '',
    content: '',
    funeral_date: '',
    funeral_time: '',
    funeral_location: '',
    funeral_address: '',
    funeral_notes: '',
    donations_enabled: false,
    donation_goal_cents: undefined,
    donation_charity_name: '',
    donation_charity_description: '',
  })

  useEffect(() => {
    if (session?.user?.id) {
      loadUserMemorials()
    }
  }, [session?.user?.id])

  const loadUserMemorials = async () => {
    if (!session?.user?.id) return
    const { data } = await getUserMemorials(session.user.id)
    if (data) {
      setUserMemorials(data)
    }
  }

  const handleMemorialSelect = (memorialId: string) => {
    setSelectedMemorialId(memorialId)
    const memorial = userMemorials.find(m => m.id === memorialId)
    if (memorial) {
      setFormData(prev => ({
        ...prev,
        memorial_id: memorialId,
        first_name: memorial.first_name,
        last_name: memorial.last_name,
        date_of_birth: memorial.date_of_birth || '',
        date_of_death: memorial.date_of_death,
        place_of_death: memorial.place_of_death || '',
      }))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (name === 'donation_goal') {
      // Convert EUR to cents
      const euros = parseFloat(value) || 0
      setFormData(prev => ({ ...prev, donation_goal_cents: euros * 100 }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: FormEvent, shouldPublish: boolean = false) => {
    e.preventDefault()
    setError(null)

    if (!session?.user?.id) {
      setError('Morate biti prijavljeni da biste kreirali umrlicu')
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
    if (!formData.date_of_death) {
      setError('Datum smrti je obavezan')
      return
    }

    setLoading(true)

    const input: CreateObituaryInput = {
      ...formData,
      memorial_id: useMemorial ? selectedMemorialId : undefined,
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
    }

    const { data, error: createError } = await createObituary(input, session.user.id)

    if (createError) {
      setError('Greska pri kreiranju umrlice. Pokusajte ponovo.')
      setLoading(false)
      return
    }

    if (data) {
      if (shouldPublish) {
        await publishObituary(data.id, session.user.id)
      }
      navigate(`/umrlica/${data.id}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Kreiraj umrlicu
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          {/* Memorial Link Section */}
          {userMemorials.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={useMemorial}
                  onChange={(e) => setUseMemorial(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="font-medium text-gray-700">Povezi sa postojecim memorijalom</span>
              </label>

              {useMemorial && (
                <select
                  value={selectedMemorialId}
                  onChange={(e) => handleMemorialSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Izaberi memorijal...</option>
                  {userMemorials.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.first_name} {m.last_name} ({m.date_of_death})
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {/* Deceased Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Podaci o preminulom</h2>
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
                  disabled={useMemorial && !!selectedMemorialId}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
                  disabled={useMemorial && !!selectedMemorialId}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                  Datum rodjenja
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  disabled={useMemorial && !!selectedMemorialId}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
                  disabled={useMemorial && !!selectedMemorialId}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="place_of_death" className="block text-sm font-medium text-gray-700 mb-1">
                  Mesto smrti
                </label>
                <input
                  type="text"
                  id="place_of_death"
                  name="place_of_death"
                  value={formData.place_of_death}
                  onChange={handleChange}
                  disabled={useMemorial && !!selectedMemorialId}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  placeholder="Grad, drzava"
                />
              </div>
            </div>
          </div>

          {/* Obituary Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Tekst umrlice
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Napisi tekst umrlice..."
            />
          </div>

          {/* Funeral Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Detalji sahrane</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="funeral_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Datum sahrane
                </label>
                <input
                  type="date"
                  id="funeral_date"
                  name="funeral_date"
                  value={formData.funeral_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="funeral_time" className="block text-sm font-medium text-gray-700 mb-1">
                  Vreme sahrane
                </label>
                <input
                  type="time"
                  id="funeral_time"
                  name="funeral_time"
                  value={formData.funeral_time}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="funeral_location" className="block text-sm font-medium text-gray-700 mb-1">
                  Lokacija
                </label>
                <input
                  type="text"
                  id="funeral_location"
                  name="funeral_location"
                  value={formData.funeral_location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Naziv groblja ili crkve"
                />
              </div>

              <div>
                <label htmlFor="funeral_address" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresa
                </label>
                <input
                  type="text"
                  id="funeral_address"
                  name="funeral_address"
                  value={formData.funeral_address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ulica i broj"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="funeral_notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Napomene
                </label>
                <textarea
                  id="funeral_notes"
                  name="funeral_notes"
                  value={formData.funeral_notes}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Dodatne informacije o sahrani..."
                />
              </div>
            </div>
          </div>

          {/* Donation Settings */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                name="donations_enabled"
                checked={formData.donations_enabled}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="font-medium text-gray-700">Omoguci donacije</span>
            </label>

            {formData.donations_enabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <label htmlFor="donation_goal" className="block text-sm font-medium text-gray-700 mb-1">
                    Cilj donacije (EUR)
                  </label>
                  <input
                    type="number"
                    id="donation_goal"
                    name="donation_goal"
                    value={formData.donation_goal_cents ? formData.donation_goal_cents / 100 : ''}
                    onChange={handleChange}
                    min="0"
                    step="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1000"
                  />
                </div>

                <div>
                  <label htmlFor="donation_charity_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Naziv dobrotvorne organizacije
                  </label>
                  <input
                    type="text"
                    id="donation_charity_name"
                    name="donation_charity_name"
                    value={formData.donation_charity_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Crveni krst, UNICEF..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="donation_charity_description" className="block text-sm font-medium text-gray-700 mb-1">
                    Opis svrhe donacije
                  </label>
                  <textarea
                    id="donation_charity_description"
                    name="donation_charity_description"
                    value={formData.donation_charity_description}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Umesto cveca, porodica moli da se donira..."
                  />
                </div>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-500">* Obavezna polja</p>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Cuvanje...' : 'Sacuvaj kao nacrt'}
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e as unknown as FormEvent, true)}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Objavljivanje...' : 'Objavi umrlicu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
