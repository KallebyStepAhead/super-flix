/* eslint-disable @next/next/no-server-import-in-page */
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('Running Auth middleware');

  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    console.log('Secret Error');
    return NextResponse.error();
  }

  const token = await getToken({
    req: req as any as NextApiRequest,
    secret,
  });

  console.log('Auth-> AuthToken:', token);

  // If user is already authenticated, redirect to index route
  if (token) {
    console.log('Redirect to Index');
    return NextResponse.redirect('/');
  }

  return NextResponse.next();
}
