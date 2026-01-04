/**
 * Instructor Entities (DB types)
 *
 * These types represent the exact shape of the Supabase `public.instructors` table.
 * Never expose these directly outside the server/data layer—use DTOs instead.
 */

import type { Tables, TablesInsert, TablesUpdate } from "@/types/supabase";

export type InstructorEntity = Tables<"instructors">;
export type InstructorInsertEntity = TablesInsert<"instructors">;
export type InstructorUpdateEntity = TablesUpdate<"instructors">;


