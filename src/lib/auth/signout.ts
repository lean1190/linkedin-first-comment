import { supabaseClient } from '../supabase/client';

export async function signOut() {
    const { error } = await supabaseClient.auth.signOut();
    console.log('--> error', error);
  }