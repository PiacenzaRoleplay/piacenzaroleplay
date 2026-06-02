import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { robloxName, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { robloxName } });

  if (!user) {
    return NextResponse.json({ error: 'Invalid' }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: 'Invalid' }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, robloxName: user.robloxName },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  const res = NextResponse.json({ ok: true });
  res.cookies.set('staff_token', token, {
    httpOnly: true,
    secure: true,
    path: '/'
  });

  return res;
}
