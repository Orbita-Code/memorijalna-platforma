import { useState, useEffect, useCallback } from 'react'
import type { Comment, CommentStatus } from '../types/comment'
import { getCommentsForModeration, updateCommentStatus, deleteComment } from '../lib/comments'

interface ModerationQueueProps {
  memorialId: string
  onUpdate?: () => void
}

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected'

export default function ModerationQueue({
  memorialId,
  onUpdate,
}: ModerationQueueProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterStatus>('pending')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchComments = useCallback(async () => {
    setLoading(true)
    const { data } = await getCommentsForModeration(memorialId)
    if (data) {
      setComments(data)
    }
    setLoading(false)
  }, [memorialId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleStatusChange = async (
    commentId: string,
    status: CommentStatus
  ) => {
    setActionLoading(commentId)
    const { error } = await updateCommentStatus(commentId, status)
    setActionLoading(null)

    if (!error) {
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, status } : c))
      )
      if (onUpdate) onUpdate()
    }
  }

  const handleDelete = async (commentId: string) => {
    if (!confirm('Da li ste sigurni da zelite da obrisete ovaj komentar?')) {
      return
    }

    setActionLoading(commentId)
    const { error } = await deleteComment(commentId)
    setActionLoading(null)

    if (!error) {
      setComments((prev) => prev.filter((c) => c.id !== commentId))
      if (onUpdate) onUpdate()
    }
  }

  const filteredComments = comments.filter((c) => {
    if (filter === 'all') return true
    return c.status === filter
  })

  const pendingCount = comments.filter((c) => c.status === 'pending').length
  const approvedCount = comments.filter((c) => c.status === 'approved').length
  const rejectedCount = comments.filter((c) => c.status === 'rejected').length

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sr-Latn-RS', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-full" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
            filter === 'pending'
              ? 'bg-yellow-100 text-yellow-800 font-medium'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Na cekanju ({pendingCount})
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
            filter === 'approved'
              ? 'bg-green-100 text-green-800 font-medium'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Odobreni ({approvedCount})
        </button>
        <button
          onClick={() => setFilter('rejected')}
          className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
            filter === 'rejected'
              ? 'bg-red-100 text-red-800 font-medium'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Odbijeni ({rejectedCount})
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
            filter === 'all'
              ? 'bg-gray-800 text-white font-medium'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Svi ({comments.length})
        </button>
      </div>

      {/* Comments list */}
      {filteredComments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {filter === 'pending'
            ? 'Nema komentara na cekanju'
            : filter === 'approved'
              ? 'Nema odobrenih komentara'
              : filter === 'rejected'
                ? 'Nema odbijenih komentara'
                : 'Nema komentara'}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`border rounded-lg p-4 ${
                comment.status === 'pending'
                  ? 'border-yellow-200 bg-yellow-50'
                  : comment.status === 'approved'
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-800">
                      {comment.is_anonymous ? 'Anonimno' : comment.author_name}
                    </span>
                    {comment.author_email && (
                      <span className="text-xs text-gray-500">
                        ({comment.author_email})
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm whitespace-pre-line">
                    {comment.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {formatDate(comment.created_at)}
                  </p>
                </div>

                {/* Status badge */}
                <span
                  className={`flex-shrink-0 px-2 py-1 text-xs rounded ${
                    comment.status === 'pending'
                      ? 'bg-yellow-200 text-yellow-800'
                      : comment.status === 'approved'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                  }`}
                >
                  {comment.status === 'pending'
                    ? 'Na cekanju'
                    : comment.status === 'approved'
                      ? 'Odobreno'
                      : 'Odbijeno'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                {comment.status !== 'approved' && (
                  <button
                    onClick={() => handleStatusChange(comment.id, 'approved')}
                    disabled={actionLoading === comment.id}
                    className="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded hover:bg-green-200 disabled:opacity-50 transition-colors"
                  >
                    {actionLoading === comment.id ? '...' : 'Odobri'}
                  </button>
                )}
                {comment.status !== 'rejected' && (
                  <button
                    onClick={() => handleStatusChange(comment.id, 'rejected')}
                    disabled={actionLoading === comment.id}
                    className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 disabled:opacity-50 transition-colors"
                  >
                    {actionLoading === comment.id ? '...' : 'Odbij'}
                  </button>
                )}
                <button
                  onClick={() => handleDelete(comment.id)}
                  disabled={actionLoading === comment.id}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 transition-colors ml-auto"
                >
                  {actionLoading === comment.id ? '...' : 'Obrisi'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
