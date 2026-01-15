import { supabase } from './supabase'
import type { MediaType } from '../types/media'
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  ALLOWED_DOCUMENT_TYPES,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
  MAX_DOCUMENT_SIZE,
} from '../types/media'

const BUCKET_NAME = 'memorial-media'

export function getMediaType(mimeType: string): MediaType | null {
  if (ALLOWED_IMAGE_TYPES.includes(mimeType)) return 'image'
  if (ALLOWED_VIDEO_TYPES.includes(mimeType)) return 'video'
  if (ALLOWED_DOCUMENT_TYPES.includes(mimeType)) return 'document'
  return null
}

export function validateFile(file: File): { valid: boolean; error?: string } {
  const mediaType = getMediaType(file.type)
  if (!mediaType) {
    return { valid: false, error: 'Nepodržan tip fajla' }
  }

  const maxSize =
    mediaType === 'image'
      ? MAX_IMAGE_SIZE
      : mediaType === 'video'
        ? MAX_VIDEO_SIZE
        : MAX_DOCUMENT_SIZE

  if (file.size > maxSize) {
    const maxMB = maxSize / (1024 * 1024)
    return { valid: false, error: `Fajl je prevelik. Maksimalna velicina je ${maxMB}MB` }
  }

  return { valid: true }
}

export async function uploadFile(
  memorialId: string,
  file: File
): Promise<{ url: string | null; error: Error | null }> {
  const validation = validateFile(file)
  if (!validation.valid) {
    return { url: null, error: new Error(validation.error) }
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${memorialId}/${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file)

  if (error) {
    return { url: null, error }
  }

  const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path)

  return { url: urlData.publicUrl, error: null }
}

export async function deleteFile(path: string): Promise<{ error: Error | null }> {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path])

  return { error }
}
