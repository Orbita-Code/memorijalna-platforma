import { Link } from 'react-router-dom'
import type { Obituary } from '../types/obituary'
import { EternalFlame } from './icons/ReligiousSymbols'
import { LocationIcon, CalendarIcon, HeartIcon } from './icons/FeatureIcons'

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
      className="card card-hover block overflow-hidden group"
    >
      {/* Header */}
      <div className="bg-gradient-to-b from-sand to-sand-light p-6 text-center border-b border-border-light">
        <div className="mb-3">
          <EternalFlame size={28} className="text-rose mx-auto" />
        </div>
        <h3 className="font-serif text-xl text-text-primary group-hover:text-sky-dark transition-colors">
          {obituary.first_name} {obituary.last_name}
        </h3>
        <p className="text-text-secondary text-sm mt-1">
          {obituary.date_of_birth && `${formatShortDate(obituary.date_of_birth)} – `}
          {formatShortDate(obituary.date_of_death)}
        </p>
      </div>

      {/* Content */}
      <div className="p-5">
        {obituary.place_of_death && (
          <div className="flex items-center gap-2 text-text-secondary text-sm mb-3">
            <LocationIcon size={16} className="text-text-muted flex-shrink-0" />
            <span>{obituary.place_of_death}</span>
          </div>
        )}

        {hasFuneralInfo && (
          <div className="bg-sand-light rounded-lg p-4 mt-2">
            <p className="caption mb-2">Sahrana</p>
            {obituary.funeral_date && (
              <div className="flex items-center gap-2 text-sm text-text-primary">
                <CalendarIcon size={16} className="text-text-muted flex-shrink-0" />
                <span>
                  {formatDate(obituary.funeral_date)}
                  {obituary.funeral_time && ` u ${obituary.funeral_time.substring(0, 5)}h`}
                </span>
              </div>
            )}
            {obituary.funeral_location && (
              <div className="flex items-center gap-2 text-sm text-text-secondary mt-2">
                <LocationIcon size={16} className="text-text-muted flex-shrink-0" />
                <span>{obituary.funeral_location}</span>
              </div>
            )}
          </div>
        )}

        {obituary.donations_enabled && (
          <div className="mt-4 flex items-center gap-2 text-sky-dark text-sm font-medium">
            <HeartIcon size={16} className="text-rose" />
            <span>Donacije omogućene</span>
          </div>
        )}
      </div>
    </Link>
  )
}
