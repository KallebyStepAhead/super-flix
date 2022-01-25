/* eslint-disable @next/next/no-server-import-in-page */
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    return NextResponse.error();
  }

  const token = await getToken({
    req: req as any as NextApiRequest,
    secret,
  });

  // If user is already authenticated, redirect to index route
  if (token) {
    return NextResponse.redirect('/');
  }

  return NextResponse.next();
}
