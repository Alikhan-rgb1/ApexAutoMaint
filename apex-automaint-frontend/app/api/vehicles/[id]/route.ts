import { NextRequest, NextResponse } from 'next/server';

import { getAuthHeader, getBackendUrl } from '../../_backend';

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const backendUrl = getBackendUrl();
    const authorization = getAuthHeader(req);

    const res = await fetch(`${backendUrl}/vehicles/${id}`, {
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

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const backendUrl = getBackendUrl();
    const authorization = getAuthHeader(req);
    const body = await req.text();

    const res = await fetch(`${backendUrl}/vehicles/${id}`, {
      method: 'PUT',
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

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const backendUrl = getBackendUrl();
    const authorization = getAuthHeader(req);

    const res = await fetch(`${backendUrl}/vehicles/${id}`, {
      method: 'DELETE',
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
