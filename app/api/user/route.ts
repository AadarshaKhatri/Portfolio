

import { getUser } from "@/app/(authenticated)/sessions";
import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function GET(){
  
  try{
    const user = await getUser();
    const User = await prisma.user_models.findUnique({
      where:{
        id:Number(user?.userId)
      }
    });
    return NextResponse.json(User);

  }catch(error){
    console.log("Error",error);
    return NextResponse.json({
      error:"Failed to Fetch the data",
    },{status:500});
  }
}