import { NextRequest, NextResponse } from 'next/server';

import { getAuthHeader, getBackendUrl } from '../_backend';

export async function POST(req: NextRequest) {
  try {
    const backendUrl = getBackendUrl();
    const authorization = getAuthHeader(req);
    const body = await req.text();

    const res = await fetch(`${backendUrl}/notifications`, {
      method: 'POST',
      headers: { authorization, 'Content-Type': 'application/json' },
      body,
      cache: 'no-store',
    });

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { 'Content-Type': res.headers.get('content-type') ?? 'application/json' },
    });
  } catch {
    return NextResponse.json({ error: 'Backend unavailable' }, { status: 502 });
  }
}

