import { supabaseClient } from '../supabase/client';

export async function signInWithLinkedIn() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
            scopes: 'openid profile email r_organization_social r_basicprofile w_member_social w_organization_social',
            redirectTo: process.env.OAUTH_CALLBACK_URL,
            queryParams: {
                next: 'http://localhost:3000/p'
            }
        }
    });

    console.log('---> signin', { data, error });
}
