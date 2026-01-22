import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { createObituary, publishObituary } from '../lib/obituaries'
import { getUserMemorials } from '../lib/memorials'
import type { CreateObituaryInput } from '../types/obituary'
import type { Memorial } from '../types/memorial'
import { CheckIcon } from '../components/icons/FeatureIcons'
import SEO from '../components/SEO'

// Cena umrlice
const OBITUARY_PRICE_RSD = 1000

export default function CreateObituary() {
  const { session } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userMemorials, setUserMemorials] = useState<Memorial[]>([])
  const [useMemorial, setUseMemorial] = useState(false)
  const [selectedMemorialId, setSelectedMemorialId] = useState<string>('')
  const [createdObituaryId, setCreatedObituaryId] = useState<string | null>(null)

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
    // Saučešća
    condolences_enabled: true, // Podrazumevano uključeno
    notification_email: '',
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
        date_of_birth: memorial.birth_date || '',
        date_of_death: memorial.death_date || '',
        place_of_death: memorial.death_place || '',
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
      setCreatedObituaryId(data.id)
      setLoading(false)
    }
  }

  // Success screen - Pojednostavljen
  if (createdObituaryId) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-soft p-8 md:p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon size={40} className="text-sage-dark" />
          </div>
          <h1 className="font-serif text-3xl font-medium text-text-primary mb-4">
            Uspešno ste kreirali umrlicu!
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Vaša umrlica je sačuvana. Možete je pregledati i podeliti sa porodicom i prijateljima.
          </p>
          <div className="flex flex-col gap-4">
            <Link
              to={`/umrlica/${createdObituaryId}`}
              className="w-full py-4 bg-sky hover:bg-sky-dark text-white text-xl font-semibold rounded-lg transition-colors"
            >
              Pogledaj umrlicu →
            </Link>
            <Link
              to="/umrlice"
              className="w-full py-4 border-2 border-sand text-text-primary hover:bg-sand-light text-lg font-medium rounded-lg transition-colors"
            >
              Sve umrlice
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Kreiraj Umrlicu"
        description="Objavite umrlicu za preminulog člana porodice. Digitalna umrlica sa detaljima sahrane i opcijom za saučešća."
      />
      <div className="min-h-screen bg-ivory py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Naslov stranice */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-text-primary mb-3">
              Kreiraj umrlicu
            </h1>
          <p className="text-lg text-text-secondary">
            Popunite podatke za objavljivanje umrlice
          </p>
        </div>

        {/* Cena */}
        <div className="bg-sky-light/30 border-2 border-sky/30 rounded-lg p-4 mb-6 text-center">
          <p className="text-text-primary text-lg">
            Cena objave umrlice: <span className="font-semibold">{OBITUARY_PRICE_RSD} RSD</span>
          </p>
        </div>

        {/* Forma */}
        <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
          {error && (
            <div className="bg-rose-light border-2 border-rose text-rose-dark px-5 py-4 rounded-lg mb-6 text-lg">
              {error}
            </div>
          )}

          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
            {/* Sekcija: Povezivanje sa memorijalom */}
            {userMemorials.length > 0 && (
              <div className="bg-sky-light/30 border-2 border-sky/30 p-5 rounded-lg">
                <label className="flex items-center gap-3 mb-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useMemorial}
                    onChange={(e) => setUseMemorial(e.target.checked)}
                    className="w-6 h-6 text-sky rounded focus:ring-sky"
                  />
                  <span className="text-lg font-medium text-text-primary">Poveži sa postojećim memorijalom</span>
                </label>

                {useMemorial && (
                  <select
                    value={selectedMemorialId}
                    onChange={(e) => handleMemorialSelect(e.target.value)}
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                  >
                    <option value="">Izaberi memorijal...</option>
                    {userMemorials.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.first_name} {m.last_name} ({m.death_date})
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            {/* Sekcija 1: Podaci o preminulom */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-text-primary border-b-2 border-sand pb-2">
                1. Podaci o preminulom
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
                    disabled={useMemorial && !!selectedMemorialId}
                    required
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky disabled:bg-sand-light disabled:cursor-not-allowed"
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
                    disabled={useMemorial && !!selectedMemorialId}
                    required
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky disabled:bg-sand-light disabled:cursor-not-allowed"
                    placeholder="Unesite prezime"
                  />
                </div>

                <div>
                  <label htmlFor="date_of_birth" className="block text-lg font-medium text-text-primary mb-2">
                    Datum rođenja
                  </label>
                  <input
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    disabled={useMemorial && !!selectedMemorialId}
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky disabled:bg-sand-light disabled:cursor-not-allowed"
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
                    disabled={useMemorial && !!selectedMemorialId}
                    required
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky disabled:bg-sand-light disabled:cursor-not-allowed"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="place_of_death" className="block text-lg font-medium text-text-primary mb-2">
                    Mesto smrti
                  </label>
                  <input
                    type="text"
                    id="place_of_death"
                    name="place_of_death"
                    value={formData.place_of_death}
                    onChange={handleChange}
                    disabled={useMemorial && !!selectedMemorialId}
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky disabled:bg-sand-light disabled:cursor-not-allowed"
                    placeholder="npr. Beograd, Srbija"
                  />
                </div>
              </div>
            </div>

            {/* Sekcija 2: Tekst umrlice */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-text-primary border-b-2 border-sand pb-2">
                2. Tekst umrlice
              </h2>

              <div>
                <label htmlFor="content" className="block text-lg font-medium text-text-primary mb-2">
                  Napišite tekst umrlice
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                  placeholder="Ovde napišite tekst umrlice..."
                />
              </div>
            </div>

            {/* Sekcija 3: Detalji sahrane */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-text-primary border-b-2 border-sand pb-2">
                3. Detalji sahrane <span className="text-text-secondary font-normal text-base">(opciono)</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="funeral_date" className="block text-lg font-medium text-text-primary mb-2">
                    Datum sahrane
                  </label>
                  <input
                    type="date"
                    id="funeral_date"
                    name="funeral_date"
                    value={formData.funeral_date}
                    onChange={handleChange}
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                  />
                </div>

                <div>
                  <label htmlFor="funeral_time" className="block text-lg font-medium text-text-primary mb-2">
                    Vreme sahrane
                  </label>
                  <input
                    type="time"
                    id="funeral_time"
                    name="funeral_time"
                    value={formData.funeral_time}
                    onChange={handleChange}
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                  />
                </div>

                <div>
                  <label htmlFor="funeral_location" className="block text-lg font-medium text-text-primary mb-2">
                    Lokacija (groblje/crkva)
                  </label>
                  <input
                    type="text"
                    id="funeral_location"
                    name="funeral_location"
                    value={formData.funeral_location}
                    onChange={handleChange}
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                    placeholder="npr. Novo groblje Bežanija"
                  />
                </div>

                <div>
                  <label htmlFor="funeral_address" className="block text-lg font-medium text-text-primary mb-2">
                    Adresa
                  </label>
                  <input
                    type="text"
                    id="funeral_address"
                    name="funeral_address"
                    value={formData.funeral_address}
                    onChange={handleChange}
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                    placeholder="Ulica i broj"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="funeral_notes" className="block text-lg font-medium text-text-primary mb-2">
                    Dodatne napomene
                  </label>
                  <textarea
                    id="funeral_notes"
                    name="funeral_notes"
                    value={formData.funeral_notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                    placeholder="npr. Parking je dostupan pored kapele..."
                  />
                </div>
              </div>
            </div>

            {/* Sekcija 4: Donacije */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-text-primary border-b-2 border-sand pb-2">
                4. Donacije <span className="text-text-secondary font-normal text-base">(opciono)</span>
              </h2>

              <div className="bg-sand-light p-5 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="donations_enabled"
                    checked={formData.donations_enabled}
                    onChange={handleChange}
                    className="w-6 h-6 text-sky rounded focus:ring-sky"
                  />
                  <span className="text-lg font-medium text-text-primary">
                    Omogući donacije umesto cveća
                  </span>
                </label>

                {formData.donations_enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 pt-5 border-t-2 border-sand">
                    <div>
                      <label htmlFor="donation_goal" className="block text-lg font-medium text-text-primary mb-2">
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
                        className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                        placeholder="npr. 1000"
                      />
                    </div>

                    <div>
                      <label htmlFor="donation_charity_name" className="block text-lg font-medium text-text-primary mb-2">
                        Naziv organizacije
                      </label>
                      <input
                        type="text"
                        id="donation_charity_name"
                        name="donation_charity_name"
                        value={formData.donation_charity_name}
                        onChange={handleChange}
                        className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                        placeholder="npr. Crveni krst Srbije"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="donation_charity_description" className="block text-lg font-medium text-text-primary mb-2">
                        Opis svrhe donacije
                      </label>
                      <textarea
                        id="donation_charity_description"
                        name="donation_charity_description"
                        value={formData.donation_charity_description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                        placeholder="npr. Umesto cveća, porodica moli da se donira..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sekcija 5: Saučešća */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-text-primary border-b-2 border-sand pb-2">
                5. Primanje saučešća <span className="text-sage font-normal text-base">(besplatno)</span>
              </h2>

              <div className="bg-sage-light/30 p-5 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="condolences_enabled"
                    checked={formData.condolences_enabled}
                    onChange={handleChange}
                    className="w-6 h-6 text-sage rounded focus:ring-sage"
                  />
                  <span className="text-lg font-medium text-text-primary">
                    Omogući primanje saučešća od posetilaca
                  </span>
                </label>
                <p className="text-text-secondary text-sm mt-2 ml-9">
                  Posetioci će moći da vam pošalju poruke saučešća koje ćete primiti na email.
                </p>

                {formData.condolences_enabled && (
                  <div className="mt-5 pt-5 border-t-2 border-sage/30">
                    <label htmlFor="notification_email" className="block text-lg font-medium text-text-primary mb-2">
                      Email za primanje saučešća <span className="text-rose">*</span>
                    </label>
                    <input
                      type="email"
                      id="notification_email"
                      name="notification_email"
                      value={formData.notification_email}
                      onChange={handleChange}
                      required={formData.condolences_enabled}
                      className="w-full px-4 py-4 text-lg border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage"
                      placeholder="vas@email.com"
                    />
                    <p className="text-text-secondary text-sm mt-2">
                      Na ovu adresu ćete primati obaveštenja kada neko pošalje saučešće.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Info poruka */}
            <div className="bg-sky-light/30 border-2 border-sky/30 rounded-lg p-4">
              <p className="text-text-secondary text-base">
                <span className="text-rose font-bold">*</span> označava obavezna polja.
                Umrlicu možete sačuvati kao nacrt i objaviti kasnije.
              </p>
            </div>

            {/* Dugmad */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-5 border-2 border-sand text-text-primary hover:bg-sand-light text-xl font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Čuvanje...' : 'Sačuvaj kao nacrt'}
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e as unknown as FormEvent, true)}
                disabled={loading}
                className="flex-1 py-5 bg-sky hover:bg-sky-dark text-white text-xl font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Objavljivanje...' : `Objavi umrlicu (${OBITUARY_PRICE_RSD} RSD) →`}
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </>
  )
}
