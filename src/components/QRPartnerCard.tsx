import { Link } from 'react-router-dom'
import type { QRPartner } from '../types/partners'
import { formatQRMaterial } from '../lib/qrPartners'
import { QRCodeIcon, LocationIcon, PhoneIcon, StarIcon } from './icons/FeatureIcons'

interface QRPartnerCardProps {
  qrPartner: QRPartner
}

export default function QRPartnerCard({ qrPartner }: QRPartnerCardProps) {
  const isPremium = qrPartner.listing_tier === 'premium' || qrPartner.listing_tier === 'featured'

  return (
    <Link
      to={`/qr-partneri/${qrPartner.slug}`}
      className={`card card-hover block overflow-hidden group ${isPremium ? 'ring-2 ring-sky/50' : ''}`}
    >
      {/* Cover/Logo Section */}
      <div className="h-32 relative bg-gradient-to-br from-sky-light/30 to-sand-light">
        {qrPartner.cover_image_url ? (
          <img
            src={qrPartner.cover_image_url}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <QRCodeIcon size={48} className="text-sky/30" />
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
          {qrPartner.logo_url ? (
            <img
              src={qrPartner.logo_url}
              alt={qrPartner.business_name}
              className="w-16 h-16 rounded-lg object-contain bg-white shadow-soft border border-border-light"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-white shadow-soft flex items-center justify-center border border-border-light">
              <QRCodeIcon size={28} className="text-sky" />
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-lg text-text-primary group-hover:text-sky-dark transition-colors mb-2">
          {qrPartner.business_name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-text-secondary text-sm mb-3">
          <LocationIcon size={16} className="text-text-muted flex-shrink-0" />
          <span className="truncate">{qrPartner.city}</span>
        </div>

        {/* Phone */}
        {qrPartner.phone && (
          <div className="flex items-center gap-2 text-text-secondary text-sm mb-3">
            <PhoneIcon size={16} className="text-text-muted flex-shrink-0" />
            <span>{qrPartner.phone}</span>
          </div>
        )}

        {/* Materials */}
        {qrPartner.qr_materials && qrPartner.qr_materials.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {qrPartner.qr_materials.map((material, idx) => (
              <span
                key={idx}
                className="text-xs bg-sky-light/50 text-sky-dark px-2 py-1 rounded"
              >
                {formatQRMaterial(material)}
              </span>
            ))}
          </div>
        )}

        {/* Services Preview */}
        {qrPartner.services && qrPartner.services.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {qrPartner.services.slice(0, 2).map((service, idx) => (
              <span
                key={idx}
                className="text-xs bg-sand-light text-text-secondary px-2 py-1 rounded"
              >
                {service}
              </span>
            ))}
            {qrPartner.services.length > 2 && (
              <span className="text-xs text-text-muted px-2 py-1">
                +{qrPartner.services.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
