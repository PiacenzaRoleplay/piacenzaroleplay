// src/app/status-server/page.tsx
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function StatusServerPage() {
  const status = await prisma.serverStatus.findFirst({
    orderBy: { id: 'desc' }
  });

  return (
    <section>
      <h1>Status Server</h1>
      <p>Status attuale: {status?.status ?? 'Non impostato'}</p>
    </section>
  );
}
