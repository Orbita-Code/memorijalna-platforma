import { Link } from 'react-router-dom'
import type { StoneMason } from '../types/partners'
import { StoneMasonIcon, LocationIcon, PhoneIcon, ExternalLinkIcon } from './icons/FeatureIcons'

interface StoneMasonBannerProps {
  stoneMason: StoneMason
  variant?: 'card' | 'banner'
}

export default function StoneMasonBanner({ stoneMason, variant = 'card' }: StoneMasonBannerProps) {
  if (variant === 'banner') {
    return (
      <div className="card overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Banner Image */}
          <div className="md:w-1/3 h-40 md:h-auto relative bg-gradient-to-br from-rose/20 to-sand">
            {stoneMason.banner_image_url ? (
              <img
                src={stoneMason.banner_image_url}
                alt={stoneMason.business_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center min-h-[160px]">
                <StoneMasonIcon size={48} className="text-rose/40" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="font-semibold text-xl text-text-primary">
                {stoneMason.business_name}
              </h3>
              {stoneMason.ad_tier === 'premium' && (
                <span className="text-xs bg-rose/20 text-rose-dark px-2 py-1 rounded font-medium">
                  Premium
                </span>
              )}
            </div>

            {stoneMason.description && (
              <p className="text-text-secondary mb-4 line-clamp-2">
                {stoneMason.description}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <LocationIcon size={16} className="text-text-muted" />
                <span>{stoneMason.city}</span>
              </div>
              {stoneMason.phone && (
                <div className="flex items-center gap-2">
                  <PhoneIcon size={16} className="text-text-muted" />
                  <span>{stoneMason.phone}</span>
                </div>
              )}
            </div>

            {stoneMason.website && (
              <a
                href={stoneMason.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sky hover:text-sky-dark transition-colors text-sm font-medium"
              >
                Posetite sajt
                <ExternalLinkIcon size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Card variant
  return (
    <Link
      to={`/kamenorezacke-radnje/${stoneMason.slug}`}
      className="card card-hover block overflow-hidden group"
    >
      {/* Banner Image */}
      <div className="h-32 relative bg-gradient-to-br from-rose/10 to-sand">
        {stoneMason.banner_image_url ? (
          <img
            src={stoneMason.banner_image_url}
            alt={stoneMason.business_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <StoneMasonIcon size={40} className="text-rose/30" />
          </div>
        )}
        {stoneMason.ad_tier === 'premium' && (
          <div className="absolute top-3 right-3 bg-rose text-white px-2 py-1 rounded text-xs font-medium">
            Premium
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
      </div>

      <div className="p-5">
        {/* Name */}
        <h3 className="font-semibold text-lg text-text-primary group-hover:text-sky-dark transition-colors mb-2">
          {stoneMason.business_name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
          <LocationIcon size={16} className="text-text-muted flex-shrink-0" />
          <span>{stoneMason.city}</span>
        </div>

        {/* Phone */}
        {stoneMason.phone && (
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <PhoneIcon size={16} className="text-text-muted flex-shrink-0" />
            <span>{stoneMason.phone}</span>
          </div>
        )}

        {/* Description preview */}
        {stoneMason.description && (
          <p className="text-text-secondary text-sm mt-3 line-clamp-2">
            {stoneMason.description}
          </p>
        )}
      </div>
    </Link>
  )
}
