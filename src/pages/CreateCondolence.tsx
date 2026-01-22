import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { createCondolence, updateCondolencePayment } from '../lib/condolences'
import { createDeceasedPerson, incrementCondolenceCount, updateDeceasedPersonPhoto } from '../lib/deceasedPersons'
import type { CreateCondolenceInput } from '../types/condolence'
import type { DeceasedPerson } from '../types/deceasedPerson'
import SEO from '../components/SEO'
import DeceasedPersonMatcher from '../components/DeceasedPersonMatcher'
import { EternalFlame } from '../components/icons/ReligiousSymbols'
import { CheckIcon } from '../components/icons/FeatureIcons'

// Cena čitulje
const CONDOLENCE_PRICE_RSD = 599

export default function CreateCondolence() {
  const { session } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [createdCondolenceId, setCreatedCondolenceId] = useState<string | null>(null)

  // Selected deceased person (if matched)
  const [selectedPerson, setSelectedPerson] = useState<DeceasedPerson | null>(null)

  const [formData, setFormData] = useState<CreateCondolenceInput>({
    deceased_first_name: '',
    deceased_last_name: '',
    date_of_birth: '',
    date_of_death: '',
    place_of_death: '',
    content: '',
    from_name: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePersonSelect = (person: DeceasedPerson | null) => {
    setSelectedPerson(person)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validacija
    if (!formData.deceased_first_name.trim()) {
      setError('Ime preminulog je obavezno')
      return
    }
    if (!formData.deceased_last_name.trim()) {
      setError('Prezime preminulog je obavezno')
      return
    }
    if (!formData.date_of_death) {
      setError('Datum smrti je obavezan za grupisanje čitulja')
      return
    }
    if (!formData.content.trim()) {
      setError('Tekst čitulje je obavezan')
      return
    }
    if (formData.content.trim().length < 20) {
      setError('Tekst čitulje mora imati najmanje 20 karaktera')
      return
    }

    setLoading(true)

    let deceasedPersonId = selectedPerson?.id || null

    // Ako nije izabrana postojeća osoba, kreiraj novu
    if (!deceasedPersonId) {
      const { data: newPerson, error: personError } = await createDeceasedPerson({
        first_name: formData.deceased_first_name.trim(),
        last_name: formData.deceased_last_name.trim(),
        date_of_death: formData.date_of_death,
        date_of_birth: formData.date_of_birth || undefined,
        place_of_death: formData.place_of_death?.trim() || undefined,
        photo_url: formData.photo_url || undefined,
      })

      if (personError || !newPerson) {
        setError('Greška pri kreiranju. Pokušajte ponovo.')
        setLoading(false)
        return
      }

      deceasedPersonId = newPerson.id
    }

    // Kreiraj čitulju
    const input: CreateCondolenceInput = {
      deceased_person_id: deceasedPersonId,
      deceased_first_name: formData.deceased_first_name.trim(),
      deceased_last_name: formData.deceased_last_name.trim(),
      date_of_birth: formData.date_of_birth || undefined,
      date_of_death: formData.date_of_death || undefined,
      place_of_death: formData.place_of_death?.trim() || undefined,
      content: formData.content.trim(),
      from_name: formData.from_name?.trim() || undefined,
    }

    const { data, error: createError } = await createCondolence(input, session?.user?.id)

    if (createError || !data) {
      setError('Greška pri kreiranju čitulje. Pokušajte ponovo.')
      setLoading(false)
      return
    }

    // Uvećaj broj čitulja za osobu
    await incrementCondolenceCount(deceasedPersonId)

    // Ako je nova osoba i ima sliku, ažuriraj je
    if (formData.photo_url && !selectedPerson?.photo_url) {
      await updateDeceasedPersonPhoto(deceasedPersonId, formData.photo_url)
    }

    // U demo modu, simuliramo uspešno plaćanje
    // U produkciji, ovde bi išla Stripe integracija
    await updateCondolencePayment(data.id, 'completed')

    setCreatedCondolenceId(data.id)
    setLoading(false)
  }

  // Success screen
  if (createdCondolenceId) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <SEO title="Čitulja kreirana" />
        <div className="bg-white rounded-xl shadow-soft p-8 md:p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon size={40} className="text-sage-dark" />
          </div>
          <h1 className="font-serif text-3xl font-medium text-text-primary mb-4">
            Čitulja je uspešno kreirana!
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Vaša čitulja je poslata na pregled i biće objavljena nakon odobrenja.
          </p>
          <div className="flex flex-col gap-4">
            <Link
              to={`/citulja/${createdCondolenceId}`}
              className="w-full py-4 bg-sky hover:bg-sky-dark text-white text-xl font-semibold rounded-lg transition-colors"
            >
              Pogledaj čitulju →
            </Link>
            <Link
              to="/citulje"
              className="w-full py-4 border-2 border-sand text-text-primary hover:bg-sand-light text-lg font-medium rounded-lg transition-colors"
            >
              Sve čitulje
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory py-8 px-4">
      <SEO
        title="Objavi čitulju"
        description="Ostavite čitulju u znak sećanja na voljenu osobu."
      />

      <div className="max-w-2xl mx-auto">
        {/* Naslov stranice */}
        <div className="text-center mb-8">
          <EternalFlame size={40} className="text-rose mx-auto mb-4" />
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-text-primary mb-3">
            Objavi čitulju
          </h1>
          <p className="text-lg text-text-secondary">
            Ostavite izraz saučešća u znak sećanja na voljenu osobu
          </p>
        </div>

        {/* Cena */}
        <div className="bg-sky-light/30 border-2 border-sky/30 rounded-lg p-4 mb-6 text-center">
          <p className="text-text-primary text-lg">
            Cena objave čitulje: <span className="font-semibold">{CONDOLENCE_PRICE_RSD} RSD</span>
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
            {/* Sekcija 1: Podaci o preminulom */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-text-primary border-b-2 border-sand pb-2">
                1. Podaci o preminulom
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="deceased_first_name" className="block text-lg font-medium text-text-primary mb-2">
                    Ime <span className="text-rose">*</span>
                  </label>
                  <input
                    type="text"
                    id="deceased_first_name"
                    name="deceased_first_name"
                    value={formData.deceased_first_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                    placeholder="Ime preminulog"
                  />
                </div>

                <div>
                  <label htmlFor="deceased_last_name" className="block text-lg font-medium text-text-primary mb-2">
                    Prezime <span className="text-rose">*</span>
                  </label>
                  <input
                    type="text"
                    id="deceased_last_name"
                    name="deceased_last_name"
                    value={formData.deceased_last_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                    placeholder="Prezime preminulog"
                  />
                </div>

                <div>
                  <label htmlFor="date_of_death" className="block text-lg font-medium text-text-primary mb-2">
                    Datum smrti <span className="text-rose">*</span>
                  </label>
                  <input
                    type="date"
                    id="date_of_death"
                    name="date_of_death"
                    value={formData.date_of_death}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                  />
                  <p className="text-text-muted text-sm mt-1">
                    Potrebno za grupisanje čitulja iste osobe
                  </p>
                </div>

                <div>
                  <label htmlFor="date_of_birth" className="block text-lg font-medium text-text-primary mb-2">
                    Datum rođenja <span className="text-text-secondary font-normal text-base">(opciono)</span>
                  </label>
                  <input
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="place_of_death" className="block text-lg font-medium text-text-primary mb-2">
                    Mesto <span className="text-text-secondary font-normal text-base">(opciono)</span>
                  </label>
                  <input
                    type="text"
                    id="place_of_death"
                    name="place_of_death"
                    value={formData.place_of_death}
                    onChange={handleChange}
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                    placeholder="npr. Beograd"
                  />
                </div>
              </div>
            </div>

            {/* Matching section - prikaži samo kad ima ime, prezime i datum */}
            {formData.deceased_first_name.trim() &&
              formData.deceased_last_name.trim() &&
              formData.date_of_death && (
                <DeceasedPersonMatcher
                  firstName={formData.deceased_first_name}
                  lastName={formData.deceased_last_name}
                  dateOfDeath={formData.date_of_death}
                  onSelect={handlePersonSelect}
                  selectedPersonId={selectedPerson?.id}
                />
              )}

            {/* Sekcija 2: Tekst čitulje */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-text-primary border-b-2 border-sand pb-2">
                2. Tekst čitulje <span className="text-rose">*</span>
              </h2>

              <div>
                <label htmlFor="content" className="block text-lg font-medium text-text-primary mb-2">
                  Vaša poruka saučešća
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                  placeholder="Napišite vašu poruku saučešća..."
                />
                <p className="text-text-secondary text-sm mt-2">
                  Minimum 20 karaktera. Trenutno: {formData.content.length}
                </p>
              </div>
            </div>

            {/* Sekcija 3: Potpis */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-text-primary border-b-2 border-sand pb-2">
                3. Potpis <span className="text-text-secondary font-normal text-base">(opciono)</span>
              </h2>

              <div>
                <label htmlFor="from_name" className="block text-lg font-medium text-text-primary mb-2">
                  Od koga je čitulja
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                  placeholder="npr. Porodica Petrović, Kolege sa posla..."
                />
                <p className="text-text-secondary text-sm mt-2">
                  Ako ostavite prazno, čitulja će biti objavljena anonimno.
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="bg-sand-light rounded-lg p-4">
              <p className="text-text-secondary text-base">
                <span className="text-rose font-bold">*</span> označava obavezna polja.
                Čitulja prolazi moderaciju pre objavljivanja.
              </p>
            </div>

            {/* Dugme za slanje */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky hover:bg-sky-dark text-white py-5 px-6 rounded-lg text-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Obrada...' : `Objavi čitulju (${CONDOLENCE_PRICE_RSD} RSD) →`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
