// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useContext } from 'react';
import { UserContext } from './contexts/User';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/about-2', request.url));
}
