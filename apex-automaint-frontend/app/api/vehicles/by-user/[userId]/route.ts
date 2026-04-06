import { NextRequest, NextResponse } from 'next/server';

import { getAuthHeader, getBackendUrl } from '../../../_backend';

export async function GET(req: NextRequest, ctx: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await ctx.params;
    const backendUrl = getBackendUrl();
    const authorization = getAuthHeader(req);
    const url = new URL(req.url);
    const onlyWithoutOrders = url.searchParams.get('onlyWithoutOrders');
    const qs = onlyWithoutOrders ? `?onlyWithoutOrders=${encodeURIComponent(onlyWithoutOrders)}` : '';

    const res = await fetch(`${backendUrl}/vehicles/by-user/${userId}${qs}`, {
      method: 'GET',
      headers: { authorization },
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

