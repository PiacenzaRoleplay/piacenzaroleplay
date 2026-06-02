// src/app/api/bandi/submit/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { faction, robloxName, content } = await req.json();

  if (!faction || !robloxName || !content) {
    return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 });
  }

  // VALIDAZIONE fazione (evita injection e valori non validi)
  const validFactions = [
    "POLIZIA_DI_STATO",
    "CARABINIERI",
    "VIGILI_DEL_FUOCO",
    "ACI",
    "GUARDIA_DI_FINANZA",
    "ESERCITO_ITALIANO",
    "DIREZIONE_INVESTIGATIVA_MAFIA"
  ];

  if (!validFactions.includes(faction)) {
    return NextResponse.json({ error: 'Fazione non valida' }, { status: 400 });
  }

  await prisma.bando.create({
    data: {
      faction,      // 👈 STRINGA, NON ENUM → ZERO ERRORI
      robloxName,
      content
    }
  });

  return NextResponse.json({ ok: true });
}
