import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMemorialById } from '../lib/memorials'
import type { Memorial as MemorialType } from '../types/memorial'
import { useAuth } from '../contexts/AuthContext'
import BiographyDisplay from '../components/BiographyDisplay'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import GiftDisplay from '../components/GiftDisplay'
import GiftCatalog from '../components/GiftCatalog'
import SEO from '../components/SEO'
import ShareButtons from '../components/ShareButtons'
import QRCodeGenerator from '../components/QRCodeGenerator'
import { EternalFlame } from '../components/icons/ReligiousSymbols'
import { FlowerIcon, CalendarIcon, LocationIcon, PhotoIcon, VideoIcon, LockIcon } from '../components/icons/FeatureIcons'
import { getApprovedComments, getPendingCommentsCount } from '../lib/comments'
import { getMemorialGifts, updateGiftPaymentStatus } from '../lib/gifts'
import type { Comment } from '../types/comment'
import type { Gift } from '../types/gift'

export default function Memorial() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [memorial, setMemorial] = useState<MemorialType | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [pendingCommentsCount, setPendingCommentsCount] = useState(0)
  const [gifts, setGifts] = useState<Gift[]>([])
  const [showGiftPurchase, setShowGiftPurchase] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const fetchComments = useCallback(async () => {
    if (!id) return
    setCommentsLoading(true)
    const { data: commentsData } = await getApprovedComments(id)
    if (commentsData) {
      setComments(commentsData)
    }
    setCommentsLoading(false)
  }, [id])

  const fetchGifts = useCallback(async () => {
    if (!id) return
    const { data: giftsData } = await getMemorialGifts(id)
    if (giftsData) {
      setGifts(giftsData)
    }
  }, [id])

  useEffect(() => {
    async function fetchMemorial() {
      if (!id) {
        setError('Memorijal nije pronaden.')
        setLoading(false)
        return
      }

      const { data, error: fetchError } = await getMemorialById(id)

      if (fetchError || !data) {
        setError('Memorijal nije pronaden.')
      } else {
        setMemorial(data)
        const { data: commentsData } = await getApprovedComments(id)
        if (commentsData) {
          setComments(commentsData)
        }
        setCommentsLoading(false)

        const { count } = await getPendingCommentsCount(id)
        setPendingCommentsCount(count)

        const { data: giftsData } = await getMemorialGifts(id)
        if (giftsData) {
          setGifts(giftsData)
        }
      }
      setLoading(false)
    }

    fetchMemorial()

    // Handle payment success from URL
    const urlParams = new URLSearchParams(window.location.search)
    const payment = urlParams.get('payment')
    const giftId = urlParams.get('gift_id')

    if (payment === 'success' && giftId) {
      updateGiftPaymentStatus(giftId, 'completed').then(() => {
        setPaymentSuccess(true)
        if (id) {
          getMemorialGifts(id).then(({ data }) => {
            if (data) setGifts(data)
          })
        }
        window.history.replaceState({}, '', window.location.pathname)
        setTimeout(() => setPaymentSuccess(false), 5000)
      })
    }
  }, [id])

  const isOwner = user && memorial && user.id === memorial.user_id

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sr-Latn-RS', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatYear = (dateString: string) => {
    return new Date(dateString).getFullYear().toString()
  }

  // Placeholder fotografije za demo
  const placeholderPhotos = [
    { id: 'ph-1', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80', caption: 'Porodično okupljanje' },
    { id: 'ph-2', url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80', caption: 'Proslava rođendana' },
    { id: 'ph-3', url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80', caption: 'Letovanje' },
    { id: 'ph-4', url: 'https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=400&q=80', caption: 'Sa unucima' },
  ]

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-ivory">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-sky border-t-transparent mx-auto mb-4"></div>
          <p className="text-text-secondary">Učitavanje...</p>
        </div>
      </div>
    )
  }

  if (error || !memorial) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-ivory">
        <div className="text-center">
          <h1 className="heading-1 text-text-muted mb-4">Memorijal nije pronađen</h1>
          <p className="text-text-secondary text-lg mb-6">{error || 'Stranica koju tražite ne postoji.'}</p>
          <Link to="/memorijali" className="btn-primary">
            Pretraži memorijale
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title={`${memorial.first_name} ${memorial.last_name} - Memorijal`}
        description={memorial.biography
          ? `${memorial.biography.substring(0, 150)}...`
          : `Digitalni memorijal za ${memorial.first_name} ${memorial.last_name}. Posetite i ostavite sveću, cveće ili poruku sećanja.`
        }
        image={memorial.profile_image_url || undefined}
        type="profile"
        person={{
          name: `${memorial.first_name} ${memorial.last_name}`,
          birthDate: memorial.birth_date || undefined,
          deathDate: memorial.death_date || undefined,
          birthPlace: memorial.birth_place || undefined,
          deathPlace: memorial.death_place || undefined,
          image: memorial.profile_image_url || undefined
        }}
      />

      {/* Hero Section with Cover */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-64 sm:h-80 lg:h-96 relative overflow-hidden">
          {memorial.cover_image_url ? (
            <img
              src={memorial.cover_image_url}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            /* Default gradient cover */
            <div className="w-full h-full bg-gradient-to-b from-sky-light via-sand to-ivory" />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/40 to-transparent" />
        </div>

        {/* Profile Image - Overlapping */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-20 sm:-bottom-24">
          <div className="relative">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-sand border-4 border-white shadow-large overflow-hidden">
              {memorial.profile_image_url ? (
                <img
                  src={memorial.profile_image_url}
                  alt={`${memorial.first_name} ${memorial.last_name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-sand-light">
                  <EternalFlame size={48} className="text-rose" />
                </div>
              )}
            </div>
            {/* Religious Symbol Badge */}
            <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center border border-border-light">
              <EternalFlame size={20} className="text-rose" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pt-28 sm:pt-32 pb-16">
        {/* Owner Edit Button */}
        {isOwner && (
          <div className="flex justify-end mb-4">
            <Link
              to={`/memorijal/${memorial.id}/izmeni`}
              className="btn-secondary text-sm"
            >
              Izmeni memorijal
              {pendingCommentsCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-rose-light text-rose rounded-full">
                  {pendingCommentsCount}
                </span>
              )}
            </Link>
          </div>
        )}

        {/* Name and Dates */}
        <div className="text-center mb-8">
          <h1 className="heading-display mb-3">
            {memorial.first_name} {memorial.last_name}
          </h1>
          <p className="text-xl text-text-secondary font-light">
            {memorial.birth_date && formatYear(memorial.birth_date)} – {memorial.death_date && formatYear(memorial.death_date)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          {memorial.is_public && (
            <button
              onClick={() => setShowGiftPurchase(true)}
              className="btn-primary flex items-center gap-2"
            >
              <FlowerIcon size={18} />
              Pošaljite cveće
            </button>
          )}
          <ShareButtons
            url={`/memorijal/${memorial.id}`}
            title={`${memorial.first_name} ${memorial.last_name}`}
            description={memorial.biography ? memorial.biography.substring(0, 150) : `Memorijalna stranica za ${memorial.first_name} ${memorial.last_name}`}
            type="memorial"
            compact
          />
          <QRCodeGenerator
            memorialId={memorial.id}
            memorialName={`${memorial.first_name} ${memorial.last_name}`}
            isUnlocked={false} // TODO: Proveriti iz baze da li je kupljen
            onPurchase={() => {
              // TODO: Stripe checkout
              alert('Plaćanje će biti dostupno uskoro. Kontaktirajte nas za više informacija.')
            }}
          />
        </div>

        {/* ================================
            SEKCIJA 1: OSNOVNI PODACI
            ================================ */}
        <div className="card p-6 sm:p-8 mb-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-sand-light flex items-center justify-center flex-shrink-0">
                <CalendarIcon size={18} className="text-text-secondary" />
              </div>
              <div>
                <p className="caption mb-1">Rođen/a</p>
                <p className="text-text-primary font-medium">
                  {memorial.birth_date && formatDate(memorial.birth_date)}
                </p>
                {memorial.birth_place && (
                  <p className="text-text-secondary text-sm">{memorial.birth_place}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-sand-light flex items-center justify-center flex-shrink-0">
                <CalendarIcon size={18} className="text-text-secondary" />
              </div>
              <div>
                <p className="caption mb-1">Preminuo/la</p>
                <p className="text-text-primary font-medium">
                  {memorial.death_date && formatDate(memorial.death_date)}
                </p>
                {memorial.death_place && (
                  <p className="text-text-secondary text-sm">{memorial.death_place}</p>
                )}
              </div>
            </div>

            {memorial.burial_place && (
              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="w-10 h-10 rounded-full bg-sand-light flex items-center justify-center flex-shrink-0">
                  <LocationIcon size={18} className="text-text-secondary" />
                </div>
                <div>
                  <p className="caption mb-1">Mesto sahrane</p>
                  <p className="text-text-primary font-medium">{memorial.burial_place}</p>
                </div>
              </div>
            )}
          </div>

          {/* Roditelji */}
          {(memorial.father_name || memorial.mother_name) && (
            <div className="mt-8 pt-6 border-t border-border-light">
              <p className="caption mb-4">Roditelji</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {memorial.father_name && (
                  <p className="text-text-primary">
                    <span className="text-text-secondary">Otac:</span> {memorial.father_name}
                  </p>
                )}
                {memorial.mother_name && (
                  <p className="text-text-primary">
                    <span className="text-text-secondary">Majka:</span> {memorial.mother_name}
                    {memorial.mother_maiden_name && (
                      <span className="text-text-muted"> (rođ. {memorial.mother_maiden_name})</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ================================
            SEKCIJA 2: ŽIVOTNA PRIČA
            ================================ */}
        <div className="card p-6 sm:p-8 mb-8">
          <h2 className="heading-2 mb-6">Životna priča</h2>
          <div className="prose-memorial">
            <BiographyDisplay biography={memorial.biography} />
          </div>
        </div>

        {/* ================================
            SEKCIJA 3: FOTOGRAFIJE (Freemium)
            ================================ */}
        <div className="card p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-2 flex items-center gap-3">
              <PhotoIcon size={24} className="text-sky" />
              Fotografije
            </h2>
            <span className="text-sm text-white bg-sky px-3 py-1 rounded-full">
              {placeholderPhotos.length} fotografija
            </span>
          </div>

          {/* Grid fotografija */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {placeholderPhotos.map((photo, index) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-sand-light">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Overlay sa zaključavanjem za demo */}
                {index >= 2 && (
                  <div className="absolute inset-0 bg-text-primary/60 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <LockIcon size={24} className="text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Premium CTA */}
          <div className="bg-sky-light/20 border-2 border-sky/30 rounded-lg p-5 text-center">
            <LockIcon size={28} className="text-sky mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Otključajte sve fotografije
            </h3>
            <p className="text-text-secondary mb-4">
              Dodajte neograničen broj fotografija za trajno čuvanje uspomena
            </p>
            <button className="bg-sky hover:bg-sky-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Nadogradite paket — 999 RSD
            </button>
          </div>
        </div>

        {/* ================================
            SEKCIJA 4: VIDEO (Freemium)
            ================================ */}
        <div className="card p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-2 flex items-center gap-3">
              <VideoIcon size={24} className="text-rose" />
              Video zapisi
            </h2>
          </div>

          {/* Placeholder video */}
          <div className="relative rounded-xl overflow-hidden bg-text-primary aspect-video mb-6">
            <img
              src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80"
              alt="Video placeholder"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-4">
                <LockIcon size={32} className="text-white" />
              </div>
              <p className="text-lg font-medium">Video sadržaj je zaključan</p>
            </div>
          </div>

          {/* Premium CTA */}
          <div className="bg-rose-light/20 border-2 border-rose/30 rounded-lg p-5 text-center">
            <VideoIcon size={28} className="text-rose mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Dodajte video uspomene
            </h3>
            <p className="text-text-secondary mb-4">
              Sačuvajte dragocene video zapise sa porodičnih okupljanja i posebnih trenutaka
            </p>
            <button className="bg-rose hover:bg-rose-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Aktivirajte video — 1499 RSD
            </button>
          </div>
        </div>

        {/* ================================
            SEKCIJA 5: POKLONI
            ================================ */}
        {memorial.is_public && (
          <div className="card p-6 sm:p-8 mb-8">
            {/* Payment Success Message */}
            {paymentSuccess && (
              <div className="alert-success flex items-center gap-3 mb-6">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Hvala na poklonu! Vaš poklon je uspešno dodat.</span>
              </div>
            )}

            <h2 className="heading-2 mb-6">Pokloni</h2>
            <GiftDisplay gifts={gifts} />

            <div className="mt-8 pt-6 border-t border-border-light">
              {showGiftPurchase ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="heading-3">Izaberite poklon</h3>
                    <button
                      onClick={() => setShowGiftPurchase(false)}
                      className="btn-ghost"
                    >
                      Zatvori
                    </button>
                  </div>
                  <GiftCatalog
                    memorialId={memorial.id}
                    onPurchaseComplete={() => {
                      setShowGiftPurchase(false)
                      fetchGifts()
                    }}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setShowGiftPurchase(true)}
                  className="w-full py-4 text-center text-white font-medium bg-sky hover:bg-sky-dark rounded-lg transition-colors"
                >
                  <FlowerIcon size={20} className="inline-block mr-2 -mt-0.5" />
                  Zapalite sveću ili položite cveće
                </button>
              )}
            </div>
          </div>
        )}

        {/* ================================
            SEKCIJA 6: KNJIGA SEĆANJA
            ================================ */}
        <div className="card p-6 sm:p-8">
          <h2 className="heading-2 mb-6">Knjiga sećanja</h2>
          <CommentList comments={comments} loading={commentsLoading} />

          {memorial.is_public && (
            <div className="mt-8 pt-6 border-t border-border-light">
              {showCommentForm ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="heading-3">Ostavite posvetu</h3>
                    <button
                      onClick={() => setShowCommentForm(false)}
                      className="btn-ghost"
                    >
                      Zatvori
                    </button>
                  </div>
                  <CommentForm
                    memorialId={memorial.id}
                    onSubmitSuccess={() => {
                      setShowCommentForm(false)
                      fetchComments()
                    }}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setShowCommentForm(true)}
                  className="w-full py-4 text-center text-white font-medium bg-sage hover:bg-sage-dark rounded-lg transition-colors"
                >
                  Ostavite posvetu ili sećanje
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
