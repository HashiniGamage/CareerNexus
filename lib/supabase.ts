import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createClient = () => createClientComponentClient()

export const createServerClient = () => createServerComponentClient({ cookies })

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ai_models: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          model_type: string
          parameters: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string
          model_type?: string
          parameters?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string
          model_type?: string
          parameters?: any
          created_at?: string
          updated_at?: string
        }
      }
      ai_conversations: {
        Row: {
          id: string
          user_id: string
          model_id: string | null
          title: string
          messages: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          model_id?: string | null
          title?: string
          messages?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          model_id?: string | null
          title?: string
          messages?: any
          created_at?: string
          updated_at?: string
        }
      }
      ai_predictions: {
        Row: {
          id: string
          user_id: string
          model_id: string | null
          input_data: any
          prediction_result: any
          confidence_score: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          model_id?: string | null
          input_data: any
          prediction_result: any
          confidence_score?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          model_id?: string | null
          input_data?: any
          prediction_result?: any
          confidence_score?: number
          created_at?: string
        }
      }
    }
  }
}