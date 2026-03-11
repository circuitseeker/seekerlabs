import { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('dash_token', data.token);
        onLogin(data.token);
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Connection failed');
    }
    setLoading(false);
  };

  return (
    <div className="dash-login-wrap">
      <form onSubmit={handleSubmit} className="dash-login-box">
        <h1 className="dash-login-title">SeekerLabs<span style={{ opacity: 0.3 }}>.</span></h1>
        <p className="dash-login-sub">Dashboard Login</p>

        {error && <div className="dash-login-error">{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="dash-input"
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="dash-input"
        />
        <button type="submit" disabled={loading} className="dash-btn-primary">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
