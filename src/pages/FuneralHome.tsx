import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getFuneralHomeBySlug } from '../lib/funeralHomes'
import type { FuneralHome as FuneralHomeType } from '../types/partners'
import SEO from '../components/SEO'
import {
  FuneralHomeIcon,
  LocationIcon,
  PhoneIcon,
  EmailIcon,
  ClockIcon,
  ExternalLinkIcon,
  ArrowRightIcon
} from '../components/icons/FeatureIcons'

export default function FuneralHome() {
  const { slug } = useParams<{ slug: string }>()
  const [funeralHome, setFuneralHome] = useState<FuneralHomeType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      loadFuneralHome(slug)
    }
  }, [slug])

  const loadFuneralHome = async (slug: string) => {
    setLoading(true)
    const { data, error: fetchError } = await getFuneralHomeBySlug(slug)
    if (fetchError || !data) {
      setError('Pogrebno preduzeće nije pronađeno.')
    } else {
      setFuneralHome(data)
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

  if (error || !funeralHome) {
    return (
      <div className="min-h-screen bg-ivory py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <FuneralHomeIcon size={48} className="text-text-muted mx-auto mb-4" />
          <h1 className="heading-2 mb-4">{error || 'Greška'}</h1>
          <Link to="/pogrebna-preduzeca" className="btn-primary">
            Nazad na listu
          </Link>
        </div>
      </div>
    )
  }

  const formatWorkingHours = (hours: FuneralHomeType['working_hours']) => {
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

  const workingHours = formatWorkingHours(funeralHome.working_hours)

  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title={`${funeralHome.name} - Pogrebno preduzeće, ${funeralHome.city}`}
        description={funeralHome.description || `${funeralHome.name} - pogrebno preduzeće u gradu ${funeralHome.city}. Kontakt, usluge i radno vreme.`}
        image={funeralHome.logo_url || funeralHome.cover_image_url || undefined}
        localBusiness={{
          name: funeralHome.name,
          type: 'FuneralHome',
          address: funeralHome.address,
          city: funeralHome.city,
          phone: funeralHome.phone || undefined,
          email: funeralHome.email || undefined,
          url: funeralHome.website || undefined
        }}
      />

      {/* Cover Image */}
      <div className="h-64 md:h-80 relative bg-gradient-to-br from-sand to-sand-light">
        {funeralHome.cover_image_url ? (
          <img
            src={funeralHome.cover_image_url}
            alt={funeralHome.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FuneralHomeIcon size={80} className="text-text-muted/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-20 relative pb-12">
        {/* Header Card */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            {funeralHome.logo_url ? (
              <img
                src={funeralHome.logo_url}
                alt={funeralHome.name}
                className="w-24 h-24 rounded-xl object-contain bg-white shadow-soft border border-border-light"
              />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-sand-light shadow-soft flex items-center justify-center border border-border-light">
                <FuneralHomeIcon size={40} className="text-text-muted" />
              </div>
            )}

            <div className="flex-1">
              <h1 className="heading-1 mb-2">{funeralHome.name}</h1>
              <div className="flex items-center gap-2 text-text-secondary mb-4">
                <LocationIcon size={18} className="text-text-muted" />
                <span>{funeralHome.address}, {funeralHome.city}</span>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-wrap gap-3">
                {funeralHome.phone && (
                  <a
                    href={`tel:${funeralHome.phone}`}
                    className="btn-primary flex items-center gap-2"
                  >
                    <PhoneIcon size={18} />
                    {funeralHome.phone}
                  </a>
                )}
                {funeralHome.website && (
                  <a
                    href={funeralHome.website}
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
            {funeralHome.description && (
              <div className="card p-6">
                <h2 className="heading-3 mb-4">O preduzeću</h2>
                <p className="text-text-secondary leading-relaxed">
                  {funeralHome.description}
                </p>
              </div>
            )}

            {/* Services */}
            {funeralHome.services && funeralHome.services.length > 0 && (
              <div className="card p-6">
                <h2 className="heading-3 mb-4">Usluge</h2>
                <ul className="space-y-2">
                  {funeralHome.services.map((service, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-text-secondary">
                      <ArrowRightIcon size={16} className="text-sky flex-shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="card p-6">
              <h2 className="heading-3 mb-4">Kontakt</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <LocationIcon size={20} className="text-text-muted mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-text-primary">{funeralHome.address}</p>
                    <p className="text-text-secondary">{funeralHome.city}</p>
                  </div>
                </div>

                {funeralHome.phone && (
                  <div className="flex items-center gap-3">
                    <PhoneIcon size={20} className="text-text-muted flex-shrink-0" />
                    <a href={`tel:${funeralHome.phone}`} className="text-sky hover:text-sky-dark">
                      {funeralHome.phone}
                    </a>
                  </div>
                )}

                {funeralHome.email && (
                  <div className="flex items-center gap-3">
                    <EmailIcon size={20} className="text-text-muted flex-shrink-0" />
                    <a href={`mailto:${funeralHome.email}`} className="text-sky hover:text-sky-dark break-all">
                      {funeralHome.email}
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
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link to="/pogrebna-preduzeca" className="text-sky hover:text-sky-dark inline-flex items-center gap-2">
            <ArrowRightIcon size={16} className="rotate-180" />
            Nazad na listu pogrebnih preduzeća
          </Link>
        </div>
      </div>
    </div>
  )
}
