import { useState, useEffect, useCallback } from 'react';
import Analytics from './Analytics';
import Projects from './Projects';

export default function Dashboard({ token, onLogout }) {
  const [tab, setTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [projRes, anaRes] = await Promise.all([
        fetch('/api/projects', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/track', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const projData = await projRes.json();
      const anaData = await anaRes.json();
      setProjects(Array.isArray(projData) ? projData : []);
      setAnalytics(anaData.error ? { visits: [], daily: {} } : anaData);
    } catch {
      setProjects([]);
      setAnalytics({ visits: [], daily: {} });
    }
    setLoading(false);
  }, [token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const totalVisits = analytics?.visits?.length || 0;
  const todayKey = new Date().toISOString().split('T')[0];
  const todayVisits = analytics?.visits?.filter(v => v.date === todayKey).length || 0;
  const liveProjects = projects.filter(p => p.status === 'live').length;
  const inProgress = projects.filter(p => p.status === 'in-progress').length;

  // Unique sites visited
  const sites = {};
  (analytics?.visits || []).forEach(v => { sites[v.site] = (sites[v.site] || 0) + 1; });

  // Last 7 days data
  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const count = (analytics?.visits || []).filter(v => v.date === key).length;
    last7.push({ date: key.slice(5), count });
  }
  const maxCount = Math.max(...last7.map(d => d.count), 1);

  return (
    <div className="dash-wrap">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-logo">SeekerLabs<span style={{ opacity: 0.2 }}>.</span></div>
        <nav className="dash-nav">
          <button
            onClick={() => setTab('overview')}
            className={`dash-nav-item ${tab === 'overview' ? 'active' : ''}`}
          >
            Overview
          </button>
          <button
            onClick={() => setTab('projects')}
            className={`dash-nav-item ${tab === 'projects' ? 'active' : ''}`}
          >
            Projects
          </button>
          <button
            onClick={() => setTab('analytics')}
            className={`dash-nav-item ${tab === 'analytics' ? 'active' : ''}`}
          >
            Analytics
          </button>
        </nav>
        <button onClick={onLogout} className="dash-nav-item dash-logout">
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="dash-main">
        {loading ? (
          <div className="dash-loading">Loading...</div>
        ) : tab === 'overview' ? (
          <div>
            <h2 className="dash-page-title">Overview</h2>
            <div className="dash-stats-grid">
              <div className="dash-stat-card">
                <p className="dash-stat-num">{totalVisits}</p>
                <p className="dash-stat-label">Total Visits</p>
              </div>
              <div className="dash-stat-card">
                <p className="dash-stat-num">{todayVisits}</p>
                <p className="dash-stat-label">Today</p>
              </div>
              <div className="dash-stat-card">
                <p className="dash-stat-num">{projects.length}</p>
                <p className="dash-stat-label">Total Projects</p>
              </div>
              <div className="dash-stat-card">
                <p className="dash-stat-num">{liveProjects}</p>
                <p className="dash-stat-label">Live</p>
              </div>
              <div className="dash-stat-card">
                <p className="dash-stat-num">{inProgress}</p>
                <p className="dash-stat-label">In Progress</p>
              </div>
              <div className="dash-stat-card">
                <p className="dash-stat-num">{Object.keys(sites).length}</p>
                <p className="dash-stat-label">Sites Tracked</p>
              </div>
            </div>

            {/* Mini chart */}
            <div className="dash-section">
              <h3 className="dash-section-title">Last 7 Days</h3>
              <div className="dash-chart">
                {last7.map((d, i) => (
                  <div key={i} className="dash-chart-bar-wrap">
                    <div
                      className="dash-chart-bar"
                      style={{ height: `${Math.max((d.count / maxCount) * 100, 4)}%` }}
                    />
                    <span className="dash-chart-label">{d.date}</span>
                    <span className="dash-chart-count">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent visits */}
            <div className="dash-section">
              <h3 className="dash-section-title">Recent Visits</h3>
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Site</th>
                      <th>Page</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(analytics?.visits || []).slice(-10).reverse().map((v, i) => (
                      <tr key={i}>
                        <td>{v.site}</td>
                        <td>{v.page}</td>
                        <td>{new Date(v.time).toLocaleString()}</td>
                      </tr>
                    ))}
                    {totalVisits === 0 && (
                      <tr><td colSpan="3" style={{ textAlign: 'center', opacity: 0.4 }}>No visits tracked yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Projects summary */}
            <div className="dash-section">
              <h3 className="dash-section-title">Projects</h3>
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Client</th>
                      <th>Status</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(p => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600 }}>{p.name}</td>
                        <td>{p.client}</td>
                        <td><span className={`dash-badge dash-badge-${p.status}`}>{p.status}</span></td>
                        <td>{p.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : tab === 'projects' ? (
          <Projects token={token} projects={projects} onRefresh={fetchData} />
        ) : (
          <Analytics analytics={analytics} />
        )}
      </main>
    </div>
  );
}
