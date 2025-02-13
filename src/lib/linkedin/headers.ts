export function linkedInHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: '*/*',
    'User-Agent': 'First-Comment/1.0',
    'Content-Type': 'application/json',
    'LinkedIn-Version': '202411',
    'X-Restli-Protocol-Version': '2.0.0',
    'Access-Control-Allow-Origin': '*'
  };
}
