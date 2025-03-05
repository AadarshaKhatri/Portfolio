import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function GET(){
  
  try{
    const lang = await prisma.languages.findMany();
    return NextResponse.json(lang);

  }catch(error){
    console.log("Error",error);
    return NextResponse.json({
      error:"Failed to Fetch the data",
    },{status:500});
  }
}