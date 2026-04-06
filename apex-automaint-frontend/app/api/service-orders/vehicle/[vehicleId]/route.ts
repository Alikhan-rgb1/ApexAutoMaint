import { NextRequest, NextResponse } from 'next/server';

import { getAuthHeader, getBackendUrl } from '../../../_backend';

export async function GET(req: NextRequest, ctx: { params: Promise<{ vehicleId: string }> }) {
  try {
    const { vehicleId } = await ctx.params;
    const backendUrl = getBackendUrl();
    const authorization = getAuthHeader(req);

    const res = await fetch(`${backendUrl}/service-orders/vehicle/${vehicleId}`, {
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

