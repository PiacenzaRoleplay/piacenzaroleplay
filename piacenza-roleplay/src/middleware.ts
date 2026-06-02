// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const PROTECTED_PATHS = ['/staff/dashboard', '/staff/bandi', '/staff/orari-ssu', '/staff/link-server', '/staff/status-server'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PROTECTED_PATHS.some(p => pathname.startsWith(p))) {
    const token = req.cookies.get('staff_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/staff/login', req.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/staff/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/staff/:path*']
};
