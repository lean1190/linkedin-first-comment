'use client';

import { supabaseClient } from '../../supabase/client';

export async function getClientSession() {
    return (await supabaseClient.auth.getSession()).data?.session;
}

export async function getClientUser() {
    return (await supabaseClient.auth.getUser()).data?.user;
}
