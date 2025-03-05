import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function GET(){
  
  try{
    const experience = await prisma.experience.findMany();
    return NextResponse.json(experience);

  }catch(error){
    console.log("Error",error);
    return NextResponse.json({
      error:"Failed to Fetch the data",
    },{status:500});
  }
}