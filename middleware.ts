import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Log apenas em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Middleware - Request:', {
      url: request.url,
      method: request.method,
      pathname: request.nextUrl.pathname,
      timestamp: new Date().toISOString()
    })
  }

  // Permitir acesso a rotas públicas
  const publicRoutes = ['/', '/login', '/register', '/api/auth/login', '/api/auth/register']
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))
  
  if (isPublicRoute) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}