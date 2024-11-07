import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sirenClient } from '../api/sirenClient';

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      setMessage('Login successful!');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const testAdminAccess = async () => {
    try {
      const root = await sirenClient.followAndParse('/');
      const adminLink = root.links.find((link: any) => link.rel.includes('hello-admin'));
      
      if (!adminLink) {
        throw new Error('Admin endpoint not found');
      }

      const response = await sirenClient.followAndParse<HelloAdminResponse>(adminLink.href);
      setMessage(response.properties.message);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to access admin endpoint');
      setMessage(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>

      {isAuthenticated && (
        <button onClick={testAdminAccess}>Test Admin Access</button>
      )}

      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

interface HelloAdminResponse {
    message: string
}
