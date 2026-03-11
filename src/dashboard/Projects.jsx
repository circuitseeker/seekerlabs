import { useState } from 'react';

const STATUSES = ['planning', 'in-progress', 'completed', 'live', 'paused'];
const TYPES = ['website', 'web-app', 'mobile-app', 'ai-ml', 'api', 'other'];

export default function Projects({ token, projects, onRefresh }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', client: '', status: 'planning', url: '', type: 'website' });
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    setSaving(true);
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    setForm({ name: '', client: '', status: 'planning', url: '', type: 'website' });
    setAdding(false);
    setSaving(false);
    onRefresh();
  };

  const handleUpdate = async () => {
    setSaving(true);
    await fetch('/api/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    setSaving(false);
    onRefresh();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    await fetch(`/api/projects?id=${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    onRefresh();
  };

  return (
    <div>
      <div className="dash-page-header">
        <h2 className="dash-page-title">Projects</h2>
        <button onClick={() => setAdding(true)} className="dash-btn-primary" style={{ padding: '8px 20px', fontSize: 13 }}>
          + Add Project
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="dash-form-card">
          <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>New Project</h3>
          <div className="dash-form-grid">
            <input className="dash-input" placeholder="Project name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="dash-input" placeholder="Client" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
            <select className="dash-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="dash-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input className="dash-input" placeholder="URL (optional)" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
          </div>
          <div className="dash-form-actions">
            <button onClick={handleAdd} disabled={saving || !form.name} className="dash-btn-primary" style={{ padding: '8px 20px', fontSize: 13 }}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setAdding(false)} className="dash-btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="dash-form-card">
          <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Edit Project</h3>
          <div className="dash-form-grid">
            <input className="dash-input" placeholder="Project name" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
            <input className="dash-input" placeholder="Client" value={editing.client} onChange={e => setEditing({ ...editing, client: e.target.value })} />
            <select className="dash-input" value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value })}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="dash-input" value={editing.type} onChange={e => setEditing({ ...editing, type: e.target.value })}>
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input className="dash-input" placeholder="URL (optional)" value={editing.url || ''} onChange={e => setEditing({ ...editing, url: e.target.value })} />
          </div>
          <div className="dash-form-actions">
            <button onClick={handleUpdate} disabled={saving} className="dash-btn-primary" style={{ padding: '8px 20px', fontSize: 13 }}>
              {saving ? 'Saving...' : 'Update'}
            </button>
            <button onClick={() => setEditing(null)} className="dash-btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="dash-table-wrap" style={{ marginTop: 16 }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Client</th>
              <th>Type</th>
              <th>Status</th>
              <th>URL</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td>{p.client}</td>
                <td>{p.type}</td>
                <td><span className={`dash-badge dash-badge-${p.status}`}>{p.status}</span></td>
                <td>{p.url ? <a href={`https://${p.url}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>{p.url}</a> : '—'}</td>
                <td>{p.created}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => setEditing({ ...p })} className="dash-btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }}>Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="dash-btn-ghost" style={{ padding: '4px 10px', fontSize: 12, color: '#999' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
