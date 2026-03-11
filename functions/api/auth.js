const CREDENTIALS = { username: 'admin', password: 'admin123' };

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function makeToken(username) {
  // Simple base64 token with timestamp (not JWT, but sufficient for admin dashboard)
  const payload = JSON.stringify({ user: username, exp: Date.now() + 86400000 }); // 24h
  return btoa(payload);
}

export function verifyToken(token) {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.user === CREDENTIALS.username && payload.exp > Date.now()) {
      return true;
    }
  } catch {}
  return false;
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { username, password } = body;

    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      const token = makeToken(username);
      return new Response(JSON.stringify({ success: true, token }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      });
    }

    return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), {
      status: 401,
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
