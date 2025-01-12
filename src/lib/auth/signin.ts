import { supabaseClient } from '../supabase/client';

const getURL = () => {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ?? // Site URL in production env
    process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel
    'http://localhost:3000/';

  const startsWithHttp = url.startsWith('http');
  const endsWithSlash = url.endsWith('/');

  return `${startsWithHttp ? url : `https://${url}`}${endsWithSlash ? '' : '/'}`;
};

export async function signInWithLinkedIn() {
  const url = getURL();
  await supabaseClient.auth.signInWithOAuth({
    provider: 'linkedin_oidc',
    options: {
      scopes:
        'openid profile email r_organization_social r_basicprofile w_member_social w_organization_social',
      redirectTo: url,
      queryParams: {
        next: `${url}p`
      }
    }
  });
}
