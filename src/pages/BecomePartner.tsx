import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO, { SEO_CONFIGS } from '../components/SEO'
import {
  FuneralHomeIcon,
  CemeteryIcon,
  StoneMasonIcon,
  QRCodeIcon,
  FlowerIcon,
  HeartIcon,
  ShieldIcon,
  CheckIcon,
  StarIcon
} from '../components/icons/FeatureIcons'

type PartnerType = 'funeral_home' | 'cemetery' | 'stone_mason' | 'qr_partner' | 'florist' | 'charity' | 'insurance'

interface FormData {
  businessName: string
  partnerType: PartnerType | ''
  country: string
  city: string
  address: string
  email: string
  phone: string
  website: string
  description: string
  agreeToListing: boolean
  agreeToTerms: boolean
}

const initialFormData: FormData = {
  businessName: '',
  partnerType: '',
  country: 'Srbija',
  city: '',
  address: '',
  email: '',
  phone: '',
  website: '',
  description: '',
  agreeToListing: false,
  agreeToTerms: false
}

const partnerTypes = [
  { value: 'funeral_home', label: 'Pogrebno preduzeće', icon: FuneralHomeIcon },
  { value: 'cemetery', label: 'Groblje', icon: CemeteryIcon },
  { value: 'stone_mason', label: 'Kamenorezačka radnja', icon: StoneMasonIcon },
  { value: 'qr_partner', label: 'QR pločice (foto-radnja, štamparija)', icon: QRCodeIcon },
  { value: 'florist', label: 'Cvećara (pogrebno cveće)', icon: FlowerIcon },
  { value: 'charity', label: 'Humanitarna organizacija', icon: HeartIcon },
  { value: 'insurance', label: 'Životno osiguranje', icon: ShieldIcon },
]

const countries = [
  'Srbija',
  'Crna Gora',
  'Bosna i Hercegovina',
  'Hrvatska',
  'Slovenija',
  'Severna Makedonija',
  'Nemačka',
  'Austrija',
  'Švajcarska',
  'Drugo'
]

