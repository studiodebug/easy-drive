export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          coordinates: string | null
          country: string
          created_at: string
          id: string
          neighborhood: string | null
          number: string | null
          state: string
          street: string | null
          zipcode: string
        }
        Insert: {
          city: string
          coordinates?: string | null
          country?: string
          created_at?: string
          id?: string
          neighborhood?: string | null
          number?: string | null
          state: string
          street?: string | null
          zipcode: string
        }
        Update: {
          city?: string
          coordinates?: string | null
          country?: string
          created_at?: string
          id?: string
          neighborhood?: string | null
          number?: string | null
          state?: string
          street?: string | null
          zipcode?: string
        }
        Relationships: []
      }
      instructor_profiles: {
        Row: {
          age: number | null
          complement: string | null
          created_at: string
          current_drivers_license_type:
            | Database["public"]["Enums"]["drivers_license_type"]
            | null
          description: string | null
          id: string
          is_professional: boolean | null
          specialty: string | null
          years_of_experience: number | null
        }
        Insert: {
          age?: number | null
          complement?: string | null
          created_at?: string
          current_drivers_license_type?:
            | Database["public"]["Enums"]["drivers_license_type"]
            | null
          description?: string | null
          id?: string
          is_professional?: boolean | null
          specialty?: string | null
          years_of_experience?: number | null
        }
        Update: {
          age?: number | null
          complement?: string | null
          created_at?: string
          current_drivers_license_type?:
            | Database["public"]["Enums"]["drivers_license_type"]
            | null
          description?: string | null
          id?: string
          is_professional?: boolean | null
          specialty?: string | null
          years_of_experience?: number | null
        }
        Relationships: []
      }
      instructors: {
        Row: {
          address_id: string | null
          created_at: string
          drivers_license: string | null
          id: string
          is_active: boolean | null
          profile_id: string | null
          rating: number | null
        }
        Insert: {
          address_id?: string | null
          created_at?: string
          drivers_license?: string | null
          id: string
          is_active?: boolean | null
          profile_id?: string | null
          rating?: number | null
        }
        Update: {
          address_id?: string | null
          created_at?: string
          drivers_license?: string | null
          id?: string
          is_active?: boolean | null
          profile_id?: string | null
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "instructor_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instructor_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["instructor_id"]
          },
          {
            foreignKeyName: "instructor_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "instructor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          address_id: string | null
          created_at: string
          document: string | null
          document_type: Database["public"]["Enums"]["document_type"] | null
          id: string
          instructor_id: string | null
          name: string
          photo_url: string | null
          student_id: string | null
          wallet_id: string | null
        }
        Insert: {
          address_id?: string | null
          created_at?: string
          document?: string | null
          document_type?: Database["public"]["Enums"]["document_type"] | null
          id: string
          instructor_id?: string | null
          name: string
          photo_url?: string | null
          student_id?: string | null
          wallet_id?: string | null
        }
        Update: {
          address_id?: string | null
          created_at?: string
          document?: string | null
          document_type?: Database["public"]["Enums"]["document_type"] | null
          id?: string
          instructor_id?: string | null
          name?: string
          photo_url?: string | null
          student_id?: string | null
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      document_type: "CPF" | "RG" | "CNH"
      drivers_license_type: "A" | "B" | "C" | "D" | "E" | "ACC" | "AB"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_type: ["CPF", "RG", "CNH"],
      drivers_license_type: ["A", "B", "C", "D", "E", "ACC", "AB"],
    },
  },
} as const
