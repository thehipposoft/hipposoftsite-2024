import { NextResponse } from 'next/server';

// Server-side proxy for the brand discovery form (/[locale]/branding).
// Keeps the WordPress application password out of the client bundle.

const MAX_BODY_BYTES = 100_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
    // brand_discovery CPT (see wordpress/hippo-brand-discovery.php), not the project survey.
    const endpoint = process.env.WP_BRANDING_ENDPOINT;
    const user = process.env.WP_APP_USER;
    const pass = process.env.WP_APP_PASS;

    if (!endpoint || !user || !pass) {
        console.error('[api/branding] Missing WP_BRANDING_ENDPOINT / WP_APP_USER / WP_APP_PASS');
        return NextResponse.json({ success: false, message: 'Server not configured' }, { status: 500 });
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
        return NextResponse.json({ success: false, message: 'Payload too large' }, { status: 413 });
    }

    let body: Record<string, unknown>;
    try {
        body = JSON.parse(raw);
    } catch {
        return NextResponse.json({ success: false, message: 'Invalid JSON' }, { status: 400 });
    }

    const contact = (body.contact ?? {}) as Record<string, unknown>;
    const fullName = typeof contact.full_name === 'string' ? contact.full_name.trim() : '';
    const email = typeof contact.email === 'string' ? contact.email.trim() : '';

    if (body.form !== 'branding_discovery' || !fullName || !EMAIL_RE.test(email)) {
        return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64'),
            },
            body: raw,
            cache: 'no-store',
        });

        const json = await res.json().catch(() => ({}));
        if (res.ok && json.success) {
            return NextResponse.json({ success: true });
        }
        console.error('[api/branding] WP rejected submission', res.status, json?.message);
        return NextResponse.json({ success: false, message: 'Upstream error' }, { status: 502 });
    } catch (err) {
        console.error('[api/branding] WP request failed', err);
        return NextResponse.json({ success: false, message: 'Upstream unreachable' }, { status: 502 });
    }
}
