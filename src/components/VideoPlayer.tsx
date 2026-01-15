import { useState } from 'react'
import type { MediaItem } from '../types/media'

interface VideoPlayerProps {
  video: MediaItem
  canEdit?: boolean
  onDelete?: (mediaId: string) => void
}

export default function VideoPlayer({ video, canEdit = false, onDelete }: VideoPlayerProps) {
  const [hasError, setHasError] = useState(false)

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDelete) {
      onDelete(video.id)
    }
  }

  if (hasError) {
    return (
      <div className="relative bg-gray-100 rounded-lg p-8 text-center">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <p className="text-gray-500">Video nije moguce ucitati</p>
        {video.filename && (
          <p className="text-gray-400 text-sm mt-1">{video.filename}</p>
        )}
      </div>
    )
  }

  return (
    <div className="relative group">
      <video
        controls
        className="w-full max-w-full rounded-lg bg-black"
        preload="metadata"
        onError={() => setHasError(true)}
      >
        <source src={video.url} type={video.mime_type} />
        Vas pregledac ne podrzava video.
      </video>

      {/* Delete button */}
      {canEdit && onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
          title="Obrisi"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
      )}

      {/* Caption */}
      {video.caption && (
        <p className="mt-2 text-gray-600 text-sm">{video.caption}</p>
      )}
    </div>
  )
}
