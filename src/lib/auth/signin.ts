import { supabaseClient } from '../supabase/client';

export async function signInWithLinkedIn() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: process.env.OAUTH_CALLBACK_URL,
        queryParams: {
          next: 'http://localhost:3000/p'
        }
      }
    })

    console.log('--->', { data, error });
  }