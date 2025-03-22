import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const userGuid = await req.json()

    if(!userGuid)
        return NextResponse.json({error: "couldn't retrieve user guid"}, {status: 400})

    const response = NextResponse.json({success: true})

    response.cookies.set({
        name: "guid",
        value: userGuid,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
    })

    return response
}