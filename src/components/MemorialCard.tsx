import { Link } from 'react-router-dom'
import type { Memorial } from '../types/memorial'

interface MemorialCardProps {
  memorial: Memorial
}

export default function MemorialCard({ memorial }: MemorialCardProps) {
  const initials = `${memorial.first_name[0]}${memorial.last_name[0]}`
  const birthYear = new Date(memorial.date_of_birth).getFullYear()
  const deathYear = new Date(memorial.date_of_death).getFullYear()

  return (
    <Link
      to={`/memorijal/${memorial.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center gap-4">
        {/* Profile image placeholder */}
        {memorial.profile_image_url ? (
          <img
            src={memorial.profile_image_url}
            alt={`${memorial.first_name} ${memorial.last_name}`}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-500">
              {initials}
            </span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {memorial.first_name} {memorial.last_name}
          </h3>

          {/* Dates */}
          <p className="text-sm text-gray-600">
            {birthYear} - {deathYear}
          </p>

          {/* Place of death */}
          <p className="text-sm text-gray-500 truncate">
            {memorial.place_of_death}
          </p>
        </div>
      </div>
    </Link>
  )
}
