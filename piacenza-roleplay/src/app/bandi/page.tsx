'use client';

import { useState } from 'react';

const FACTIONS = [
  { key: 'POLIZIA_DI_STATO', label: 'Polizia Di Stato' },
  { key: 'CARABINIERI', label: 'Carabinieri' },
  { key: 'VIGILI_DEL_FUOCO', label: 'Vigili Del Fuoco' },
  { key: 'ACI', label: 'ACI' },
  { key: 'GUARDIA_DI_FINANZA', label: 'Guardia Di Finanza' },
  { key: 'ESERCITO_ITALIANO', label: 'Esercito Italiano' },
  { key: 'DIREZIONE_INVESTIGATIVA_MAFIA', label: 'Direzione Investigativa Mafia' }
];

export default function BandiPage() {
  const [open, setOpen] = useState(false);
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
  const [robloxName, setRobloxName] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFaction) {
      setMessage('Seleziona una fazione.');
      return;
    }
    const res = await fetch('/api/bandi/submit', {
      method: 'POST',
      body: JSON.stringify({ faction: selectedFaction, robloxName, content }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      setMessage('Bando inviato con successo.');
      setContent('');
    } else {
      setMessage('Errore durante l’invio del bando.');
    }
  };

  return (
    <section>
      <h1>Bandi</h1>
      <button onClick={() => setOpen(o => !o)}>
        Seleziona Fazione {open ? '▲' : '▼'}
      </button>
      {open && (
        <ul>
          {FACTIONS.map(f => (
            <li key={f.key}>
              <button onClick={() => setSelectedFaction(f.key)}>
                {f.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedFaction && (
        <form onSubmit={submit}>
          <p>Fazione selezionata: {selectedFaction}</p>
          <input
            placeholder="Nome Roblox"
            value={robloxName}
            onChange={e => setRobloxName(e.target.value)}
            required
          />
          <textarea
            placeholder="Motivazioni, esperienze, ecc."
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
          <button type="submit">Invia Bando</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </section>
  );
}
