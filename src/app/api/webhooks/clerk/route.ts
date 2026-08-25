import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createOrUpdateUserFromGoogle } from '@/lib/user-identity';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.warn('[Clerk Webhook] CLERK_WEBHOOK_SECRET missing, processing in unverified dev mode');
  }

  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  const body = await req.text();

  let evt: WebhookEvent;

  if (WEBHOOK_SECRET) {
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
    }

    const wh = new Webhook(WEBHOOK_SECRET);
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('[Clerk Webhook] Error verifying webhook signature:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } else {
    try {
      evt = JSON.parse(body);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }
  }

  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = evt.data;

    const primaryEmail = email_addresses && email_addresses.length > 0
      ? email_addresses[0].email_address
      : '';
    const fullName = [first_name, last_name].filter(Boolean).join(' ');

    const firestoreUser = await createOrUpdateUserFromGoogle({
      clerkId: id,
      email: primaryEmail,
      fullName,
    });

    console.log(`[Clerk Webhook] Synced Clerk user ${id} to Firestore user ${firestoreUser.id}`);
    return NextResponse.json({ success: true, userId: firestoreUser.id });
  }

  return NextResponse.json({ success: true, message: `Ignored event ${eventType}` });
}
