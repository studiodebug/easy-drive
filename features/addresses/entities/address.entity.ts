/**
 * Address Entities (DB types)
 *
 * These types represent the exact shape of the Supabase `public.addresses` table.
 * Never expose these directly outside the server/data layer—use DTOs instead.
 */

import type { Tables, TablesInsert, TablesUpdate } from "@/types/supabase";

export type AddressEntity = Tables<"addresses">;
export type AddressInsertEntity = TablesInsert<"addresses">;
export type AddressUpdateEntity = TablesUpdate<"addresses">;


