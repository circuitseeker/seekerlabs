export default function Analytics({ analytics }) {
  const visits = analytics?.visits || [];
  const daily = analytics?.daily || {};

  // By site
  const bySite = {};
  visits.forEach(v => { bySite[v.site] = (bySite[v.site] || 0) + 1; });

  // By page
  const byPage = {};
  visits.forEach(v => {
    const key = `${v.site}${v.page}`;
    byPage[key] = (byPage[key] || 0) + 1;
  });
  const topPages = Object.entries(byPage).sort((a, b) => b[1] - a[1]).slice(0, 15);

  // By referrer
  const byRef = {};
  visits.forEach(v => {
    if (v.referrer) byRef[v.referrer] = (byRef[v.referrer] || 0) + 1;
  });
  const topRefs = Object.entries(byRef).sort((a, b) => b[1] - a[1]).slice(0, 10);

  // Last 14 days
  const last14 = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const count = visits.filter(v => v.date === key).length;
    last14.push({ date: key, label: key.slice(5), count });
  }
  const maxCount = Math.max(...last14.map(d => d.count), 1);

  // Unique visitors (approximate by UA)
  const uniqueUAs = new Set(visits.map(v => v.ua)).size;

  return (
    <div>
      <h2 className="dash-page-title">Analytics</h2>

      <div className="dash-stats-grid">
        <div className="dash-stat-card">
          <p className="dash-stat-num">{visits.length}</p>
          <p className="dash-stat-label">Total Page Views</p>
        </div>
        <div className="dash-stat-card">
          <p className="dash-stat-num">{uniqueUAs}</p>
          <p className="dash-stat-label">Unique Visitors (approx)</p>
        </div>
        <div className="dash-stat-card">
          <p className="dash-stat-num">{Object.keys(bySite).length}</p>
          <p className="dash-stat-label">Sites</p>
        </div>
        <div className="dash-stat-card">
          <p className="dash-stat-num">{Object.keys(byPage).length}</p>
          <p className="dash-stat-label">Unique Pages</p>
        </div>
      </div>

      {/* Chart */}
      <div className="dash-section">
        <h3 className="dash-section-title">Last 14 Days</h3>
        <div className="dash-chart" style={{ height: 180 }}>
          {last14.map((d, i) => (
            <div key={i} className="dash-chart-bar-wrap">
              <div
                className="dash-chart-bar"
                style={{ height: `${Math.max((d.count / maxCount) * 100, 4)}%` }}
              />
              <span className="dash-chart-label">{d.label}</span>
              <span className="dash-chart-count">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* By site */}
      <div className="dash-section">
        <h3 className="dash-section-title">Traffic by Site</h3>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead><tr><th>Site</th><th>Views</th></tr></thead>
            <tbody>
              {Object.entries(bySite).sort((a, b) => b[1] - a[1]).map(([site, count]) => (
                <tr key={site}><td style={{ fontWeight: 600 }}>{site}</td><td>{count}</td></tr>
              ))}
              {Object.keys(bySite).length === 0 && (
                <tr><td colSpan="2" style={{ textAlign: 'center', opacity: 0.4 }}>No data yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top pages */}
      <div className="dash-section">
        <h3 className="dash-section-title">Top Pages</h3>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead><tr><th>Page</th><th>Views</th></tr></thead>
            <tbody>
              {topPages.map(([page, count]) => (
                <tr key={page}><td>{page}</td><td>{count}</td></tr>
              ))}
              {topPages.length === 0 && (
                <tr><td colSpan="2" style={{ textAlign: 'center', opacity: 0.4 }}>No data yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top referrers */}
      {topRefs.length > 0 && (
        <div className="dash-section">
          <h3 className="dash-section-title">Top Referrers</h3>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead><tr><th>Referrer</th><th>Views</th></tr></thead>
              <tbody>
                {topRefs.map(([ref, count]) => (
                  <tr key={ref}><td>{ref}</td><td>{count}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
