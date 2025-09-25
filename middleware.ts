import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('🔍 Middleware - Request:', {
    url: request.url,
    method: request.method,
    pathname: request.nextUrl.pathname,
    timestamp: new Date().toISOString()
  })

  // Check for test user in localStorage (client-side)
  if (request.nextUrl.pathname.startsWith('/dashboard-dark')) {
    console.log('📱 Dashboard access - checking authentication')
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}