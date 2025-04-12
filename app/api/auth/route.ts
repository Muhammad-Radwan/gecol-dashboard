import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {cardGuide, isITAdmin} = await req.json()

    //console.log(`mother fucker post data: ${cardGuide} /// ${isITAdmin}`)

    if(!cardGuide || !isITAdmin)
        return NextResponse.json({error: "missing user guid or is admin"}, {status: 400})

    const response = NextResponse.json({success: true})

    response.cookies.set({
        name: "guid",
        value: cardGuide,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
    })

    response.cookies.set({
        name: "isItAdmin",
        value: isITAdmin,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
    })

    return response
}