import { Link } from 'react-router-dom'
import type { Cemetery } from '../types/partners'
import { CemeteryIcon, LocationIcon, PhoneIcon } from './icons/FeatureIcons'

interface CemeteryCardProps {
  cemetery: Cemetery
  showDistance?: boolean
}

export default function CemeteryCard({ cemetery, showDistance }: CemeteryCardProps) {
  const distance = (cemetery as Cemetery & { distance?: number }).distance

  return (
    <Link
      to={`/groblja/${cemetery.slug}`}
      className="card card-hover block overflow-hidden group"
    >
      {/* Cover Image */}
      <div className="h-36 relative bg-gradient-to-br from-sage/20 to-sand">
        {cemetery.cover_image_url ? (
          <img
            src={cemetery.cover_image_url}
            alt={cemetery.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CemeteryIcon size={48} className="text-sage/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
      </div>

      <div className="p-5">
        {/* Name */}
        <h3 className="font-semibold text-lg text-text-primary group-hover:text-sky-dark transition-colors mb-2">
          {cemetery.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
          <LocationIcon size={16} className="text-text-muted flex-shrink-0" />
          <span className="truncate">{cemetery.address}, {cemetery.city}</span>
        </div>

        {/* Distance if available */}
        {showDistance && distance !== undefined && (
          <div className="text-sm text-sage-dark font-medium mb-2">
            {distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`} od vas
          </div>
        )}

        {/* Phone */}
        {cemetery.phone && (
          <div className="flex items-center gap-2 text-text-secondary text-sm mb-3">
            <PhoneIcon size={16} className="text-text-muted flex-shrink-0" />
            <span>{cemetery.phone}</span>
          </div>
        )}

        {/* Facilities Preview */}
        {cemetery.facilities && cemetery.facilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {cemetery.facilities.slice(0, 3).map((facility, idx) => (
              <span
                key={idx}
                className="text-xs bg-sage/10 text-sage-dark px-2 py-1 rounded"
              >
                {facility}
              </span>
            ))}
            {cemetery.facilities.length > 3 && (
              <span className="text-xs text-text-muted px-2 py-1">
                +{cemetery.facilities.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
