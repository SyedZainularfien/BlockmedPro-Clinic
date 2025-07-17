// middleware.ts
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the root path
  if (request.nextUrl.pathname === '/') {
    // Redirect to the dashboard page
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to the base path
export const config = {
  matcher: ['/', '/dashboard'],
};
