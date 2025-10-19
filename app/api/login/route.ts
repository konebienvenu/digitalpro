import { NextResponse, NextRequest } from 'next/server';
import { loginUser } from '../../../lib/auth-login';
import { AUTH_COOKIE_NAME } from '../../../lib/middleware';

export async function POST(request: NextRequest) {
  try {
    const { email, password, rememberMe } = await request.json();

    if (!email?.trim() || !password?.trim()) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    const { user, token } = await loginUser({
      email: email.trim(),
      password: password.trim(),
      rememberMe,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // false en dev (localhost)
      sameSite: 'lax', // Important pour cookie persistant en local
      maxAge: rememberMe ? 60 * 60 * 24 * 7 : 60 * 60, // 7 jours ou 1 heure
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Email ou mot de passe incorrect' },
      { status: 401 }
    );
  }
}
