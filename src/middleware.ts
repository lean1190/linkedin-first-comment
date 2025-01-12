import type { NextRequest } from 'next/server';

import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ['/p'],
  missing: [
    { type: 'header', key: 'next-router-prefetch' },
    { type: 'header', key: 'purpose', value: 'prefetch' }
  ]
};
