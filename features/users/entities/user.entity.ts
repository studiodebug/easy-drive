/**
 * User Entities (DB types)
 *
 * These types represent the exact shape of the Supabase `public.users` table.
 * Never expose these directly outside the server/data layer—use DTOs instead.
 */

import type { Tables, TablesInsert, TablesUpdate } from "@/types/supabase";

export type UserEntity = Tables<"users">;
export type UserInsertEntity = TablesInsert<"users">;
export type UserUpdateEntity = TablesUpdate<"users">;


