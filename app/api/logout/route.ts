import { NextResponse, type NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/middleware';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  // Supprime le cookie côté serveur en le mettant à expiré
  response.cookies.set(AUTH_COOKIE_NAME, '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
  });
  return response;
}
