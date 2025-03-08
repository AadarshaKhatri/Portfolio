"use server";
import prisma from "@/app/lib/db";
import { deleteImages, uploadFile } from "../project/action";
import { ResponseTypes } from "@/app/types/interfaces";



export async function UpdateAccount(prevState:ResponseTypes,formData:FormData) : Promise<ResponseTypes>{
  try{
    const id = formData.get("id") as string;
    const bio = formData.get("bio") as string;
    const date = new Date(formData.get("born") as string);
    const description = formData.get("description") as string;
    const location =  formData.get("location") as string;
    const title = formData.get("title") as string;
    const degree = formData.get("degree") as string;
    const image = formData.get("image") as File;
    let url = null

    if(!formData){
      return{
        success:false,
        error:"Data not recieved!",
        message:null,
      }
    }
    
    
    const FoundUser = await prisma.user_models.findUnique({
      where:{
        id:Number(id)
      },
    })
    if(!FoundUser){
      return { 
        success:false,
        error:"User not Found!",
        message:null,
      }
    }
    if(image && image.size>0){
      await deleteImages(String(FoundUser?.profile))
      const {fileUrl} = await uploadFile(image);
      url = fileUrl;
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
        profile:url ? url : FoundUser.profile,
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
    return({
      error:"Failed to update the user",
      success:false,
      message:String(err),
    })
  }
}


export async function getUniqueUser() {
  return await prisma.user_models.findFirst();
}


export async function UpdateProfilePicture(){

}


export async function getProjectCount(){
  return await prisma.projects.count();
}

export async function getTechStackCount(){
  return await prisma.technologies.count();
}

export async function getExperienceCount() {
  return await prisma.experience.count();
}

export async function getPostCount(){
  return await prisma.post.count();
}