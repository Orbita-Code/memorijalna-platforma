import { supabase } from './supabase'
import type { MediaItem, UploadMediaInput } from '../types/media'
import { uploadFile, getMediaType } from './storage'

export async function addMedia(
  input: UploadMediaInput,
  userId: string
): Promise<{ data: MediaItem | null; error: Error | null }> {
  // Upload file first
  const { url, error: uploadError } = await uploadFile(input.memorial_id, input.file)
  if (uploadError || !url) {
    return { data: null, error: uploadError }
  }

  // Get max order for this memorial
  const { data: existing } = await supabase
    .from('media')
    .select('order')
    .eq('memorial_id', input.memorial_id)
    .order('order', { ascending: false })
    .limit(1)

  const nextOrder = existing && existing.length > 0 ? existing[0].order + 1 : 0

  // Insert media record
  const { data, error } = await supabase
    .from('media')
    .insert({
      memorial_id: input.memorial_id,
      user_id: userId,
      type: getMediaType(input.file.type)!,
      url,
      filename: input.file.name,
      size: input.file.size,
      mime_type: input.file.type,
      caption: input.caption || null,
      order: nextOrder,
    })
    .select()
    .single()

  return { data, error }
}

export async function getMemorialMedia(
  memorialId: string
): Promise<{ data: MediaItem[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('memorial_id', memorialId)
    .order('order', { ascending: true })

  return { data, error }
}

export async function deleteMedia(mediaId: string): Promise<{ error: Error | null }> {
  const { error } = await supabase.from('media').delete().eq('id', mediaId)

  return { error }
}

export async function updateMediaCaption(
  mediaId: string,
  caption: string
): Promise<{ error: Error | null }> {
  const { error } = await supabase.from('media').update({ caption }).eq('id', mediaId)

  return { error }
}
