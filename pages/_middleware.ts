import { NextMiddleware, NextResponse } from 'next/server';

export const middleware: NextMiddleware = () => NextResponse.next();
