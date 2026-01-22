import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getObituaryById } from '../lib/obituaries'
import { getCondolencesCount } from '../lib/obituaryCondolences'
import type { Obituary as ObituaryType } from '../types/obituary'
import { EternalFlame } from '../components/icons/ReligiousSymbols'
import { CalendarIcon, LocationIcon, HeartIcon, MemorialIcon } from '../components/icons/FeatureIcons'
import SEO from '../components/SEO'
import ShareButtons from '../components/ShareButtons'
import ObituaryCondolenceForm from '../components/ObituaryCondolenceForm'

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('sr-Latn-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatTime(timeString: string | null | undefined): string {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':')
  return `${hours}:${minutes}h`
}

function calculateAge(birthDate: string | null | undefined, deathDate: string): number | null {
  if (!birthDate) return null
  const birth = new Date(birthDate)
  const death = new Date(deathDate)
  let age = death.getFullYear() - birth.getFullYear()
  const monthDiff = death.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && death.getDate() < birth.getDate())) {
    age--
  }
  return age
}

export default function Obituary() {
  const { id } = useParams<{ id: string }>()
  const [obituary, setObituary] = useState<ObituaryType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [condolencesCount, setCondolencesCount] = useState(0)

  const fetchCondolencesCount = useCallback(async () => {
    if (!id) return
    const { count } = await getCondolencesCount(id)
    setCondolencesCount(count)
  }, [id])

  useEffect(() => {
    if (id) {
      loadObituary()
    }
  }, [id])

  const loadObituary = async () => {
    if (!id) return
    setLoading(true)
    const { data, error: fetchError } = await getObituaryById(id)
    if (fetchError) {
      setError('Umrlica nije pronadena')
    } else {
      setObituary(data)
      // Učitaj broj saučešća
      const { count } = await getCondolencesCount(id)
      setCondolencesCount(count)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky"></div>
      </div>
    )
  }

  if (error || !obituary) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-rose-light border-2 border-rose text-rose-dark px-6 py-4 rounded-lg text-center text-lg">
            {error || 'Umrlica nije pronađena'}
          </div>
        </div>
      </div>
    )
  }

  const age = calculateAge(obituary.date_of_birth, obituary.date_of_death)
  const hasFuneralInfo = obituary.funeral_date || obituary.funeral_location
  const donationProgress = obituary.donation_goal_cents
    ? Math.min((obituary.donation_raised_cents / obituary.donation_goal_cents) * 100, 100)
    : 0

  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title={`${obituary.first_name} ${obituary.last_name} - Čitulja`}
        description={obituary.content?.substring(0, 160) || `Čitulja za ${obituary.first_name} ${obituary.last_name}`}
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header - Novi dizajn sa tamnom pozadinom */}
        <div className="bg-text-primary rounded-t-xl p-8 text-center">
          <div className="mb-4">
            <EternalFlame size={40} className="text-rose mx-auto" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-3">
            {obituary.first_name} {obituary.last_name}
          </h1>
          <p className="text-white/80 text-lg">
            {obituary.date_of_birth && formatDate(obituary.date_of_birth)}
            {obituary.date_of_birth && ' – '}
            {formatDate(obituary.date_of_death)}
            {age !== null && ` (${age} god.)`}
          </p>
          {obituary.place_of_death && (
            <p className="text-sand-light/70 mt-2">{obituary.place_of_death}</p>
          )}
        </div>

        {/* Photo */}
        {obituary.photo_url && (
          <div className="flex justify-center -mt-16 mb-6 relative z-10">
            <img
              src={obituary.photo_url}
              alt={`${obituary.first_name} ${obituary.last_name}`}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-soft"
            />
          </div>
        )}

        {/* Content */}
        <div className="bg-white shadow-soft rounded-b-xl">
          {obituary.content && (
            <div className="p-6 md:p-8 border-b-2 border-sand">
              <p className="text-text-primary text-lg leading-relaxed whitespace-pre-wrap">
                {obituary.content}
              </p>
            </div>
          )}

          {/* Funeral Details */}
          {hasFuneralInfo && (
            <div className="p-6 md:p-8 bg-sand-light/50 border-b-2 border-sand">
              <h2 className="text-xl font-semibold text-text-primary mb-5 flex items-center gap-3">
                <HeartIcon size={24} className="text-rose" />
                Informacije o sahrani
              </h2>
              <div className="space-y-4">
                {obituary.funeral_date && (
                  <div className="flex items-start gap-4">
                    <CalendarIcon size={22} className="text-text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-text-primary">Datum i vreme:</span>{' '}
                      <span className="text-text-secondary">
                        {formatDate(obituary.funeral_date)}
                        {obituary.funeral_time && ` u ${formatTime(obituary.funeral_time)}`}
                      </span>
                    </div>
                  </div>
                )}
                {obituary.funeral_location && (
                  <div className="flex items-start gap-4">
                    <LocationIcon size={22} className="text-text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-text-primary">Lokacija:</span>{' '}
                      <span className="text-text-secondary">{obituary.funeral_location}</span>
                    </div>
                  </div>
                )}
                {obituary.funeral_address && (
                  <div className="flex items-start gap-4 ml-9">
                    <span className="text-text-secondary">{obituary.funeral_address}</span>
                  </div>
                )}
                {obituary.funeral_notes && (
                  <div className="mt-4 p-4 bg-white rounded-lg border-2 border-sand">
                    <p className="text-text-secondary">{obituary.funeral_notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Donation Section */}
          {obituary.donations_enabled && (
            <div className="p-6 md:p-8 bg-sky-light/30">
              <h2 className="text-xl font-semibold text-text-primary mb-5">
                Donacije u ime preminulog
              </h2>

              {obituary.donation_charity_name && (
                <p className="text-text-primary text-lg mb-2">
                  <span className="font-medium">Organizacija:</span>{' '}
                  {obituary.donation_charity_name}
                </p>
              )}

              {obituary.donation_charity_description && (
                <p className="text-text-secondary mb-5">
                  {obituary.donation_charity_description}
                </p>
              )}

              {obituary.donation_goal_cents && (
                <div className="mb-5">
                  <div className="flex justify-between text-text-secondary mb-2">
                    <span>Prikupljeno: {(obituary.donation_raised_cents / 100).toFixed(2)} EUR</span>
                    <span>Cilj: {(obituary.donation_goal_cents / 100).toFixed(2)} EUR</span>
                  </div>
                  <div className="w-full bg-sand rounded-full h-4">
                    <div
                      className="bg-sage h-4 rounded-full transition-all duration-500"
                      style={{ width: `${donationProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-text-secondary text-center mt-2">
                    {donationProgress.toFixed(0)}% cilja
                  </p>
                </div>
              )}

              <button className="w-full bg-sky hover:bg-sky-dark text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors">
                Doniraj
              </button>
            </div>
          )}

          {/* Memorial Link */}
          {obituary.memorial_id && (
            <div className="p-6 border-t-2 border-sand text-center">
              <Link
                to={`/memorijal/${obituary.memorial_id}`}
                className="inline-flex items-center gap-3 text-sky hover:text-sky-dark text-lg font-medium transition-colors"
              >
                <MemorialIcon size={22} />
                Poseti memorijal →
              </Link>
            </div>
          )}

          {/* Share Buttons */}
          <div className="p-6 border-t-2 border-sand">
            <ShareButtons
              url={`/umrlica/${obituary.id}`}
              title={`${obituary.first_name} ${obituary.last_name}`}
              description={obituary.content?.substring(0, 150) || `Umrlica za ${obituary.first_name} ${obituary.last_name}`}
              type="obituary"
            />
          </div>

          {/* Published date */}
          {obituary.published_at && (
            <div className="px-6 py-4 bg-sand-light text-center text-text-secondary rounded-b-xl">
              Objavljeno: {formatDate(obituary.published_at)}
            </div>
          )}
        </div>

        {/* Condolence Form Section */}
        {obituary.condolences_enabled && (
          <div className="mt-8">
            {condolencesCount > 0 && (
              <p className="text-center text-text-secondary mb-4">
                Porodica je do sada primila <span className="font-semibold text-text-primary">{condolencesCount}</span> {condolencesCount === 1 ? 'saučešće' : condolencesCount < 5 ? 'saučešća' : 'saučešća'}
              </p>
            )}
            <ObituaryCondolenceForm
              obituaryId={obituary.id}
              deceasedName={`${obituary.first_name} ${obituary.last_name}`}
              onSuccess={fetchCondolencesCount}
            />
          </div>
        )}
      </div>
    </div>
  )
}
