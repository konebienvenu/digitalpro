import { NextResponse, NextRequest } from 'next/server';
import { getUserFromToken } from '../../../lib/middleware'; // ou mieux, créer une lib pour cette fonction

const AUTH_COOKIE_NAME = 'auth_token';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const user = await getUserFromToken(token);

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}
