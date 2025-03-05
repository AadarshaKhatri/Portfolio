

import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function GET(){
  
  try{
    const User = await prisma.user_models.findFirst();
    return NextResponse.json(User);

  }catch (err){
    return NextResponse.json({
      error:"Failed to Fetch the data",
      message:err,
    },{status:500});
  }
}