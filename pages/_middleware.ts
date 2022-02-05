import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextMiddleware, NextResponse } from 'next/server';

export const middleware: NextMiddleware = async (req) => {
  console.log('Running middleware');

  const { pathname } = req.nextUrl;

  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    console.log('Secret Error');
    return NextResponse.error();
  }

  const token = await getToken({
    req: req as unknown as NextApiRequest,
    secret,
  });

  console.log('auth token', token);

  const isAuthRoute = (
    pathname.includes('/api/auth')
    || pathname === '/auth/signIn'
    || pathname === '/auth/signUp'
  );

  const isAllowed = !!token || isAuthRoute;

  if (isAllowed) {
    console.log('allowed');
    return NextResponse.next();
  }

  console.log('redirect to signIn');

  // If user neither authenticated nor is auth route, redirect.
  return NextResponse.redirect('/api/auth/signin');
};
