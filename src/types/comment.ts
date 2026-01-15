export type CommentStatus = 'pending' | 'approved' | 'rejected'

export interface Comment {
  id: string
  created_at: string
  updated_at: string
  memorial_id: string
  author_name: string
  author_email?: string | null
  content: string
  status: CommentStatus
  moderation_note?: string | null
  is_anonymous: boolean
}

export interface CreateCommentInput {
  memorial_id: string
  author_name: string
  author_email?: string
  content: string
  is_anonymous?: boolean
}
