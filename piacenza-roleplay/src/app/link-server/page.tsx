// src/app/link-server/page.tsx
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function LinkServerPage() {
  const link = await prisma.serverLink.findFirst({
    orderBy: { id: 'desc' }
  });

  return (
    <section>
      <h1>Link Server</h1>
      {link ? (
        <>
          <p>Codice EH: {link.ehCode}</p>
          <a href={link.url} target="_blank">
            Entra nel server
          </a>
        </>
      ) : (
        <p>Nessun link configurato.</p>
      )}
    </section>
  );
}
