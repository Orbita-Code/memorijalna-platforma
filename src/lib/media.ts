import { supabase } from './supabase'
import type { MediaItem, UploadMediaInput } from '../types/media'
import { uploadFile, getMediaType } from './storage'

export async function addMedia(
  input: UploadMediaInput
): Promise<{ data: MediaItem | null; error: Error | null }> {
  // Upload file first
  const { url, error: uploadError } = await uploadFile(input.memorial_id, input.file)
  if (uploadError || !url) {
    return { data: null, error: uploadError }
  }

  // Get max display_order for this memorial
  const { data: existing } = await supabase
    .from('media')
    .select('display_order')
    .eq('memorial_id', input.memorial_id)
    .order('display_order', { ascending: false })
    .limit(1)

  const nextOrder = existing && existing.length > 0 ? (existing[0].display_order || 0) + 1 : 0

  // Insert media record
  const { data, error } = await supabase
    .from('media')
    .insert({
      memorial_id: input.memorial_id,
      type: getMediaType(input.file.type)!,
      url,
      caption: input.caption || null,
      display_order: nextOrder,
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
    .order('display_order', { ascending: true })

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
