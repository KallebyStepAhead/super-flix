import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    return NextResponse.error();
  }

  const token = await getToken({
    req: req as any as NextApiRequest,
    secret,
  });

  const isAuthRoute = (
    pathname.includes('/api/auth')
    || pathname === '/auth/signIn'
    || pathname === '/auth/signUp'
  );

  const isAllowed = !!token || isAuthRoute;

  if (isAllowed) {
    return NextResponse.next();
  }

  // If user neither authenticated nor is auth route, redirect.
  return NextResponse.redirect('/api/auth/signin');
}
