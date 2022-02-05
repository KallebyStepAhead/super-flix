import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextMiddleware, NextResponse } from 'next/server';

export const middleware: NextMiddleware = async (req) => {
  console.log('Running Index middleware');

  // const { pathname } = req.nextUrl;

  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    console.log('Secret Error');
    return NextResponse.error();
  }

  const token = await getToken({
    req: req as unknown as NextApiRequest,
    secret,
  });

  console.log('Stopping Index Middleware:\nAuthToken:', token);

  // If user neither authenticated nor is auth route, redirect.
  return NextResponse.next();
};
