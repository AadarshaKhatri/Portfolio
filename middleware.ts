"use server"
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/(authenticated)/sessions";

const protectedRoutes = ["/admin/site-controller"];
const publicRoutes = ["/admin/login","/admin/signup"];

export async function middleware(req: NextRequest) {

  try {

    const path = req.nextUrl.pathname;
    if(path ==="/") return NextResponse.next();

    const isProtected = protectedRoutes.includes(path);
    const isPublic = publicRoutes.includes(path);

    //Get the Cookies from session
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
   
    // if(!cookie) console.log("Not Cookie Found!")
      
    const session = await decrypt(String(cookie));


    if (isProtected && !session?.userId) {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }

    if (isPublic && session?.userId) {
      return NextResponse.redirect(
        new URL("/admin/site-controller", req.nextUrl)
      );
    }

    return NextResponse.next();
  } catch (err) {
    // console.log("Failed to Verify the JWT", err);
    return {
      error:err,
    }
  }
}


