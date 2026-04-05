import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:3001';
    const authorization = req.headers.get('authorization') ?? '';

    const res = await fetch(`${backendUrl}/auth/me`, {
      method: 'GET',
      headers: {
        authorization,
      },
      cache: 'no-store',
    });

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { 'Content-Type': res.headers.get('content-type') ?? 'application/json' },
    });
  } catch {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}

