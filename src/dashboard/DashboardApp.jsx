import { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

export default function DashboardApp() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('dash_token');
    if (saved) {
      try {
        const payload = JSON.parse(atob(saved));
        if (payload.exp > Date.now()) {
          setToken(saved);
        } else {
          localStorage.removeItem('dash_token');
        }
      } catch {
        localStorage.removeItem('dash_token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('dash_token');
    setToken(null);
  };

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return <Dashboard token={token} onLogout={handleLogout} />;
}
