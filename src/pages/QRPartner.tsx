import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getQRPartnerBySlug, formatQRMaterial } from '../lib/qrPartners'
import type { QRPartner as QRPartnerType } from '../types/partners'
import SEO from '../components/SEO'
import {
  QRCodeIcon,
  LocationIcon,
  PhoneIcon,
  EmailIcon,
  ClockIcon,
  ExternalLinkIcon,
  ArrowRightIcon
} from '../components/icons/FeatureIcons'

export default function QRPartner() {
  const { slug } = useParams<{ slug: string }>()
  const [qrPartner, setQRPartner] = useState<QRPartnerType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      loadQRPartner(slug)
    }
  }, [slug])

  const loadQRPartner = async (slug: string) => {
    setLoading(true)
    const { data, error: fetchError } = await getQRPartnerBySlug(slug)
    if (fetchError || !data) {
      setError('QR partner nije pronađen.')
    } else {
      setQRPartner(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-ivory">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-sky border-t-transparent"></div>
      </div>
    )
  }

  if (error || !qrPartner) {
    return (
      <div className="min-h-screen bg-ivory py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <QRCodeIcon size={48} className="text-text-muted mx-auto mb-4" />
          <h1 className="heading-2 mb-4">{error || 'Greška'}</h1>
          <Link to="/qr-partneri" className="btn-primary">
            Nazad na listu
          </Link>
        </div>
      </div>
    )
  }

  const formatWorkingHours = (hours: QRPartnerType['working_hours']) => {
    if (!hours) return null
    const days = [
      { key: 'monday', label: 'Ponedeljak' },
      { key: 'tuesday', label: 'Utorak' },
      { key: 'wednesday', label: 'Sreda' },
      { key: 'thursday', label: 'Četvrtak' },
      { key: 'friday', label: 'Petak' },
      { key: 'saturday', label: 'Subota' },
      { key: 'sunday', label: 'Nedelja' },
    ]
    return days.map(day => ({
      label: day.label,
      value: hours[day.key as keyof typeof hours] || 'Zatvoreno'
    }))
  }

  const workingHours = formatWorkingHours(qrPartner.working_hours)

  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title={`${qrPartner.business_name} - QR pločice za spomenike, ${qrPartner.city}`}
        description={qrPartner.description || `${qrPartner.business_name} - izrada QR pločica za spomenike u gradu ${qrPartner.city}. Kontakt, usluge i radno vreme.`}
        image={qrPartner.logo_url || qrPartner.cover_image_url || undefined}
        localBusiness={qrPartner.address ? {
          name: qrPartner.business_name,
          type: 'LocalBusiness',
          address: qrPartner.address,
          city: qrPartner.city,
          phone: qrPartner.phone || undefined,
          email: qrPartner.email || undefined,
          url: qrPartner.website || undefined
        } : undefined}
      />

      {/* Cover Image */}
      <div className="h-64 md:h-80 relative bg-gradient-to-br from-sky-light/30 to-sand-light">
        {qrPartner.cover_image_url ? (
          <img
            src={qrPartner.cover_image_url}
            alt={qrPartner.business_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <QRCodeIcon size={80} className="text-sky/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-20 relative pb-12">
        {/* Header Card */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            {qrPartner.logo_url ? (
              <img
                src={qrPartner.logo_url}
                alt={qrPartner.business_name}
                className="w-24 h-24 rounded-xl object-contain bg-white shadow-soft border border-border-light"
              />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-white shadow-soft flex items-center justify-center border border-border-light">
                <QRCodeIcon size={40} className="text-sky" />
              </div>
            )}

            <div className="flex-1">
              <h1 className="heading-1 mb-2">{qrPartner.business_name}</h1>
              <div className="flex items-center gap-2 text-text-secondary mb-4">
                <LocationIcon size={18} className="text-text-muted" />
                <span>{qrPartner.address ? `${qrPartner.address}, ` : ''}{qrPartner.city}</span>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-wrap gap-3">
                {qrPartner.phone && (
                  <a
                    href={`tel:${qrPartner.phone}`}
                    className="btn-primary flex items-center gap-2"
                  >
                    <PhoneIcon size={18} />
                    {qrPartner.phone}
                  </a>
                )}
                {qrPartner.website && (
                  <a
                    href={qrPartner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2"
                  >
                    <ExternalLinkIcon size={18} />
                    Posetite sajt
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            {qrPartner.description && (
              <div className="card p-6">
                <h2 className="heading-3 mb-4">O radnji</h2>
                <p className="text-text-secondary leading-relaxed">
                  {qrPartner.description}
                </p>
              </div>
            )}

            {/* Materials */}
            {qrPartner.qr_materials && qrPartner.qr_materials.length > 0 && (
              <div className="card p-6">
                <h2 className="heading-3 mb-4">Materijali za QR pločice</h2>
                <div className="flex flex-wrap gap-2">
                  {qrPartner.qr_materials.map((material, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 bg-sky-light/50 text-sky-dark px-4 py-2 rounded-lg font-medium"
                    >
                      {material === 'sticker' && '🏷️'}
                      {material === 'ceramic' && '🏺'}
                      {material === 'metal' && '🔩'}
                      {material === 'acrylic' && '💎'}
                      {formatQRMaterial(material)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {qrPartner.services && qrPartner.services.length > 0 && (
              <div className="card p-6">
                <h2 className="heading-3 mb-4">Usluge</h2>
                <ul className="space-y-2">
                  {qrPartner.services.map((service, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-text-secondary">
                      <ArrowRightIcon size={16} className="text-sky flex-shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* How to order */}
            <div className="card p-6 bg-sky-light/20 border-sky/30">
              <h2 className="heading-3 mb-4">Kako naručiti QR pločicu?</h2>
              <ol className="list-decimal list-inside space-y-2 text-text-secondary">
                <li>Preuzmite QR kod sa memorijala (PNG ili SVG format)</li>
                <li>Kontaktirajte ovu radnju telefonom ili emailom</li>
                <li>Dogovorite željeni materijal i veličinu pločice</li>
                <li>Preuzmite gotovu pločicu i postavite je na spomenik</li>
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="card p-6">
              <h2 className="heading-3 mb-4">Kontakt</h2>
              <div className="space-y-4">
                {qrPartner.address && (
                  <div className="flex items-start gap-3">
                    <LocationIcon size={20} className="text-text-muted mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-text-primary">{qrPartner.address}</p>
                      <p className="text-text-secondary">{qrPartner.city}</p>
                    </div>
                  </div>
                )}

                {qrPartner.phone && (
                  <div className="flex items-center gap-3">
                    <PhoneIcon size={20} className="text-text-muted flex-shrink-0" />
                    <a href={`tel:${qrPartner.phone}`} className="text-sky hover:text-sky-dark">
                      {qrPartner.phone}
                    </a>
                  </div>
                )}

                {qrPartner.email && (
                  <div className="flex items-center gap-3">
                    <EmailIcon size={20} className="text-text-muted flex-shrink-0" />
                    <a href={`mailto:${qrPartner.email}`} className="text-sky hover:text-sky-dark break-all">
                      {qrPartner.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Working Hours */}
            {workingHours && (
              <div className="card p-6">
                <h2 className="heading-3 mb-4 flex items-center gap-2">
                  <ClockIcon size={20} className="text-text-muted" />
                  Radno vreme
                </h2>
                <div className="space-y-2">
                  {workingHours.map((day, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-text-secondary">{day.label}</span>
                      <span className="text-text-primary">{day.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warning */}
            <div className="card p-6 bg-rose-light/20 border-rose/30">
              <p className="text-sm text-rose-dark">
                <strong>Važno:</strong> Ne preporučujemo gravuru QR koda direktno na kamen.
                Koristite lepljive pločice koje se mogu zameniti ako dođe do oštećenja.
              </p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link to="/qr-partneri" className="text-sky hover:text-sky-dark inline-flex items-center gap-2">
            <ArrowRightIcon size={16} className="rotate-180" />
            Nazad na listu QR partnera
          </Link>
        </div>
      </div>
    </div>
  )
}
