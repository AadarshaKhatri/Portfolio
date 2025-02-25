"use server"
import prisma from "@/app/lib/db";
import { uploadFile } from "../project/action";
import { getUser } from "@/app/(authenticated)/sessions";


interface ReturnType {
  error?:string,
  message?:string,
  success?:boolean,
}

export async function createPost(prevState:ReturnType,formData:FormData){
  console.log("Create Post Api Hit");
  console.log("Form Data : ",formData);
  try{
    const caption = formData.get("caption") as string
    const status = formData.get("status") as string
    const tags = formData.getAll("tags") as string[]
    const images = formData.get("iamges") as File
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
    console.log(user);
    url = fileUrl
    console.log(await uploadFile(images));
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