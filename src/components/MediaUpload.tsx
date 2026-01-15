import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { validateFile, getMediaType } from '../lib/storage'
import { addMedia } from '../lib/media'
import { useAuth } from '../contexts/AuthContext'

interface FileWithPreview {
  file: File
  preview: string
  caption: string
  error?: string
}

interface MediaUploadProps {
  memorialId: string
  onUploadComplete: () => void
}

export default function MediaUpload({ memorialId, onUploadComplete }: MediaUploadProps) {
  const { user } = useAuth()
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: FileWithPreview[] = []

    Array.from(selectedFiles).forEach((file) => {
      const validation = validateFile(file)
      const mediaType = getMediaType(file.type)

      if (!validation.valid) {
        newFiles.push({
          file,
          preview: '',
          caption: '',
          error: validation.error,
        })
        return
      }

      // Create preview for images
      let preview = ''
      if (mediaType === 'image') {
        preview = URL.createObjectURL(file)
      }

      newFiles.push({
        file,
        preview,
        caption: '',
      })
    })

    setFiles((prev) => [...prev, ...newFiles])
    setError(null)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    // Reset input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCaptionChange = (index: number, caption: string) => {
    setFiles((prev) =>
      prev.map((f, i) => (i === index ? { ...f, caption } : f))
    )
  }

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => {
      const file = prev[index]
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleUpload = async () => {
    if (!user) {
      setError('Morate biti prijavljeni da biste dodali fotografije.')
      return
    }

    const validFiles = files.filter((f) => !f.error)
    if (validFiles.length === 0) {
      setError('Nema validnih fajlova za upload.')
      return
    }

    setUploading(true)
    setError(null)

    let completed = 0
    const errors: string[] = []

    for (const fileWithPreview of validFiles) {
      const { error: uploadError } = await addMedia(
        {
          memorial_id: memorialId,
          file: fileWithPreview.file,
          caption: fileWithPreview.caption || undefined,
        },
        user.id
      )

      if (uploadError) {
        errors.push(`${fileWithPreview.file.name}: ${uploadError.message}`)
      }

      completed++
      setUploadProgress(Math.round((completed / validFiles.length) * 100))
    }

    // Cleanup previews
    files.forEach((f) => {
      if (f.preview) {
        URL.revokeObjectURL(f.preview)
      }
    })

    setFiles([])
    setUploading(false)
    setUploadProgress(0)

    if (errors.length > 0) {
      setError(errors.join('\n'))
    }

    onUploadComplete()
  }

  const getFileIcon = (file: File) => {
    const mediaType = getMediaType(file.type)
    if (mediaType === 'video') {
      return (
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
        </svg>
      )
    }
    if (mediaType === 'document') {
      return (
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      )
    }
    return (
      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </svg>
    )
  }

  const validFilesCount = files.filter((f) => !f.error).length

  return (
    <div className="space-y-4">
      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-gray-600 bg-gray-100'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <svg
          className="w-12 h-12 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-gray-600 mb-2">
          Prevucite fajlove ovde ili
        </p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Izaberite fajlove
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
        <p className="text-xs text-gray-500 mt-2">
          Slike (do 10MB), video (do 100MB), PDF (do 20MB)
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600 whitespace-pre-wrap">{error}</p>
        </div>
      )}

      {/* File Previews */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">
            Izabrani fajlovi ({validFilesCount})
          </h4>
          {files.map((fileWithPreview, index) => (
            <div
              key={`${fileWithPreview.file.name}-${index}`}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                fileWithPreview.error
                  ? 'border-red-200 bg-red-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {/* Preview/Icon */}
              <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden bg-gray-200 flex items-center justify-center">
                {fileWithPreview.preview ? (
                  <img
                    src={fileWithPreview.preview}
                    alt={fileWithPreview.file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getFileIcon(fileWithPreview.file)
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {fileWithPreview.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(fileWithPreview.file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                {fileWithPreview.error ? (
                  <p className="text-xs text-red-600 mt-1">
                    {fileWithPreview.error}
                  </p>
                ) : (
                  <input
                    type="text"
                    placeholder="Dodajte opis (opciono)"
                    value={fileWithPreview.caption}
                    onChange={(e) => handleCaptionChange(index, e.target.value)}
                    className="mt-2 w-full text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                )}
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500"
                title="Ukloni"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Otpremanje...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gray-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Upload Button */}
      {files.length > 0 && validFilesCount > 0 && !uploading && (
        <button
          type="button"
          onClick={handleUpload}
          className="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          Otpremi {validFilesCount} {validFilesCount === 1 ? 'fajl' : 'fajlova'}
        </button>
      )}
    </div>
  )
}
