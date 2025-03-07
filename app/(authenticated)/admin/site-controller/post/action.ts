"use server"
import prisma from "@/app/lib/db";
import { deleteImages, uploadFile } from "../project/action";
import { getUser } from "@/app/(authenticated)/sessions";
import {  PostModel, ResponseTypes } from "@/app/types/interfaces";




export async function createPost(prevState:ResponseTypes,formData:FormData) : Promise<ResponseTypes> {
  try{
    const caption = formData.get("caption") as string
    const status = formData.get("status") as string
    const tags = formData.getAll("tags") as string[]
    const images = formData.get("image") as File
    let url = null;

    const {fileUrl} = await uploadFile(images);
    
    const user = await getUser();
    if(!user){
      return {
        success:false,
        error:"User not Found!",
        message:null,
      }
    }
    url = fileUrl
    if(!url){
      return { 
        error:"Failed to Upload the file",
        message:null,
        success:false,
      }
    }

    await prisma.post.create({
      data:{
        caption:caption,
        images:url,
        tags:tags,
        pinned:status === "pinned" ? true : false,
        author:{
          connect:{
            id:Number(user?.userId)
          }
        }
      }
    })

    return { 
      success:true,
      message:"Successfully Created A Post",
      error:null,
    }
  }catch(error){
    return {
      error:`Failed to created the Post, ${error}`,
      message:null,
      success:false,
    }
  }

}

export async function deletePost(prevState:ResponseTypes,formData:FormData) : Promise<ResponseTypes> {

  const id = formData.get("id") as string;

  const foundPost = await prisma.post.findUnique({
    where:{
      id:Number(id),
    }
  })
  if(!foundPost){
  return{
    success:false,
    error:"Failed to find the Project!",
    message:null,
  }

  }
  
  const {success} = await deleteImages(foundPost?.images);

  if(success){
    await prisma.post.delete({
     where:{
       id:Number(id),
     }
   })
  }
  return {
    success:true,
    message:"Project Deleted Successfully",
    error:null,
  }
}


export async function editPost(prevState:ResponseTypes, formData:FormData)  : Promise<ResponseTypes>{
  try{
    const id = formData.get("id") as string;
    const caption = formData.get("caption") as string
    const status = formData.get("status") as string
    const tags = formData.getAll("tags") as string[]
    const images = formData.get("image") as File
    let url = null;

    const {fileUrl} = await uploadFile(images);
    url = fileUrl
   await prisma.post.update({
      where:{
        id:Number(id),
      },
      data:{
        caption:caption,
        tags:tags,
        images:url ? url : undefined,
        pinned:status === "pinned" ? true : false
      }
    })

    return {
      success:true,
      error:null,
      message:"Project Updated Successfully!"
    }

  }catch(error){
    return{
      error:"Failed to Edit the Post",
      message:`Error Message : ${error}`,
      success:false,

    
    }
  }
}

export async function readPost(){
  return await prisma.post.findMany();
}


export async function getPostCreator(userId:number){
  return await prisma.user_models.findUnique({
    where:{
      id:userId,
    }
  })
}

export async function getUniquePost(id:number) : Promise <PostModel | null>{
  try{
  return await prisma.post.findUnique({
    where:{
      id:id,
    }
  })
}catch{
  return null;
}

}