import type { MediaItem } from '../types/media'

interface DocumentListProps {
  documents: MediaItem[]
  canEdit?: boolean
  onDelete?: (mediaId: string) => void
}

export default function DocumentList({ documents, canEdit = false, onDelete }: DocumentListProps) {
  const handleDelete = (e: React.MouseEvent, mediaId: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (onDelete) {
      onDelete(mediaId)
    }
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-8">
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-500">Nema dokumenata</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <a
          key={doc.id}
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
        >
          {/* PDF Icon */}
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-4.12 7.53L8 15.75V18H6.5v-5h2.17c1.08 0 1.83.7 1.83 1.74 0 .76-.41 1.36-1.02 1.62l1.12 1.65V18h-1.67l-.95-1.47H8v1.47zm-.68-2.41h.5c.39 0 .62-.26.62-.62 0-.37-.23-.62-.62-.62H8v1.24zm5.05-1.12c1.36 0 2.25.99 2.25 2.5s-.89 2.5-2.25 2.5H11v-5h2.25zm0 3.69c.69 0 1.13-.47 1.13-1.19 0-.71-.44-1.19-1.13-1.19h-.75v2.38h.75zm5.75-3.69v1.14h-1.63v.87h1.5v1.14h-1.5v1.85H15.5v-5h3z" />
            </svg>
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <p className="text-gray-800 font-medium truncate">
              {doc.caption || 'Dokument'}
            </p>
            <p className="text-gray-500 text-sm">
              PDF
            </p>
          </div>

          {/* Download/Open indicator */}
          <div className="flex-shrink-0 flex items-center gap-2">
            {canEdit && onDelete && (
              <button
                onClick={(e) => handleDelete(e, doc.id)}
                className="p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                title="Obrisi"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>
            )}
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </a>
      ))}
    </div>
  )
}
