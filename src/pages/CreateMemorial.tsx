import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { createMemorial } from '../lib/memorials'
import type { CreateMemorialInput } from '../types/memorial'
import { findPotentialDuplicates } from '../lib/duplicateDetection'
import type { DuplicateMatch } from '../lib/duplicateDetection'
import DuplicateWarning from '../components/DuplicateWarning'
import SEO from '../components/SEO'

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
    birth_date: '',
    death_date: '',
    birth_place: '',
    death_place: '',
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
    if (!formData.birth_date) {
      setError('Datum rodjenja je obavezan')
      return
    }
    if (!formData.death_date) {
      setError('Datum smrti je obavezan')
      return
    }
    if (!formData.birth_place?.trim()) {
      setError('Mesto rodjenja je obavezno')
      return
    }
    if (!formData.death_place?.trim()) {
      setError('Mesto smrti je obavezno')
      return
    }

    // Validate dates
    if (new Date(formData.death_date) < new Date(formData.birth_date)) {
      setError('Datum smrti ne moze biti pre datuma rodjenja')
      return
    }

    // Check for duplicates before creating
    if (!skipDuplicateCheck) {
      setChecking(true)
      const matches = await findPotentialDuplicates({
        first_name: formData.first_name,
        last_name: formData.last_name,
        birth_date: formData.birth_date,
        death_date: formData.death_date,
        birth_place: formData.birth_place,
        death_place: formData.death_place,
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
      birth_date: formData.birth_date,
      death_date: formData.death_date,
      birth_place: formData.birth_place?.trim() || '',
      death_place: formData.death_place?.trim() || '',
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
      <SEO
        title="Kreiraj Memorijal"
        description="Kreirajte digitalni memorijal za vašeg voljenog. Sačuvajte uspomene zauvek na Memorijalnoj platformi."
      />
      {showDuplicateWarning && (
        <DuplicateWarning
          matches={duplicates}
          onProceed={handleProceedWithCreate}
          onCancel={handleCancelDuplicate}
        />
      )}

      <div className="min-h-screen bg-ivory py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Naslov stranice */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-text-primary mb-3">
              Kreiraj memorijal
            </h1>
            <p className="text-lg text-text-secondary">
              Popunite podatke o preminuloj osobi
            </p>
          </div>

          {/* Forma */}
          <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
            {error && (
              <div className="bg-rose-light border-2 border-rose text-rose-dark px-5 py-4 rounded-lg mb-6 text-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sekcija 1: Osnovni podaci */}
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-text-primary border-b-2 border-sand pb-2">
                  1. Osnovni podaci
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="first_name" className="block text-lg font-medium text-text-primary mb-2">
                      Ime <span className="text-rose">*</span>
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                      placeholder="Unesite ime"
                    />
                  </div>

                  <div>
                    <label htmlFor="last_name" className="block text-lg font-medium text-text-primary mb-2">
                      Prezime <span className="text-rose">*</span>
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                      placeholder="Unesite prezime"
                    />
                  </div>
                </div>
              </div>

              {/* Sekcija 2: Datumi */}
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-text-primary border-b-2 border-sand pb-2">
                  2. Datumi
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="birth_date" className="block text-lg font-medium text-text-primary mb-2">
                      Datum rođenja <span className="text-rose">*</span>
                    </label>
                    <input
                      type="date"
                      id="birth_date"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                    />
                  </div>

                  <div>
                    <label htmlFor="death_date" className="block text-lg font-medium text-text-primary mb-2">
                      Datum smrti <span className="text-rose">*</span>
                    </label>
                    <input
                      type="date"
                      id="death_date"
                      name="death_date"
                      value={formData.death_date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                    />
                  </div>
                </div>
              </div>

              {/* Sekcija 3: Mesta */}
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-text-primary border-b-2 border-sand pb-2">
                  3. Mesta
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="birth_place" className="block text-lg font-medium text-text-primary mb-2">
                      Mesto rođenja <span className="text-rose">*</span>
                    </label>
                    <input
                      type="text"
                      id="birth_place"
                      name="birth_place"
                      value={formData.birth_place}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                      placeholder="npr. Beograd, Srbija"
                    />
                  </div>

                  <div>
                    <label htmlFor="death_place" className="block text-lg font-medium text-text-primary mb-2">
                      Mesto smrti <span className="text-rose">*</span>
                    </label>
                    <input
                      type="text"
                      id="death_place"
                      name="death_place"
                      value={formData.death_place}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                      placeholder="npr. Beograd, Srbija"
                    />
                  </div>
                </div>
              </div>

              {/* Sekcija 4: Dodatni podaci (opciono) */}
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-text-primary border-b-2 border-sand pb-2">
                  4. Dodatni podaci <span className="text-text-secondary font-normal text-base">(opciono)</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="father_name" className="block text-lg font-medium text-text-primary mb-2">
                      Ime oca
                    </label>
                    <input
                      type="text"
                      id="father_name"
                      name="father_name"
                      value={formData.father_name}
                      onChange={handleChange}
                      className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                      placeholder="Nije obavezno"
                    />
                  </div>

                  <div>
                    <label htmlFor="mother_name" className="block text-lg font-medium text-text-primary mb-2">
                      Ime majke
                    </label>
                    <input
                      type="text"
                      id="mother_name"
                      name="mother_name"
                      value={formData.mother_name}
                      onChange={handleChange}
                      className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                      placeholder="Nije obavezno"
                    />
                  </div>
                </div>
              </div>

              {/* Info poruka */}
              <div className="bg-sky-light/30 border-2 border-sky/30 rounded-lg p-4">
                <p className="text-text-secondary text-base">
                  <span className="text-rose font-bold">*</span> označava obavezna polja.
                  Nakon kreiranja memorijala moći ćete dodati biografiju, slike i video zapise.
                </p>
              </div>

              {/* Dugme za slanje */}
              <button
                type="submit"
                disabled={loading || checking}
                className="w-full bg-sky hover:bg-sky-dark text-white py-5 px-6 rounded-lg text-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checking ? 'Provera duplikata...' : loading ? 'Kreiranje u toku...' : 'Kreiraj memorijal →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
