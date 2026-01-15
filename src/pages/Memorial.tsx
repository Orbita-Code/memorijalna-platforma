import { useEffect, useState, useCallback, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMemorialById } from '../lib/memorials'
import { getMemorialMedia, deleteMedia } from '../lib/media'
import type { Memorial as MemorialType } from '../types/memorial'
import type { MediaItem } from '../types/media'
import { useAuth } from '../contexts/AuthContext'
import PhotoGallery from '../components/PhotoGallery'
import VideoPlayer from '../components/VideoPlayer'
import DocumentList from '../components/DocumentList'
import MediaUpload from '../components/MediaUpload'
import BiographyDisplay from '../components/BiographyDisplay'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import GiftDisplay from '../components/GiftDisplay'
import GiftCatalog from '../components/GiftCatalog'
import { getApprovedComments, getPendingCommentsCount } from '../lib/comments'
import { getMemorialGifts, updateGiftPaymentStatus } from '../lib/gifts'
import type { Comment } from '../types/comment'
import type { Gift } from '../types/gift'

export default function Memorial() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [memorial, setMemorial] = useState<MemorialType | null>(null)
  const [media, setMedia] = useState<MediaItem[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showUpload, setShowUpload] = useState(false)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [pendingCommentsCount, setPendingCommentsCount] = useState(0)
  const [gifts, setGifts] = useState<Gift[]>([])
  const [showGiftPurchase, setShowGiftPurchase] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const fetchMedia = useCallback(async () => {
    if (!id) return
    const { data: mediaData } = await getMemorialMedia(id)
    if (mediaData) {
      setMedia(mediaData)
    }
  }, [id])

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
        // Fetch media after memorial is loaded
        const { data: mediaData } = await getMemorialMedia(id)
        if (mediaData) {
          setMedia(mediaData)
        }
        // Fetch comments
        const { data: commentsData } = await getApprovedComments(id)
        if (commentsData) {
          setComments(commentsData)
        }
        setCommentsLoading(false)

        // Fetch pending count for owner
        const { count } = await getPendingCommentsCount(id)
        setPendingCommentsCount(count)

        // Fetch gifts
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
      // Update gift payment status
      updateGiftPaymentStatus(giftId, 'completed').then(() => {
        setPaymentSuccess(true)
        // Refresh gifts
        if (id) {
          getMemorialGifts(id).then(({ data }) => {
            if (data) setGifts(data)
          })
        }
        // Clear URL params
        window.history.replaceState({}, '', window.location.pathname)
        // Clear success message after 5 seconds
        setTimeout(() => setPaymentSuccess(false), 5000)
      })
    }
  }, [id])

  const handleUploadComplete = () => {
    setShowUpload(false)
    fetchMedia()
  }

  const handleDeleteMedia = async (mediaId: string, type?: string) => {
    const messages: Record<string, string> = {
      image: 'Da li ste sigurni da zelite da obrisete ovu fotografiju?',
      video: 'Da li ste sigurni da zelite da obrisete ovaj video?',
      document: 'Da li ste sigurni da zelite da obrisete ovaj dokument?',
    }
    const message = type ? messages[type] : messages.image
    if (!confirm(message)) {
      return
    }
    const { error: deleteError } = await deleteMedia(mediaId)
    if (!deleteError) {
      setMedia((prev) => prev.filter((m) => m.id !== mediaId))
    }
  }

  // Check if current user is the memorial owner
  const isOwner = user && memorial && user.id === memorial.user_id

  // Separate media by type
  const images = useMemo(() => media.filter((m) => m.type === 'image'), [media])
  const videos = useMemo(() => media.filter((m) => m.type === 'video'), [media])
  const documents = useMemo(() => media.filter((m) => m.type === 'document'), [media])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sr-Latn-RS', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sr-Latn-RS', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ucitavanje...</p>
        </div>
      </div>
    )
  }

  if (error || !memorial) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-400 mb-4">404</h1>
          <p className="text-gray-600 text-lg">{error || 'Memorijal nije pronaden.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="h-48 sm:h-64 md:h-80 relative overflow-hidden">
        {memorial.cover_image_url ? (
          <>
            <img
              src={memorial.cover_image_url}
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 -mt-16 relative z-10 pb-12">
        {/* Profile Section */}
        <div className="text-center mb-8">
          {/* Edit Button for Owner */}
          {isOwner && (
            <div className="flex justify-end mb-4">
              <Link
                to={`/memorijal/${memorial.id}/izmeni`}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Izmeni
                {pendingCommentsCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    {pendingCommentsCount}
                  </span>
                )}
              </Link>
            </div>
          )}

          {/* Profile Image */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden">
            {memorial.profile_image_url ? (
              <img
                src={memorial.profile_image_url}
                alt={`${memorial.first_name} ${memorial.last_name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>

          {/* Name */}
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-800 mb-2 tracking-wide">
            {memorial.first_name.toUpperCase()} {memorial.last_name.toUpperCase()}
          </h1>

          {/* Dates */}
          <p className="text-lg text-gray-600 font-light">
            {formatShortDate(memorial.date_of_birth)} - {formatShortDate(memorial.date_of_death)}
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8 space-y-6">
          {/* Birth and Death Places */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Mesto rodenja
              </h3>
              <p className="text-gray-800">{memorial.place_of_birth}</p>
              <p className="text-sm text-gray-500">{formatDate(memorial.date_of_birth)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Mesto smrti
              </h3>
              <p className="text-gray-800">{memorial.place_of_death}</p>
              <p className="text-sm text-gray-500">{formatDate(memorial.date_of_death)}</p>
            </div>
          </div>

          {/* Parents Section */}
          {(memorial.father_name || memorial.mother_name) && (
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                Roditelji
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {memorial.father_name && (
                  <div>
                    <span className="text-gray-500 text-sm">Otac: </span>
                    <span className="text-gray-800">{memorial.father_name}</span>
                  </div>
                )}
                {memorial.mother_name && (
                  <div>
                    <span className="text-gray-500 text-sm">Majka: </span>
                    <span className="text-gray-800">{memorial.mother_name}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Biography Section */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
              Biografija
            </h3>
            <BiographyDisplay biography={memorial.biography} />
          </div>
        </div>

        {/* Media Upload Section - Owner Only */}
        {isOwner && (
          <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Dodaj medije
              </h3>
              {!showUpload && (
                <button
                  onClick={() => setShowUpload(true)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Dodaj fotografije, video ili dokumente
                </button>
              )}
            </div>

            {showUpload && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-700">
                    Dodavanje medija
                  </h4>
                  <button
                    onClick={() => setShowUpload(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </button>
                </div>
                <MediaUpload
                  memorialId={memorial.id}
                  onUploadComplete={handleUploadComplete}
                />
              </div>
            )}
          </div>
        )}

        {/* Photo Gallery Section */}
        {(images.length > 0 || !isOwner) && (
          <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8 mt-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
              Fotografije
            </h3>
            <PhotoGallery
              media={images}
              canEdit={!!isOwner}
              onDelete={(id) => handleDeleteMedia(id, 'image')}
            />
          </div>
        )}

        {/* Video Section */}
        {videos.length > 0 && (
          <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8 mt-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
              Video zapisi
            </h3>
            <div className="space-y-6">
              {videos.map((video) => (
                <VideoPlayer
                  key={video.id}
                  video={video}
                  canEdit={!!isOwner}
                  onDelete={(id) => handleDeleteMedia(id, 'video')}
                />
              ))}
            </div>
          </div>
        )}

        {/* Documents Section */}
        {documents.length > 0 && (
          <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8 mt-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
              Dokumenta
            </h3>
            <DocumentList
              documents={documents}
              canEdit={!!isOwner}
              onDelete={(id) => handleDeleteMedia(id, 'document')}
            />
          </div>
        )}

        {/* Gifts Section */}
        {memorial.is_active && (
          <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8 mt-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
              Pokloni
            </h3>

            {/* Payment success message */}
            {paymentSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-green-800 font-medium">Hvala na poklonu! Vas poklon je uspesno dodat.</span>
                </div>
              </div>
            )}

            {/* Gift display */}
            <GiftDisplay gifts={gifts} />

            {/* Gift purchase */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              {showGiftPurchase ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Izaberite poklon
                    </h4>
                    <button
                      onClick={() => setShowGiftPurchase(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
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
                  className="w-full px-4 py-3 text-sm font-medium text-amber-800 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors border border-amber-200"
                >
                  <svg
                    className="w-5 h-5 inline-block mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2c-.5 2-2 3-2 5 0 1.5 1 2.5 2 2.5s2-1 2-2.5c0-2-1.5-3-2-5z"
                      fill="#F59E0B"
                    />
                    <rect x="10" y="9" width="4" height="12" rx="1" fill="#FEF3C7" />
                  </svg>
                  Zapalite svecu ili polozite cvece
                </button>
              )}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8 mt-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
            Posvete i secanja
          </h3>

          {/* Comment List */}
          <CommentList comments={comments} loading={commentsLoading} />

          {/* Comment Form */}
          {memorial.is_active && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              {showCommentForm ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Ostavite posvetu
                    </h4>
                    <button
                      onClick={() => setShowCommentForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
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
                  className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors border border-stone-200"
                >
                  <svg
                    className="w-5 h-5 inline-block mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Ostavite posvetu ili secanje
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
