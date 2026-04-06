import { NextRequest } from 'next/server';

export function getBackendUrl() {
  const backendUrlRaw =
    process.env.BACKEND_URL ??
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:3001';
  return backendUrlRaw.replace(/\/+$/, '');
}

export function getAuthHeader(req: NextRequest) {
  return req.headers.get('authorization') ?? '';
}

