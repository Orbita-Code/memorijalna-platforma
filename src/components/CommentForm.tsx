import { useState, FormEvent, ChangeEvent } from 'react'
import { createComment } from '../lib/comments'
import { checkContent } from '../lib/moderation'

interface CommentFormProps {
  memorialId: string
  onSubmitSuccess?: () => void
}

const MAX_CHARS = 1000

export default function CommentForm({
  memorialId,
  onSubmitSuccess,
}: CommentFormProps) {
  const [authorName, setAuthorName] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')
  const [content, setContent] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [moderationWarning, setModerationWarning] = useState<string | null>(null)

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    if (newContent.length <= MAX_CHARS) {
      setContent(newContent)
      // Clear warning when user edits
      if (moderationWarning) {
        setModerationWarning(null)
      }
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setModerationWarning(null)

    // Validate
    if (!isAnonymous && !authorName.trim()) {
      setError('Unesite vase ime ili izaberite anonimno')
      return
    }

    if (!content.trim()) {
      setError('Unesite tekst komentara')
      return
    }

    // Check content moderation
    const moderation = checkContent(content)
    if (moderation.autoReject) {
      setError(moderation.issues.join('. '))
      return
    }

    if (!moderation.isClean) {
      // Warning but allow submission
      setModerationWarning(moderation.issues.join('. '))
    }

    setIsSubmitting(true)

    const displayName = isAnonymous ? 'Anonimno' : authorName.trim()

    const { error: submitError } = await createComment({
      memorial_id: memorialId,
      author_name: displayName,
      author_email: authorEmail.trim() || undefined,
      content: content.trim(),
      is_anonymous: isAnonymous,
    })

    setIsSubmitting(false)

    if (submitError) {
      setError('Doslo je do greske. Pokusajte ponovo.')
      return
    }

    setSuccess(true)
    setAuthorName('')
    setAuthorEmail('')
    setContent('')
    setIsAnonymous(false)

    if (onSubmitSuccess) {
      onSubmitSuccess()
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <svg
          className="w-12 h-12 text-green-500 mx-auto mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-green-800 mb-1">
          Hvala na posveti
        </h3>
        <p className="text-green-600 text-sm">
          Vas komentar je poslat na odobrenje i bice objavljen nakon pregleda
          porodice.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-sm text-green-700 underline hover:no-underline"
        >
          Ostavite jos jednu posvetu
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Vase ime
          </label>
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="mr-2 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
            />
            Anonimno
          </label>
        </div>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          disabled={isAnonymous}
          placeholder={isAnonymous ? 'Anonimno' : 'Unesite vase ime'}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 disabled:bg-gray-100 disabled:text-gray-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email (opciono)
        </label>
        <input
          type="email"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          placeholder="Za obavestenje kada komentar bude odobren"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Vasa posveta
          </label>
          <span className="text-xs text-gray-500">
            {content.length}/{MAX_CHARS}
          </span>
        </div>
        <textarea
          value={content}
          onChange={handleContentChange}
          rows={4}
          placeholder="Podelite secanje, poruku ili posvetite par reci..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 resize-none"
        />
      </div>

      {moderationWarning && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <p className="text-sm text-yellow-800">
            <strong>Napomena:</strong> {moderationWarning}
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Slanje...' : 'Posalji posvetu'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Komentari se objavljuju nakon odobrenja od strane porodice.
      </p>
    </form>
  )
}
