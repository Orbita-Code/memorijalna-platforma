import { useState, useRef } from 'react'
import type { ChangeEvent } from 'react'
import { uploadFile, validateFile } from '../lib/storage'

interface ProfileImageUploadProps {
  currentUrl?: string | null
  memorialId: string
  onUpload: (url: string) => void
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-20 h-20',
  md: 'w-32 h-32',
  lg: 'w-40 h-40',
}

export default function ProfileImageUpload({
  currentUrl,
  memorialId,
  onUpload,
  size = 'lg',
}: ProfileImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const displayUrl = previewUrl || currentUrl

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    // Validate file
    const validation = validateFile(file)
    if (!validation.valid) {
      setError(validation.error || 'Nevazeci fajl')
      return
    }

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      setError('Molimo izaberite sliku')
      return
    }

    setError(null)

    // Create preview
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    // Upload file
    setIsUploading(true)
    const { url, error: uploadError } = await uploadFile(memorialId, file)
    setIsUploading(false)

    if (uploadError) {
      setError(uploadError.message)
      URL.revokeObjectURL(objectUrl)
      setPreviewUrl(null)
      return
    }

    if (url) {
      onUpload(url)
      // Clean up preview, the actual URL is now in use
      URL.revokeObjectURL(objectUrl)
      setPreviewUrl(null)
    }
  }

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isUploading}
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
      >
        {displayUrl ? (
          <img
            src={displayUrl}
            alt="Profilna slika"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-1/2 h-1/2 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
          <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center px-2">
            {isUploading ? 'Otpremanje...' : 'Promeni sliku'}
          </span>
        </div>

        {/* Upload progress indicator */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <svg
              className="animate-spin w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-red-600 text-center max-w-xs">{error}</p>
      )}
    </div>
  )
}
