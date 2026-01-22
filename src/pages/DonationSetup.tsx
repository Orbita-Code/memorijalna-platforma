import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getMemorialById, updateMemorial } from '../lib/memorials'
import { simulateStripeOnboarding, mockCompleteOnboarding, PLATFORM_FEE_PERCENT } from '../lib/stripeConnect'
import {
  PRESET_CHARITIES,
  CHARITY_CATEGORIES,
  isValidDonationUrl,
  type Charity,
  type CharityCategory,
} from '../lib/charities'
import type { Memorial } from '../types/memorial'
import SEO from '../components/SEO'
import {
  HeartIcon,
  GlobeIcon,
  CheckIcon,
  ShieldIcon,
} from '../components/icons/FeatureIcons'

export default function DonationSetup() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [memorial, setMemorial] = useState<Memorial | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Family donations state
  const [familyEnabled, setFamilyEnabled] = useState(false)
  const [donationMessage, setDonationMessage] = useState('')
  const [stripeComplete, setStripeComplete] = useState(false)

  // Charity donations state
  const [charityEnabled, setCharityEnabled] = useState(false)
  const [selectedCharity, setSelectedCharity] = useState<Charity | null>(null)
  const [customCharity, setCustomCharity] = useState(false)
  const [customCharityName, setCustomCharityName] = useState('')
  const [customCharityUrl, setCustomCharityUrl] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<CharityCategory | 'all'>('all')

  // Check for Stripe onboarding return
  useEffect(() => {
    const successParam = searchParams.get('success')
    const simulateParam = searchParams.get('simulate')

    if (successParam === 'true' || simulateParam === 'true') {
      // User returned from Stripe onboarding
      handleStripeOnboardingComplete()
    }
  }, [searchParams])

  useEffect(() => {
    if (id) {
      loadMemorial()
    }
  }, [id])

  const loadMemorial = async () => {
    if (!id) return

    setLoading(true)
    const { data, error } = await getMemorialById(id)

    if (error || !data) {
      setError('Memorijal nije pronađen')
      setLoading(false)
      return
    }

    // Check ownership
    if (data.user_id !== user?.id) {
      setError('Nemate dozvolu za izmenu ovog memorijala')
      setLoading(false)
      return
    }

    setMemorial(data)

    // Initialize state from memorial
    setFamilyEnabled(data.family_donations_enabled || false)
    setDonationMessage(data.donation_message || '')
    setStripeComplete(data.stripe_onboarding_complete || false)
    setCharityEnabled(data.charity_donations_enabled || false)

    // Load charity selection
    if (data.charity_id) {
      const preset = PRESET_CHARITIES.find((c) => c.id === data.charity_id)
      if (preset) {
        setSelectedCharity(preset)
      }
    } else if (data.charity_name && data.charity_donation_url) {
      setCustomCharity(true)
      setCustomCharityName(data.charity_name)
      setCustomCharityUrl(data.charity_donation_url)
    }

    setLoading(false)
  }

  const handleStripeOnboardingComplete = async () => {
    if (!id) return

    // In development, mock the completion
    const success = await mockCompleteOnboarding(id)
    if (success) {
      setStripeComplete(true)
      setSuccess('Vaš nalog za primanje donacija je uspešno podešen!')
      loadMemorial()
    }
  }

  const startStripeOnboarding = () => {
    if (!id) return

    // In development, use simulated onboarding
    const onboardingUrl = simulateStripeOnboarding(id)
    window.location.href = onboardingUrl
  }

  const handleSave = async () => {
    if (!id || !memorial) return

    setSaving(true)
    setError(null)
    setSuccess(null)

    // Validate
    if (charityEnabled && !customCharity && !selectedCharity) {
      setError('Molimo izaberite humanitarnu organizaciju')
      setSaving(false)
      return
    }

    if (charityEnabled && customCharity) {
      if (!customCharityName.trim()) {
        setError('Molimo unesite ime organizacije')
        setSaving(false)
        return
      }
      if (!isValidDonationUrl(customCharityUrl)) {
        setError('Molimo unesite ispravan URL za donacije (mora početi sa http:// ili https://)')
        setSaving(false)
        return
      }
    }

    const updateData = {
      family_donations_enabled: familyEnabled && stripeComplete,
      donation_message: donationMessage || null,
      charity_donations_enabled: charityEnabled,
      charity_id: charityEnabled && !customCharity && selectedCharity ? selectedCharity.id : null,
      charity_name: charityEnabled && customCharity ? customCharityName : null,
      charity_donation_url: charityEnabled && customCharity ? customCharityUrl :
                           charityEnabled && selectedCharity ? selectedCharity.donationUrl : null,
    }

    const { error: updateError } = await updateMemorial(id, updateData, user!.id)

    if (updateError) {
      setError('Greška pri čuvanju podešavanja')
      setSaving(false)
      return
    }

    setSuccess('Podešavanja donacija su sačuvana!')
    setSaving(false)

    // Reload memorial
    loadMemorial()
  }

  const filteredCharities =
    categoryFilter === 'all'
      ? PRESET_CHARITIES
      : PRESET_CHARITIES.filter((c) => c.category === categoryFilter)

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-sky border-t-transparent" />
      </div>
    )
  }

  if (error && !memorial) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="card p-8 text-center max-w-md">
          <p className="text-rose-dark mb-4">{error}</p>
          <button onClick={() => navigate(-1)} className="btn-secondary">
            Nazad
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title={`Podešavanje donacija | ${memorial?.first_name} ${memorial?.last_name}`}
        description="Omogućite posetiocima memorijala da doniraju porodici ili humanitarnoj organizaciji"
      />

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/memorijal/${id}/izmeni`)}
            className="text-sky-dark hover:text-sky mb-4 inline-flex items-center gap-1"
          >
            ← Nazad na memorijal
          </button>
          <h1 className="heading-1 mb-2">Podešavanje donacija</h1>
          <p className="text-text-secondary">
            Memorijal: <strong>{memorial?.first_name} {memorial?.last_name}</strong>
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-rose-light border border-rose/30 rounded-lg p-4 mb-6">
            <p className="text-rose-dark">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-sage-light border border-sage/30 rounded-lg p-4 mb-6">
            <p className="text-sage-dark">{success}</p>
          </div>
        )}

        {/* ============================================
            FAMILY DONATIONS SECTION
            ============================================ */}
        <section className="card p-6 md:p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-sky-light rounded-full flex-shrink-0">
              <HeartIcon size={28} className="text-sky-dark" />
            </div>
            <div className="flex-1">
              <h2 className="heading-2 mb-2">Pomoć porodici</h2>
              <p className="text-text-secondary">
                Omogućite posetiocima da direktno pomognu porodici. Novac ide na vaš račun.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={familyEnabled}
                onChange={(e) => setFamilyEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-sand rounded-full peer peer-checked:bg-sky-dark transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-6" />
            </label>
          </div>

          {familyEnabled && (
            <div className="space-y-6 border-t border-border-light pt-6">
              {/* Stripe Connect Status */}
              {!stripeComplete ? (
                <div className="bg-sand-light rounded-lg p-6">
                  <h3 className="font-semibold text-text-primary mb-3">
                    Korak 1: Povežite vaš bankovni račun
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Da biste primali donacije, potrebno je da povežete vaš bankovni račun
                    preko Stripe-a (siguran sistem za plaćanja).
                  </p>
                  <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
                    <ShieldIcon size={16} />
                    <span>Vaši podaci su zaštićeni i šifrovani</span>
                  </div>
                  <button
                    onClick={startStripeOnboarding}
                    className="btn-primary"
                  >
                    Poveži bankovni račun
                  </button>
                </div>
              ) : (
                <div className="bg-sage-light/30 rounded-lg p-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center">
                    <CheckIcon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sage-dark">Bankovni račun je povezan</p>
                    <p className="text-sm text-text-secondary">Spremni ste za primanje donacija</p>
                  </div>
                </div>
              )}

              {/* Donation Message */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Poruka uz donaciju (opciono)
                </label>
                <textarea
                  value={donationMessage}
                  onChange={(e) => setDonationMessage(e.target.value)}
                  placeholder="npr. Sredstva će biti iskorišćena za troškove sahrane i pomoć porodici..."
                  className="input min-h-[100px]"
                  maxLength={500}
                />
              </div>

              {/* Fee Info */}
              <div className="bg-sand-light rounded-lg p-4 text-sm text-text-secondary">
                <p>
                  <strong>Napomena:</strong> Od svake donacije, {PLATFORM_FEE_PERCENT}% ide platformi
                  za održavanje servisa. Ostatak ({100 - PLATFORM_FEE_PERCENT}%) ide direktno vama.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ============================================
            CHARITY DONATIONS SECTION
            ============================================ */}
        <section className="card p-6 md:p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-sage-light rounded-full flex-shrink-0">
              <GlobeIcon size={28} className="text-sage-dark" />
            </div>
            <div className="flex-1">
              <h2 className="heading-2 mb-2">Donacija humanitarnoj organizaciji</h2>
              <p className="text-text-secondary">
                Posetioci mogu donirati organizaciji koja je bila bliska srcu preminulog.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={charityEnabled}
                onChange={(e) => setCharityEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-sand rounded-full peer peer-checked:bg-sage-dark transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-6" />
            </label>
          </div>

          {charityEnabled && (
            <div className="space-y-6 border-t border-border-light pt-6">
              {/* Toggle: Preset vs Custom */}
              <div className="flex gap-4">
                <button
                  onClick={() => setCustomCharity(false)}
                  className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                    !customCharity
                      ? 'border-sage bg-sage-light/30'
                      : 'border-border-light hover:border-sage/50'
                  }`}
                >
                  <p className="font-medium text-text-primary">Izaberite iz liste</p>
                  <p className="text-sm text-text-secondary">Poznate organizacije</p>
                </button>
                <button
                  onClick={() => setCustomCharity(true)}
                  className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                    customCharity
                      ? 'border-sage bg-sage-light/30'
                      : 'border-border-light hover:border-sage/50'
                  }`}
                >
                  <p className="font-medium text-text-primary">Druga organizacija</p>
                  <p className="text-sm text-text-secondary">Unesite ručno</p>
                </button>
              </div>

              {!customCharity ? (
                <>
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Filtriraj po kategoriji
                    </label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value as CharityCategory | 'all')}
                      className="input"
                    >
                      <option value="all">Sve kategorije</option>
                      {Object.entries(CHARITY_CATEGORIES).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Charity List */}
                  <div className="grid gap-3 max-h-96 overflow-y-auto">
                    {filteredCharities.map((charity) => (
                      <button
                        key={charity.id}
                        onClick={() => setSelectedCharity(charity)}
                        className={`p-4 rounded-lg border-2 text-left transition-colors ${
                          selectedCharity?.id === charity.id
                            ? 'border-sage bg-sage-light/30'
                            : 'border-border-light hover:border-sage/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-text-primary">{charity.name}</p>
                            <p className="text-sm text-text-secondary">{charity.description}</p>
                          </div>
                          {selectedCharity?.id === charity.id && (
                            <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center">
                              <CheckIcon size={14} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs bg-sand px-2 py-1 rounded">
                            {CHARITY_CATEGORIES[charity.category]}
                          </span>
                          <span className="text-xs text-text-muted">
                            {charity.country === 'RS' ? 'Srbija' :
                             charity.country === 'INT' ? 'Međunarodna' : charity.country}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Custom Charity Form */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Ime organizacije *
                    </label>
                    <input
                      type="text"
                      value={customCharityName}
                      onChange={(e) => setCustomCharityName(e.target.value)}
                      placeholder="npr. Lokalni azil za životinje"
                      className="input"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Link za donacije *
                    </label>
                    <input
                      type="url"
                      value={customCharityUrl}
                      onChange={(e) => setCustomCharityUrl(e.target.value)}
                      placeholder="https://..."
                      className="input"
                    />
                    <p className="text-sm text-text-muted mt-1">
                      Link ka stranici gde posetioci mogu donirati
                    </p>
                  </div>
                </>
              )}

              {/* Info */}
              <div className="bg-sand-light rounded-lg p-4 text-sm text-text-secondary">
                <p>
                  <strong>Kako funkcioniše:</strong> Dugme "Doniraj organizaciji" će
                  otvoriti stranicu izabrane organizacije u novom tabu. Donacije
                  idu direktno organizaciji.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/memorijal/${id}`)}
            className="btn-secondary"
          >
            Otkaži
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary"
          >
            {saving ? 'Čuvanje...' : 'Sačuvaj podešavanja'}
          </button>
        </div>
      </div>
    </div>
  )
}
