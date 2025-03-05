import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function GET(){

  try{
    const projects = (await prisma.projects.findMany()).reverse();
    return NextResponse.json(projects);

  }catch(err){
    console.log(err);
    return NextResponse.json({error:"Internal Sever Error"},{status:500});
    
  }
}