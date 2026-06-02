'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StaffLoginPage() {
  const [robloxName, setRobloxName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ robloxName, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      router.push('/staff/dashboard');
    } else {
      setError('Credenziali non valide.');
    }
  };

  return (
    <section>
      <h1>Accesso Staff</h1>
      <form onSubmit={submit}>
        <input
          placeholder="Nome Roblox"
          value={robloxName}
          onChange={e => setRobloxName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Accedi</button>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
}
