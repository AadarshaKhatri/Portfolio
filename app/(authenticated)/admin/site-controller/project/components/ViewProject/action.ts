"use server"

import prisma from "@/app/lib/db";

interface deleteProjectTypes {
  error?:string,
  success?:boolean,
  message?:string,
}

export async function ReadProjects(){
  return await prisma.projects.findMany();
}

export async function deleteProject(prevState:deleteProjectTypes,formData:FormData){
  try{
    const id = formData.get("id") as string;

    if(!id){
      return{
        success:false,
        error:"Project Not Found!",
        message:null,
      }
    }

    const isDeleted = await prisma.projects.delete({
      where:{
        id:Number(id),
      }
    })

    return {
      success:true,
      message:"Project Deleted!",
      error:null
    }

  }catch(err){
    return{
      success:false,
      message:null,
      error:"Failed to Delete the Project",
    }
  }
}