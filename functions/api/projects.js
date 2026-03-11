function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function verifyToken(token) {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.user === 'admin' && payload.exp > Date.now()) return true;
  } catch {}
  return false;
}

function getToken(request) {
  const auth = request.headers.get('Authorization') || '';
  return auth.replace('Bearer ', '');
}

// GET /api/projects - public (for website) or authenticated (for dashboard)
export async function onRequestGet(context) {
  try {
    const data = await context.env.DATA.get('projects');
    const projects = data ? JSON.parse(data) : [];
    return new Response(JSON.stringify(projects), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  }
}

// POST /api/projects - add new project (auth required)
export async function onRequestPost(context) {
  const token = getToken(context.request);
  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  }

  try {
    const body = await context.request.json();
    const data = await context.env.DATA.get('projects');
    const projects = data ? JSON.parse(data) : [];

    const newProject = {
      id: String(Date.now()),
      name: body.name || '',
      client: body.client || '',
      status: body.status || 'planning',
      url: body.url || '',
      type: body.type || 'website',
      created: new Date().toISOString().split('T')[0],
    };

    projects.push(newProject);
    await context.env.DATA.put('projects', JSON.stringify(projects));

    return new Response(JSON.stringify(newProject), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  }
}

// PUT /api/projects - update project (auth required)
export async function onRequestPut(context) {
  const token = getToken(context.request);
  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  }

  try {
    const body = await context.request.json();
    const data = await context.env.DATA.get('projects');
    const projects = data ? JSON.parse(data) : [];

    const idx = projects.findIndex(p => p.id === body.id);
    if (idx === -1) {
      return new Response(JSON.stringify({ error: 'Project not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      });
    }

    projects[idx] = { ...projects[idx], ...body };
    await context.env.DATA.put('projects', JSON.stringify(projects));

    return new Response(JSON.stringify(projects[idx]), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  }
}

// DELETE /api/projects - delete project (auth required)
export async function onRequestDelete(context) {
  const token = getToken(context.request);
  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  }

  try {
    const url = new URL(context.request.url);
    const id = url.searchParams.get('id');
    const data = await context.env.DATA.get('projects');
    const projects = data ? JSON.parse(data) : [];

    const filtered = projects.filter(p => p.id !== id);
    await context.env.DATA.put('projects', JSON.stringify(filtered));

    return new Response(JSON.stringify({ success: true }), {
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
