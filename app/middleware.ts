"use client"
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./(authenticated)/sessions";

const protectedRoutes = ["/admin/site-controller"];
const publicRoutes = ["/admin/login", "/"];

export default async function middleware(req: NextRequest) {
  console.log("Middleware Running...");
  try {
    const path = req.nextUrl.pathname;

    const isProtected = protectedRoutes.includes(path);
    const isPublic = publicRoutes.includes(path);

    //Get the Cookies from session
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    console.log(`Cookies:${cookie}`);

    if(!cookie) console.log("Not Cookie Found!")
      
    const session = await decrypt(cookie);
    console.log(session);

    if (isProtected && !session?.userId) {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }

    if (isPublic && session?.userId) {
      return NextResponse.redirect(
        new URL("admin/site-controller", req.nextUrl)
      );
    }

    return NextResponse.next();
  } catch (err) {
    console.log("Failed to Verify the JWT", err);
  }
}


