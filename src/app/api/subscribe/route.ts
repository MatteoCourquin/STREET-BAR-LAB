// Forwards newsletter sign-ups to NEWSLETTER_WEBHOOK_URL (Brevo, Mailchimp, Zapier...).
// Without it, returns 503 so the form tells visitors the newsletter isn't live yet.

export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({ email: null }));
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) {
    return Response.json({ error: "Newsletter not configured" }, { status: 503 });
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.ok ? Response.json({ ok: true }) : Response.json({ error: "Upstream error" }, { status: 502 });
}
