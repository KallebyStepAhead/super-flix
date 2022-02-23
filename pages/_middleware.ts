import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const isAppRoute = url.pathname.includes('/app');
  const isAuthRoute = url.pathname.includes('/auth');

  if (isAppRoute || isAuthRoute) {
    return NextResponse.next();
  }

  url.pathname = '/app';

  return NextResponse.redirect(url);
}

export default withAuth(
  middleware,
  {
    pages: {
      signIn: '/auth/signIn' || '/auth/signUp',
    },
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;

        const isAuthRoute = pathname.includes('/auth');

        if (isAuthRoute) return true;

        return !!token;
      },
    },
  },
);
