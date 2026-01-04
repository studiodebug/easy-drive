'use server'

import { createClient } from "@/shared/supabase/server";
import { toUserPublicDTO, toUserPrivateDTO } from "@/shared/dtos/user.dto";
import { revalidatePath } from "next/cache";

export async function getCurrentUserProfile() {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  
  if (!authUser) throw new Error("Not authenticated");
  
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single();
    
  return toUserPrivateDTO(data);
}

export async function updateCurrentUser(updates: any) {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  
  if (!authUser) throw new Error("Not authenticated");
  
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', authUser.id)
    .select()
    .single();
    
  if (error) throw error;
  
  revalidatePath('/profile');
  return toUserPublicDTO(data);
}
