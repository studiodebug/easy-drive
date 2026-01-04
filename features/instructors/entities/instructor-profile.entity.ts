/**
 * Instructor Profile Entities (DB types)
 *
 * These types represent the exact shape of the Supabase `public.instructor_profiles` table.
 * Never expose these directly outside the server/data layer—use DTOs instead.
 */

import type { Tables, TablesInsert, TablesUpdate } from "@/types/supabase";

export type InstructorProfileEntity = Tables<"instructor_profiles">;
export type InstructorProfileInsertEntity = TablesInsert<"instructor_profiles">;
export type InstructorProfileUpdateEntity = TablesUpdate<"instructor_profiles">;


