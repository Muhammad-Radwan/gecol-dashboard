import { NextRequest, NextResponse } from "next/server";

export function middleware (req: NextRequest) {
    
    const protectedRoutes = ['/createcompany', '/signup', '/meterslist'];
    const isProtected = protectedRoutes.includes(req.nextUrl.pathname);

    const userGuid = req.cookies.get("guid")?.value;
    const isAdminString = req.cookies.get("isItAdmin")?.value;
    let isAdmin = false
    if (isAdminString === "true") {
        isAdmin = true
    } else {
        isAdmin = false
    }
    console.log(`guid: ${userGuid}`)
    console.log(`is admin: ${isAdmin}`)

    if (isProtected && (!userGuid || !isAdmin)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ['/createcompany', '/signup', '/meterslist'], // Define routes to protect
};