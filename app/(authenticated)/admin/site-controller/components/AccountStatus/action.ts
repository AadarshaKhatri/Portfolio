"use server";
import prisma from "@/app/lib/db";
import { error } from "console";


interface UpdateUserTypes  {
  error:string
  message:string
  success:boolean
}

export async function UpdateAccount(prevState:UpdateUserTypes,formData:FormData){
  const id = formData.get("id") as string;
  const bio = formData.get("bio") as string;
  const date = new Date(formData.get("born") as string);
  const description = formData.get("description") as string;
  const location =  formData.get("location") as string;
  const title = formData.get("title") as string;
  const degree = formData.get("degree") as string;
  try{
    if(!formData){
      return{
        success:false,
        error:"Data not recieved!",
        message:null,
      }
    }

    const updatedUser = await prisma.user_models.update({
      where:{
        id:Number(id)
      },
      data:{
        description:description,
        bio:bio,
        born:date,
        location:location,
        title:title,
        degree:degree,
      }
    })
    console.log(updatedUser)

    if (updatedUser) {
      return {
        success: true,
        message: "User successfully updated",
        error: null,
      };
    } else {
      return {
        success: false,
        error: "User not found or update failed",
        message: null,
      };
    }

  }catch(err){
    console.log("Error Message:")
    return({
      error:"Failed to update the user",
      success:false,
      message:null
    })
  }
}


export async function getUser() {
  return await prisma.user_models.findFirst({
    select:{
      id:true,
      title:true,
      bio:true,
      degree:true,
      description:true,
      location:true,
      born:true,
    }
  });
}
