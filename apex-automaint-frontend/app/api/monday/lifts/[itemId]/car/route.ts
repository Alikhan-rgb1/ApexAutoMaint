import { NextRequest, NextResponse } from 'next/server';

import { getAuthHeader, getBackendUrl } from '../../../../_backend';

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ itemId: string }> },
) {
  try {
    const backendUrl = getBackendUrl();
    const authorization = getAuthHeader(req);
    const { itemId } = await context.params;
    const body = await req.text();

    const res = await fetch(
      `${backendUrl}/monday/lifts/${encodeURIComponent(itemId)}/car`,
      {
        method: 'PUT',
        headers: { authorization, 'Content-Type': 'application/json' },
        body,
        cache: 'no-store',
      },
    );

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('content-type') ?? 'application/json',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Backend unavailable' }, { status: 502 });
  }
}
