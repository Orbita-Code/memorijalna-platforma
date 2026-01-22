import { Link } from 'react-router-dom'
import type { Memorial } from '../types/memorial'
import { EternalFlame } from './icons/ReligiousSymbols'

interface MemorialCardProps {
  memorial: Memorial
}

export default function MemorialCard({ memorial }: MemorialCardProps) {
  const birthYear = memorial.birth_date ? new Date(memorial.birth_date).getFullYear() : null
  const deathYear = memorial.death_date ? new Date(memorial.death_date).getFullYear() : null

  return (
    <Link
      to={`/memorijal/${memorial.id}`}
      className="card card-hover block overflow-hidden group"
    >
      {/* Cover image or gradient */}
      <div className="h-24 relative">
        {memorial.cover_image_url ? (
          <img
            src={memorial.cover_image_url}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-light via-sand to-sand-light" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
      </div>

      <div className="px-5 pb-5 -mt-8 relative">
        {/* Profile image */}
        <div className="mb-3">
          {memorial.profile_image_url ? (
            <img
              src={memorial.profile_image_url}
              alt={`${memorial.first_name} ${memorial.last_name}`}
              className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-soft"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-sand-light border-3 border-white shadow-soft flex items-center justify-center">
              <EternalFlame size={24} className="text-rose" />
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="font-serif text-lg font-semibold text-text-primary truncate group-hover:text-sky-dark transition-colors">
          {memorial.first_name} {memorial.last_name}
        </h3>

        {/* Dates */}
        <p className="text-sm text-text-secondary mt-1">
          {birthYear || '?'} – {deathYear || '?'}
        </p>

        {/* Place of death */}
        {memorial.death_place && (
          <p className="text-sm text-text-muted truncate mt-1">
            {memorial.death_place}
          </p>
        )}
      </div>
    </Link>
  )
}
