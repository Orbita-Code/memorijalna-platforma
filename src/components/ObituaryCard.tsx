import { Link } from 'react-router-dom'
import type { Obituary } from '../types/obituary'

interface ObituaryCardProps {
  obituary: Obituary
}

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('sr-Latn-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatShortDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('sr-Latn-RS', {
    day: 'numeric',
    month: 'short',
  })
}

export default function ObituaryCard({ obituary }: ObituaryCardProps) {
  const hasFuneralInfo = obituary.funeral_date || obituary.funeral_location

  return (
    <Link
      to={`/umrlica/${obituary.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
    >
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 text-center">
        <div className="text-xl mb-1">&#10013;</div>
        <h3 className="text-lg font-serif">
          {obituary.first_name} {obituary.last_name}
        </h3>
        <p className="text-gray-400 text-sm">
          {obituary.date_of_birth && `${formatShortDate(obituary.date_of_birth)} - `}
          {formatShortDate(obituary.date_of_death)}
        </p>
      </div>

      {/* Content */}
      <div className="p-4">
        {obituary.place_of_death && (
          <p className="text-gray-600 text-sm mb-2">
            &#128205; {obituary.place_of_death}
          </p>
        )}

        {hasFuneralInfo && (
          <div className="bg-gray-50 rounded p-3 mt-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Sahrana</p>
            {obituary.funeral_date && (
              <p className="text-sm text-gray-700">
                &#128197; {formatDate(obituary.funeral_date)}
                {obituary.funeral_time && ` u ${obituary.funeral_time.substring(0, 5)}h`}
              </p>
            )}
            {obituary.funeral_location && (
              <p className="text-sm text-gray-600 mt-1">
                {obituary.funeral_location}
              </p>
            )}
          </div>
        )}

        {obituary.donations_enabled && (
          <div className="mt-3 flex items-center gap-1 text-blue-600 text-sm">
            <span>&#128150;</span>
            <span>Donacije omogucene</span>
          </div>
        )}
      </div>
    </Link>
  )
}
