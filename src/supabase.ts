export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      phrases: {
        Row: {
          id: number;
          inserted_at: string;
          name: string | null;
          phrase: string;
          shortcode: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          id?: number;
          inserted_at?: string;
          name?: string | null;
          phrase: string;
          shortcode: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          id?: number;
          inserted_at?: string;
          name?: string | null;
          phrase?: string;
          shortcode?: string;
          updated_at?: string;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
