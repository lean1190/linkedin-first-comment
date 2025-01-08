export const linkedInHeaders = (token: string) => ({
    Authorization: `Bearer ${token}`,
    Accept: '*/*',
    'Content-Type': 'application/json',
    'LinkedIn-Version': '202411',
    'X-Restli-Protocol-Version': '2.0.0',
    'Access-Control-Allow-Origin': '*'
});
