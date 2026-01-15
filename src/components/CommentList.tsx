import type { Comment } from '../types/comment'

interface CommentListProps {
  comments: Comment[]
  loading: boolean
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'upravo sada'
  if (diffMins < 60) return `pre ${diffMins} min`
  if (diffHours < 24) return `pre ${diffHours} ${diffHours === 1 ? 'sat' : diffHours < 5 ? 'sata' : 'sati'}`
  if (diffDays === 1) return 'juce'
  if (diffDays < 7) return `pre ${diffDays} dana`
  if (diffDays < 30) return `pre ${Math.floor(diffDays / 7)} nedelje`
  return date.toLocaleDateString('sr-Latn-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getInitials(name: string): string {
  if (name === 'Anonimno') return '?'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

export default function CommentList({ comments, loading }: CommentListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 text-gray-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <p className="text-gray-500">Budite prvi koji ce ostaviti posvetu</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-stone-50 rounded-lg p-4 sm:p-5"
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center">
              <span className="text-stone-600 text-sm font-medium">
                {getInitials(comment.author_name)}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-gray-800">
                  {comment.is_anonymous ? 'Anonimno' : comment.author_name}
                </span>
                <span className="text-xs text-gray-400">
                  {formatRelativeTime(comment.created_at)}
                </span>
              </div>
              <p className="mt-1 text-gray-700 font-serif leading-relaxed whitespace-pre-line">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
