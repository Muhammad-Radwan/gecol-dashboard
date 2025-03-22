import {  NextResponse } from "next/server";

export async function GET() {
    const response  = NextResponse.json({success: true})

    // Remove the cookie by setting an expired date
    response.cookies.set({
        name: "guid",
        value: "",
        path: "/",
        expires: new Date(0), // Expire immediately
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return response
}