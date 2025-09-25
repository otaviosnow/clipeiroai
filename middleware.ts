import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DEV_MODE } from './lib/dev-mode'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const { pathname } = request.nextUrl

  // Rotas que não precisam de autenticação
  const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/verify-email']
  
  // Verificar se é uma rota pública
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  
  // Se for rota pública, permitir acesso
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Modo de desenvolvimento - bypass de autenticação
  if (DEV_MODE) {
    return NextResponse.next()
  }

  // Verificar se há login de teste no localStorage (via header)
  const testUserHeader = request.headers.get('x-test-user')
  if (testUserHeader) {
    return NextResponse.next()
  }

  // Se não tiver token e não for rota pública, redirecionar para login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
