import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCemeteryBySlug } from '../lib/cemeteries'
import type { Cemetery as CemeteryType } from '../types/partners'
import SEO from '../components/SEO'
import {
  CemeteryIcon,
  LocationIcon,
  PhoneIcon,
  EmailIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckIcon
} from '../components/icons/FeatureIcons'

export default function Cemetery() {
  const { slug } = useParams<{ slug: string }>()
  const [cemetery, setCemetery] = useState<CemeteryType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      loadCemetery(slug)
    }
  }, [slug])

  const loadCemetery = async (slug: string) => {
    setLoading(true)
    const { data, error: fetchError } = await getCemeteryBySlug(slug)
    if (fetchError || !data) {
      setError('Groblje nije pronađeno.')
    } else {
      setCemetery(data)
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

  if (error || !cemetery) {
    return (
      <div className="min-h-screen bg-ivory py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <CemeteryIcon size={48} className="text-text-muted mx-auto mb-4" />
          <h1 className="heading-2 mb-4">{error || 'Greška'}</h1>
          <Link to="/groblja" className="btn-primary">
            Nazad na listu
          </Link>
        </div>
      </div>
    )
  }

  const formatWorkingHours = (hours: CemeteryType['working_hours']) => {
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

  const workingHours = formatWorkingHours(cemetery.working_hours)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sr-RS', {
      style: 'currency',
      currency: 'RSD',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title={`${cemetery.name} - Groblje, ${cemetery.city}`}
        description={cemetery.description || `${cemetery.name} - groblje u gradu ${cemetery.city}. Lokacija, kontakt, radno vreme i informacije o grobnim mestima.`}
        image={cemetery.cover_image_url || undefined}
        localBusiness={{
          name: cemetery.name,
          type: 'Cemetery',
          address: cemetery.address,
          city: cemetery.city,
          phone: cemetery.phone || undefined,
          email: cemetery.email || undefined
        }}
      />

      {/* Cover Image */}
      <div className="h-64 md:h-80 relative bg-gradient-to-br from-sage/20 to-sand">
        {cemetery.cover_image_url ? (
          <img
            src={cemetery.cover_image_url}
            alt={cemetery.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CemeteryIcon size={80} className="text-sage/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-20 relative pb-12">
        {/* Header Card */}
        <div className="card p-6 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-sage/10 rounded-full">
              <CemeteryIcon size={32} className="text-sage-dark" />
            </div>
            <div>
              <h1 className="heading-1 mb-2">{cemetery.name}</h1>
              <div className="flex items-center gap-2 text-text-secondary">
                <LocationIcon size={18} className="text-text-muted" />
                <span>{cemetery.address}, {cemetery.city}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            {cemetery.phone && (
              <a
                href={`tel:${cemetery.phone}`}
                className="btn-primary flex items-center gap-2"
              >
                <PhoneIcon size={18} />
                {cemetery.phone}
              </a>
            )}
            {cemetery.latitude && cemetery.longitude && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${cemetery.latitude},${cemetery.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <LocationIcon size={18} />
                Prikaži na mapi
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            {cemetery.description && (
              <div className="card p-6">
                <h2 className="heading-3 mb-4">O groblju</h2>
                <p className="text-text-secondary leading-relaxed">
                  {cemetery.description}
                </p>
              </div>
            )}

            {/* Facilities */}
            {cemetery.facilities && cemetery.facilities.length > 0 && (
              <div className="card p-6">
                <h2 className="heading-3 mb-4">Sadržaji</h2>
                <div className="grid grid-cols-2 gap-3">
                  {cemetery.facilities.map((facility, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-text-secondary">
                      <CheckIcon size={16} className="text-sage flex-shrink-0" />
                      {facility}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Plot Prices */}
            {cemetery.plot_prices && Object.keys(cemetery.plot_prices).length > 0 && (
              <div className="card p-6">
                <h2 className="heading-3 mb-4">Cene grobnih mesta</h2>
                <div className="space-y-3">
                  {cemetery.plot_prices.single && (
                    <div className="flex justify-between items-center py-2 border-b border-border-light">
                      <span className="text-text-secondary">Pojedinačno mesto</span>
                      <span className="font-semibold text-text-primary">{formatPrice(cemetery.plot_prices.single)}</span>
                    </div>
                  )}
                  {cemetery.plot_prices.double && (
                    <div className="flex justify-between items-center py-2 border-b border-border-light">
                      <span className="text-text-secondary">Dvostruko mesto</span>
                      <span className="font-semibold text-text-primary">{formatPrice(cemetery.plot_prices.double)}</span>
                    </div>
                  )}
                  {cemetery.plot_prices.family && (
                    <div className="flex justify-between items-center py-2 border-b border-border-light">
                      <span className="text-text-secondary">Porodična grobnica</span>
                      <span className="font-semibold text-text-primary">{formatPrice(cemetery.plot_prices.family)}</span>
                    </div>
                  )}
                  {cemetery.plot_prices.cremation && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-text-secondary">Urnino mesto</span>
                      <span className="font-semibold text-text-primary">{formatPrice(cemetery.plot_prices.cremation)}</span>
                    </div>
                  )}
                </div>
                <p className="text-text-muted text-sm mt-4">
                  * Cene su informativnog karaktera i mogu se razlikovati.
                </p>
              </div>
            )}

            {/* Map placeholder */}
            {cemetery.latitude && cemetery.longitude && (
              <div className="card p-6">
                <h2 className="heading-3 mb-4">Lokacija</h2>
                <div className="bg-sand-light rounded-lg h-64 flex items-center justify-center">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${cemetery.latitude},${cemetery.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center"
                  >
                    <LocationIcon size={40} className="text-text-muted mx-auto mb-2" />
                    <span className="text-sky hover:text-sky-dark">Otvori u Google Maps</span>
                  </a>
                </div>
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
                    <p className="text-text-primary">{cemetery.address}</p>
                    <p className="text-text-secondary">{cemetery.city}</p>
                  </div>
                </div>

                {cemetery.phone && (
                  <div className="flex items-center gap-3">
                    <PhoneIcon size={20} className="text-text-muted flex-shrink-0" />
                    <a href={`tel:${cemetery.phone}`} className="text-sky hover:text-sky-dark">
                      {cemetery.phone}
                    </a>
                  </div>
                )}

                {cemetery.email && (
                  <div className="flex items-center gap-3">
                    <EmailIcon size={20} className="text-text-muted flex-shrink-0" />
                    <a href={`mailto:${cemetery.email}`} className="text-sky hover:text-sky-dark break-all">
                      {cemetery.email}
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
          <Link to="/groblja" className="text-sky hover:text-sky-dark inline-flex items-center gap-2">
            <ArrowRightIcon size={16} className="rotate-180" />
            Nazad na listu grobalja
          </Link>
        </div>
      </div>
    </div>
  )
}
