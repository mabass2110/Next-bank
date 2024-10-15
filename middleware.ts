import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
//Middleware to protect config.matcher routes
export function middleware(request: NextRequest) {
 const path = request.nextUrl.pathname;

 const isPublicPath = path === '/login' || path === '/signup';
 const token = request.cookies.get('token')?.value || ''

 
 if(isPublicPath && token) {
    return NextResponse.redirect(new URL("/deposit", request.nextUrl))
 }

 if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
 }
}
 
//matching paths to run the middleware
export const config = {
  matcher: [
    '/',
   '/login',
],
}