export default function BecomePartner() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when field is modified
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Naziv je obavezan'
    }
    if (!formData.partnerType) {
      newErrors.partnerType = 'Izaberite tip partnera'
    }
    if (!formData.country) {
      newErrors.country = 'Izaberite državu'
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Grad je obavezan'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email je obavezan'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Unesite validan email'
    }
    if (!formData.agreeToListing) {
      newErrors.agreeToListing = 'Morate se saglasiti sa prikazom listinga'
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Morate prihvatiti uslove'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setSubmitting(true)

    // Simulate API call - in production, this would go to Supabase and then Stripe
    await new Promise(resolve => setTimeout(resolve, 1500))

    // TODO: Implement actual submission:
    // 1. Save to Supabase partner_applications table
    // 2. Redirect to Stripe checkout
    // 3. On success, mark application as paid
    // 4. Admin approval workflow

    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-ivory py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="card p-8">
            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon size={32} className="text-sage-dark" />
            </div>
            <h1 className="heading-2 mb-4">Prijava uspešno poslata!</h1>
            <p className="text-text-secondary mb-6">
              Hvala vam na interesovanju. Kontaktiraćemo vas u najkraćem roku sa informacijama o narednim koracima.
            </p>
            <Link to="/" className="btn-primary">
              Nazad na početnu
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <SEO {...SEO_CONFIGS.becomePartner} />

      {/* Hero */}
      <div className="bg-gradient-to-b from-sand to-ivory py-12 border-b border-border-light">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="heading-1 mb-4">Postanite Partner</h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Pridružite se našoj platformi i povežite se sa porodicama kojima su vaše usluge potrebne.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Benefits */}
        <div className="card p-6 mb-8">
          <h2 className="heading-3 mb-4">Zašto postati partner?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-sky/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <StarIcon size={24} className="text-sky" />
              </div>
              <h3 className="font-semibold mb-2">Vidljivost</h3>
              <p className="text-text-secondary text-sm">Budite vidljivi porodicama koje traže vaše usluge</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckIcon size={24} className="text-sage-dark" />
              </div>
              <h3 className="font-semibold mb-2">Poverenje</h3>
              <p className="text-text-secondary text-sm">Izgradite reputaciju na pouzdanoj platformi</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-rose/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FuneralHomeIcon size={24} className="text-rose-dark" />
              </div>
              <h3 className="font-semibold mb-2">Jednostavno</h3>
              <p className="text-text-secondary text-sm">Brza registracija bez komplikovane dokumentacije</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-6 md:p-8">
          <h2 className="heading-2 mb-6">Prijavite se</h2>

          {/* Partner Type Selection */}
          <div className="mb-8">
            <label className="label">Tip partnera *</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {partnerTypes.map(type => {
                const Icon = type.icon
                const isSelected = formData.partnerType === type.value
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, partnerType: type.value as PartnerType }))}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      isSelected
                        ? 'border-sky bg-sky/5'
                        : 'border-border-light hover:border-sky/50'
                    }`}
                  >
                    <Icon size={28} className={isSelected ? 'text-sky mx-auto mb-2' : 'text-text-muted mx-auto mb-2'} />
                    <span className={`text-sm ${isSelected ? 'text-sky font-medium' : 'text-text-secondary'}`}>
                      {type.label}
                    </span>
                  </button>
                )
              })}
            </div>
            {errors.partnerType && (
              <p className="text-rose text-sm mt-2">{errors.partnerType}</p>
            )}
          </div>

          {/* Basic Info */}
          <div className="space-y-6 mb-8">
            <h3 className="font-semibold text-text-primary border-b border-border-light pb-2">Osnovni podaci</h3>

            <div>
              <label htmlFor="businessName" className="label">Naziv radnje / preduzeća *</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="npr. Pogrebno preduzeće Mir"
                className={`input ${errors.businessName ? 'border-rose' : ''}`}
              />
              {errors.businessName && (
                <p className="text-rose text-sm mt-1">{errors.businessName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="label">Država *</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`input ${errors.country ? 'border-rose' : ''}`}
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-rose text-sm mt-1">{errors.country}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="label">Grad *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="npr. Beograd"
                  className={`input ${errors.city ? 'border-rose' : ''}`}
                />
                {errors.city && (
                  <p className="text-rose text-sm mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="label">Adresa (opciono)</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="npr. Ulica i broj"
                className="input"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 mb-8">
            <h3 className="font-semibold text-text-primary border-b border-border-light pb-2">Kontakt</h3>

            <div>
              <label htmlFor="email" className="label">Kontakt email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="vas@email.com"
                className={`input ${errors.email ? 'border-rose' : ''}`}
              />
              {errors.email && (
                <p className="text-rose text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="label">Telefon (opciono)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+381 11 123 4567"
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="website" className="label">Website (opciono)</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.vasasajt.rs"
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-semibold text-text-primary border-b border-border-light pb-2 mb-6">Opis</h3>

            <div>
              <label htmlFor="description" className="label">Kratak opis usluge (max 500 karaktera)</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                placeholder="Opišite vaše usluge, radno iskustvo, i šta vas izdvaja..."
                className="input resize-none"
              />
              <p className="text-text-muted text-sm mt-1 text-right">
                {formData.description.length}/500
              </p>
            </div>
          </div>

          {/* Agreements */}
          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-text-primary border-b border-border-light pb-2">Saglasnosti</h3>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeToListing"
                checked={formData.agreeToListing}
                onChange={handleChange}
                className="mt-1"
              />
              <span className="text-text-secondary">
                Saglasan/na sam da se moj unos prikaže kao oglasni listing na platformi *
              </span>
            </label>
            {errors.agreeToListing && (
              <p className="text-rose text-sm ml-7">{errors.agreeToListing}</p>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1"
              />
              <span className="text-text-secondary">
                Saglasan/na sam sa{' '}
                <Link to="/uslovi" className="text-sky hover:text-sky-dark underline">
                  uslovima oglašavanja
                </Link> *
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="text-rose text-sm ml-7">{errors.agreeToTerms}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Slanje...
              </>
            ) : (
              'Pošalji prijavu'
            )}
          </button>

          {/* Legal Note */}
          <p className="text-text-muted text-sm mt-6 text-center">
            Partner listings predstavljaju oglasni sadržaj. Platforma ne vrši proveru pravnog statusa niti garantuje kvalitet usluga partnera.
          </p>
        </form>
      </div>
    </div>
  )
}
