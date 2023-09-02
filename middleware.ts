import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import routes from './app/routes'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const res = NextResponse.next()
  if (url.pathname === '/') {
    url.pathname = routes.authentication
    return NextResponse.redirect(url)
  }
}

