// This file will be updated with Supabase CLI generated types
// For now, we define the expected structure manually

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      memorials: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          first_name: string
          last_name: string
          date_of_birth: string
          date_of_death: string
          place_of_birth: string
          place_of_death: string
          father_name: string | null
          mother_name: string | null
          biography: string | null
          profile_image_url: string | null
          cover_image_url: string | null
          is_draft: boolean
          is_active: boolean
        }
        Insert: Omit<Database['public']['Tables']['memorials']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['memorials']['Insert']>
      }
      media: {
        Row: {
          id: string
          created_at: string
          memorial_id: string
          user_id: string
          type: 'image' | 'video' | 'document'
          url: string
          filename: string
          size: number
          mime_type: string
          caption: string | null
          order: number
        }
        Insert: Omit<Database['public']['Tables']['media']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['media']['Insert']>
      }
    }
  }
}
