import { Link } from 'react-router-dom'
import type { FuneralHome } from '../types/partners'
import { FuneralHomeIcon, LocationIcon, PhoneIcon, StarIcon } from './icons/FeatureIcons'

interface FuneralHomeCardProps {
  funeralHome: FuneralHome
}

export default function FuneralHomeCard({ funeralHome }: FuneralHomeCardProps) {
  const isPremium = funeralHome.listing_tier === 'premium' || funeralHome.listing_tier === 'featured'

  return (
    <Link
      to={`/pogrebna-preduzeca/${funeralHome.slug}`}
      className={`card card-hover block overflow-hidden group ${isPremium ? 'ring-2 ring-sky/50' : ''}`}
    >
      {/* Cover/Logo Section */}
      <div className="h-32 relative bg-gradient-to-br from-sand to-sand-light">
        {funeralHome.cover_image_url ? (
          <img
            src={funeralHome.cover_image_url}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FuneralHomeIcon size={48} className="text-text-muted/30" />
          </div>
        )}
        {isPremium && (
          <div className="absolute top-3 right-3 bg-sky text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <StarIcon size={12} />
            Premium
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
      </div>

      <div className="p-5">
        {/* Logo */}
        <div className="flex items-start gap-4 -mt-10 relative mb-4">
          {funeralHome.logo_url ? (
            <img
              src={funeralHome.logo_url}
              alt={funeralHome.name}
              className="w-16 h-16 rounded-lg object-contain bg-white shadow-soft border border-border-light"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-sand-light shadow-soft flex items-center justify-center border border-border-light">
              <FuneralHomeIcon size={28} className="text-text-muted" />
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-lg text-text-primary group-hover:text-sky-dark transition-colors mb-2">
          {funeralHome.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-text-secondary text-sm mb-3">
          <LocationIcon size={16} className="text-text-muted flex-shrink-0" />
          <span className="truncate">{funeralHome.city}</span>
        </div>

        {/* Phone */}
        {funeralHome.phone && (
          <div className="flex items-center gap-2 text-text-secondary text-sm mb-3">
            <PhoneIcon size={16} className="text-text-muted flex-shrink-0" />
            <span>{funeralHome.phone}</span>
          </div>
        )}

        {/* Services Preview */}
        {funeralHome.services && funeralHome.services.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {funeralHome.services.slice(0, 3).map((service, idx) => (
              <span
                key={idx}
                className="text-xs bg-sand-light text-text-secondary px-2 py-1 rounded"
              >
                {service}
              </span>
            ))}
            {funeralHome.services.length > 3 && (
              <span className="text-xs text-text-muted px-2 py-1">
                +{funeralHome.services.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
