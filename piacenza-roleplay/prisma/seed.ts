import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  //
  // OWNER (unico utente con password nel seed)
  //
  const ownerPassword = await bcrypt.hash('PiacenzaDeveloper', 10);

  await prisma.user.upsert({
    where: { robloxName: 'EIPRINIAN_2010' },
    update: {},
    create: {
      robloxName: 'EIPRINIAN_2010',
      passwordHash: ownerPassword,
      role: "OWNER"
    }
  });

  //
  // ADMIN (senza password → la imposta l’OWNER)
  //
  await prisma.user.upsert({
    where: { robloxName: 'Admin_Piacenza' },
    update: {},
    create: {
      robloxName: 'Admin_Piacenza',
      passwordHash: "",   // ← password vuota
      role: "ADMIN"
    }
  });

  //
  // CAPOFAZIONE (senza password → la imposta l’OWNER)
  //
  const fazioni = [
    "POLIZIA_DI_STATO",
    "CARABINIERI",
    "VIGILI_DEL_FUOCO",
    "ACI",
    "GUARDIA_DI_FINANZA",
    "ESERCITO_ITALIANO",
    "DIREZIONE_INVESTIGATIVA_MAFIA"
  ] as const;

  type Fazione = (typeof fazioni)[number];

  for (const f of fazioni) {
    await prisma.user.upsert({
      where: { robloxName: `CapoFazione_${f}` },
      update: {},
      create: {
        robloxName: `CapoFazione_${f}`,
        passwordHash: "",   // ← password vuota
        role: "CAPOFAZIONE",
        faction: f
      }
    });
  }

  //
  // STAFF (senza password → la imposta l’OWNER)
  //
  await prisma.user.upsert({
    where: { robloxName: 'Staff_Piacenza' },
    update: {},
    create: {
      robloxName: 'Staff_Piacenza',
      passwordHash: "",   // ← password vuota
      role: "STAFF"
    }
  });

  //
  // DATI BASE SERVER
  //
  await prisma.serverStatus.create({
    data: {
      status: "SSD"
    }
  });

  await prisma.serverSchedule.create({
    data: {
      year: new Date().getFullYear(),
      schedule: "Nessun orario impostato."
    }
  });

  await prisma.serverLink.create({
    data: {
      ehCode: "NESSUN_CODICE",
      url: "https://www.roblox.com"
    }
  });

  console.log("Seed completato con successo.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
