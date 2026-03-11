function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// POST /api/track - record a page visit
export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { site, page, referrer, ua } = body;
    const today = new Date().toISOString().split('T')[0];

    // Get existing analytics
    const raw = await context.env.DATA.get('analytics');
    const analytics = raw ? JSON.parse(raw) : { visits: [], daily: {} };

    // Record visit
    analytics.visits.push({
      site: site || 'seekerlab.in',
      page: page || '/',
      referrer: referrer || '',
      ua: ua || '',
      time: Date.now(),
      date: today,
    });

    // Keep only last 1000 visits
    if (analytics.visits.length > 1000) {
      analytics.visits = analytics.visits.slice(-1000);
    }

    // Update daily counter
    const key = `${today}_${site || 'seekerlab.in'}`;
    analytics.daily[key] = (analytics.daily[key] || 0) + 1;

    await context.env.DATA.put('analytics', JSON.stringify(analytics));

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  }
}

// GET /api/track - get analytics (auth required)
export async function onRequestGet(context) {
  const auth = context.request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  try {
    const payload = JSON.parse(atob(token));
    if (payload.user !== 'admin' || payload.exp <= Date.now()) throw new Error();
  } catch {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  }

  try {
    const raw = await context.env.DATA.get('analytics');
    const analytics = raw ? JSON.parse(raw) : { visits: [], daily: {} };
    return new Response(JSON.stringify(analytics), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders() });
}
