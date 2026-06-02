import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Piacenza Roleplay',
  description: 'Piacenza Roleplay - Roblox Roleplay Server'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/chi-siamo">Chi Siamo</a>
            <a href="/attivita">Attività</a>
            <a href="/bandi">Bandi</a>
            <a href="/status-server">Status Server</a>
            <a href="/orari-ssu">Orari Server SSU</a>
            <a href="/link-server">Link Server</a>
            <a href="/staff/login">Accesso Staff</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
