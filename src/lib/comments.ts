import { supabase } from './supabase'
import type { Comment, CreateCommentInput, CommentStatus } from '../types/comment'

export async function createComment(
  input: CreateCommentInput
): Promise<{ data: Comment | null; error: Error | null }> {
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
