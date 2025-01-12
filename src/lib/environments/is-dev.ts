export function isDevEnvironment() {
    return process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production';
}

export function getVercelUrl() {
    return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT || 3000}`;
}
