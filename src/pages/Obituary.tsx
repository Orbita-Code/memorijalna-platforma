import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getObituaryById } from '../lib/obituaries'
import type { Obituary as ObituaryType } from '../types/obituary'

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
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !obituary) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
          {error || 'Umrlica nije pronadena'}
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header with cross */}
      <div className="bg-black text-white rounded-t-lg p-6 text-center">
        <div className="text-4xl mb-4">&#10013;</div>
        <h1 className="text-3xl font-serif mb-2">
          {obituary.first_name} {obituary.last_name}
        </h1>
        <p className="text-gray-300 text-lg">
          {obituary.date_of_birth && formatDate(obituary.date_of_birth)}
          {obituary.date_of_birth && ' - '}
          {formatDate(obituary.date_of_death)}
          {age !== null && ` (${age} godina)`}
        </p>
        {obituary.place_of_death && (
          <p className="text-gray-400 mt-1">{obituary.place_of_death}</p>
        )}
      </div>

      {/* Photo */}
      {obituary.photo_url && (
        <div className="flex justify-center -mt-12 mb-6 relative z-10">
          <img
            src={obituary.photo_url}
            alt={`${obituary.first_name} ${obituary.last_name}`}
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="bg-white shadow-md rounded-b-lg">
        {obituary.content && (
          <div className="p-6 border-b border-gray-200">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {obituary.content}
            </p>
          </div>
        )}

        {/* Funeral Details */}
        {hasFuneralInfo && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>&#9829;</span> Informacije o sahrani
            </h2>
            <div className="space-y-3">
              {obituary.funeral_date && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 w-6">&#128197;</span>
                  <div>
                    <span className="font-medium">Datum:</span>{' '}
                    {formatDate(obituary.funeral_date)}
                    {obituary.funeral_time && ` u ${formatTime(obituary.funeral_time)}`}
                  </div>
                </div>
              )}
              {obituary.funeral_location && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 w-6">&#128205;</span>
                  <div>
                    <span className="font-medium">Lokacija:</span>{' '}
                    {obituary.funeral_location}
                  </div>
                </div>
              )}
              {obituary.funeral_address && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 w-6">&#127968;</span>
                  <div>
                    <span className="font-medium">Adresa:</span>{' '}
                    {obituary.funeral_address}
                  </div>
                </div>
              )}
              {obituary.funeral_notes && (
                <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                  <p className="text-gray-600 text-sm">{obituary.funeral_notes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Donation Section */}
        {obituary.donations_enabled && (
          <div className="p-6 bg-blue-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Donacije u ime preminulog
            </h2>

            {obituary.donation_charity_name && (
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Organizacija:</span>{' '}
                {obituary.donation_charity_name}
              </p>
            )}

            {obituary.donation_charity_description && (
              <p className="text-gray-600 text-sm mb-4">
                {obituary.donation_charity_description}
              </p>
            )}

            {obituary.donation_goal_cents && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Prikupljeno: {(obituary.donation_raised_cents / 100).toFixed(2)} EUR</span>
                  <span>Cilj: {(obituary.donation_goal_cents / 100).toFixed(2)} EUR</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${donationProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1 text-center">
                  {donationProgress.toFixed(0)}% cilja
                </p>
              </div>
            )}

            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
              Doniraj
            </button>
          </div>
        )}

        {/* Memorial Link */}
        {obituary.memorial_id && (
          <div className="p-6 border-t border-gray-200 text-center">
            <Link
              to={`/memorijal/${obituary.memorial_id}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <span>&#128220;</span> Poseti memorijal
            </Link>
          </div>
        )}

        {/* Published date */}
        {obituary.published_at && (
          <div className="px-6 py-3 bg-gray-100 text-center text-sm text-gray-500 rounded-b-lg">
            Objavljeno: {formatDate(obituary.published_at)}
          </div>
        )}
      </div>
    </div>
  )
}
