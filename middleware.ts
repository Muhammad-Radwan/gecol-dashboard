import { NextRequest, NextResponse } from "next/server";

export function middleware (req: NextRequest) {
    const userGuid = req.cookies.get('guid')
    const protectedRoutes = ['/dashboard', '/createcompany', '/signup', '/meterslist']

    if (protectedRoutes.includes(req.nextUrl.pathname) && !userGuid) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard', '/createcompany', '/signup', '/meterslist'], // Define routes to protect
};