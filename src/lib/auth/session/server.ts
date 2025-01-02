'use server';

import { createClient } from '../../supabase/server';

export async function getServerSession() {
    return (await (await createClient()).auth.getSession()).data.session;
}

export async function getServerUser() {
    return (await (await createClient()).auth.getUser()).data.user;
}
