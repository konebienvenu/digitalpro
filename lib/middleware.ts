import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
export const AUTH_COOKIE_NAME = 'auth_token' as const;

interface JwtPayload {
  userId: number;
  role: string;
  iat?: number;
  exp?: number;
}

export async function getUserFromToken(token: string): Promise<JwtPayload | null> {
  try {
    return await new Promise<JwtPayload | null>((resolve) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        err ? resolve(null) : resolve(decoded as JwtPayload);
      });
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  const user = token ? await getUserFromToken(token) : null;

  // 🔓 Toutes les routes publiques (même avec slash ou query)
  const publicPaths = ['/', '/about', '/contact', '/login', '/register', '/forgot-password', '/reset-password'];
  const isPublic = publicPaths.some(path => pathname === path || pathname.startsWith(`${path}/`));

  // 🔧 Chemins système qu'on ne doit jamais bloquer
  const internalPaths = ['/api', '/_next', '/static'];
  const isInternal = internalPaths.some(path => pathname.startsWith(path));

  if (isPublic || isInternal) {
    return NextResponse.next();
  }

  // ✅ Utilisateur connecté
  if (user) {
    if (pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL('/order', request.url));
    }
  } else {
    // 🔐 Zones privées
    if (pathname.startsWith('/order') || pathname.startsWith('/account')) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|static|favicon.ico).*)' // capture tout sauf fichiers techniques
  ],
};
