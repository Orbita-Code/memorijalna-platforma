import { supabase } from './supabase'
import type { Comment, CreateCommentInput, CommentStatus } from '../types/comment'
import { placeholderComments } from '../data/placeholders'

// Privremeno koristi placeholder podatke dok se ne popuni baza
const USE_PLACEHOLDERS = true

export async function createComment(
  input: CreateCommentInput
): Promise<{ data: Comment | null; error: Error | null }> {
  // Za placeholder mode, simuliraj uspešno kreiranje
  if (USE_PLACEHOLDERS) {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      memorial_id: input.memorial_id,
      author_name: input.author_name,
      author_email: input.author_email || null,
      content: input.content,
      is_anonymous: input.is_anonymous || false,
      status: 'pending',
      moderation_note: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    // U demo modu, automatski odobri komentar za prikaz
    newComment.status = 'approved'
    placeholderComments.push(newComment)
    return { data: newComment, error: null }
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({
      memorial_id: input.memorial_id,
      author_name: input.author_name,
      author_email: input.author_email || null,
      content: input.content,
      is_anonymous: input.is_anonymous || false,
      status: 'pending',
    })
    .select()
    .single()

  return { data, error }
}

export async function getApprovedComments(
  memorialId: string
): Promise<{ data: Comment[] | null; error: Error | null }> {
  if (USE_PLACEHOLDERS) {
    const approved = placeholderComments
      .filter(c => c.memorial_id === memorialId && c.status === 'approved')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    return { data: approved, error: null }
  }

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('memorial_id', memorialId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function getCommentsForModeration(
  memorialId: string
): Promise<{ data: Comment[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('memorial_id', memorialId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function getPendingCommentsCount(
  memorialId: string
): Promise<{ count: number; error: Error | null }> {
  const { count, error } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('memorial_id', memorialId)
    .eq('status', 'pending')

  return { count: count || 0, error }
}

export async function updateCommentStatus(
  commentId: string,
  status: CommentStatus,
  note?: string
): Promise<{ data: Comment | null; error: Error | null }> {
  const updateData: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (note) {
    updateData.moderation_note = note
  }

  const { data, error } = await supabase
    .from('comments')
    .update(updateData)
    .eq('id', commentId)
    .select()
    .single()

  return { data, error }
}

export async function deleteComment(
  commentId: string
): Promise<{ error: Error | null }> {
  const { error } = await supabase.from('comments').delete().eq('id', commentId)

  return { error }
}
