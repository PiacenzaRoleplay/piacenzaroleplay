// src/app/orari-ssu/page.tsx
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function OrariSSUPage() {
  const currentYear = new Date().getFullYear();
  const schedule = await prisma.serverSchedule.findFirst({
    where: { year: currentYear }
  });

  return (
    <section>
      <h1>Orari Server SSU</h1>
      <p>Anno: {currentYear}</p>
      <pre>{schedule?.schedule ?? 'Nessun orario impostato.'}</pre>
    </section>
  );
}
