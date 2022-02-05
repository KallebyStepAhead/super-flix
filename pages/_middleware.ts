import { NextMiddleware, NextResponse } from 'next/server';

export const middleware: NextMiddleware = () => {
  console.log('Running middleware');

  return NextResponse.next();
};
