export type MediaType = 'image' | 'video' | 'document'

export interface MediaItem {
  id: string
  created_at: string
  memorial_id: string
  type: MediaType
  url: string
  caption: string | null
  display_order: number // for sorting in gallery
}

export interface UploadMediaInput {
  memorial_id: string
  file: File
  caption?: string
}

export interface MediaUploadProgress {
  loaded: number
  total: number
  percentage: number
}

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf']

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024 // 100MB
export const MAX_DOCUMENT_SIZE = 20 * 1024 * 1024 // 20MB
