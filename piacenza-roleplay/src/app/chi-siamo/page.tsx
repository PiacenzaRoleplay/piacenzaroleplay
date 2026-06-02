'use client';

import { useEffect, useState } from 'react';

export default function ChiSiamoPage() {
  const [online, setOnline] = useState<number | null>(null);

  useEffect(() => {
    const fetchOnline = async () => {
      const res = await fetch('/api/eh-online');
      const data = await res.json();
      setOnline(data.online);
    };

    fetchOnline();
    const interval = setInterval(fetchOnline, 5000); // refresh ogni 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <h1>Chi Siamo</h1>
      <p>
        Siamo lo staff di Piacenza Roleplay, un progetto Roblox dedicato al roleplay
        realistico ispirato alla città di Piacenza.
      </p>
      <p>
        Membri online nel server EH:{' '}
        {online === null ? 'Caricamento...' : online}
      </p>
    </section>
  );
}
