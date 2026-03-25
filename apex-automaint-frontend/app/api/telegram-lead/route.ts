import { NextRequest, NextResponse } from 'next/server';

type LeadPayload = {
  source: 'booking' | 'contact' | 'quote';
  name?: string;
  phone?: string;
  date?: string;
  service?: string;
  message?: string;
  language?: string;
};

export async function POST(req: NextRequest) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return NextResponse.json({ error: 'Missing Telegram configuration' }, { status: 500 });
    }

    const body = (await req.json()) as LeadPayload;
    const lines: string[] = [];
    lines.push('🔔 New Lead');
    if (body.source) lines.push(`Source: ${body.source}`);
    if (body.language) lines.push(`Lang: ${body.language}`);
    if (body.name) lines.push(`Name: ${body.name}`);
    if (body.phone) lines.push(`Phone: ${body.phone}`);
    if (body.date) lines.push(`Date: ${body.date}`);
    if (body.service) lines.push(`Service: ${body.service}`);
    if (body.message) lines.push(`Message: ${body.message}`);
    const text = lines.join('\n');

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      cache: 'no-store',
    });

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      return NextResponse.json({ error: 'Failed to send to Telegram', details: errText }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
