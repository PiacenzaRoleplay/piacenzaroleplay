// src/app/api/eh-online/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: integrare qui la chiamata reale al tuo sistema EH / adminpanel
  const online = 42; // valore fittizio
  return NextResponse.json({ online });
}
