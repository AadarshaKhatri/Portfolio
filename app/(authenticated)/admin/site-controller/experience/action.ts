"use server";


import { getUser } from "@/app/(authenticated)/sessions";
import { deleteImages, uploadFile } from "../project/action";
import prisma from "@/app/lib/db";
import { ExperienceType } from "@/app/types/interfaces";

interface ResponseTypes{
  error?:string
  success?: boolean
  message?:string
}



export async function createExperience(prevState: ResponseTypes, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as keyof typeof ExperienceType;
    const companyName = formData.get("companyName") as string;
    const skills = formData.getAll("skills") as string[];
    const image = formData.get("image") as File;

    // Validate the type against the enum
    if (!Object.values(ExperienceType).includes(ExperienceType[type])) {
      return { success: false, error: "Invalid experience type!" };
    }

    const user = await getUser();
    if (!user) {
      return {
        success: false,
        error: "Failed to get the Author",
        message: null,
      };
    }

    const { fileUrl } = await uploadFile(image);
    if (!fileUrl) {
      return {
        success: false,
        message: null,
        error: "Failed to Upload the Images!",
      };
    }

    // Create experience
    await prisma.experience.create({
      data: {
        company: companyName,
        description: description,
        logo: fileUrl,
        skills: skills,
        type: ExperienceType[type], // Convert string to enum
        title: title,
        author: {
          connect: {
            id: Number(user.userId),
          },
        },
      },
    });

    return { success: true, message: "Experience created successfully!" };
  } catch (error) {
    return {
      success: false,
      message: `Error Message: ${error}`,
      error: `Failed to create an experience; ${error}`,
    };
  }
}




export async function updateExperience(prevState:ResponseTypes, formData:FormData){
  
  try{
    const id = formData.get("id") as string
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as keyof typeof ExperienceType;
    const companyName = formData.get("companyName") as string;
    const skills = formData.getAll("skills") as string[];
    const image = formData.get("image") as File;
    let url = null
    // Validate the type against the enum
    if (!Object.values(ExperienceType).includes(ExperienceType[type])) {
      return { success: false, error: "Invalid experience type!" };
    }
      const { fileUrl } = await uploadFile(image);
      url = fileUrl
 
    await prisma.experience.update({
      where:{
        id:Number(id),
      },
      data: {
        company: companyName,
        description: description,
        logo:url ? url : undefined,
        skills: skills,
        type: ExperienceType[type], // Convert string to enum
        title: title,
      }
    })
    return {
      success:true,
      message:"Experience Updated Successfully",
      error:null,
    }
  }catch(error){
    console.log(`Error Message:${error}`)
   return {
    success:false,
    message:`Error Message: ${error}`,
    error:`Faile to Update; ${error}`,
   }
  }
}


export async function readExperiences(){
  try{
    return await prisma.experience.findMany();

  }catch(error){
    return {
      success:false,
      mesasge:`Error Message: ${error}`,
      error:"Failed to read experiences"
    }
  }
}

export async function deleteExperiences(prevState:ResponseTypes , formData:FormData){
  try{
    const id = formData.get("id") as string
    const FoundExperience = await prisma.experience.findUnique({
      where:{
        id:Number(id),
      }
    })

    if(!FoundExperience){
      return { 
        success:false,
        error:"Experience not Found!",
        message:null,
      }
    }
    const {success} = await deleteImages(FoundExperience?.logo)
    if(success){
    await prisma.experience.delete({
      where:{
        id:FoundExperience?.id,
      }
    })
  }
  return {
    success:true,
    message:"Experience Successfully Deleted!",
    error:null,
  }
  }catch(error){
    return{
      success:false,
      error:"Failed to delete the experience",
      message:`Error Message: ${error}`
    }
  }
}

export async function readUniqueExperience(id:number){
    return await prisma.experience.findUnique({
      where:{
        id:Number(id),
      }
    })
  
   
}

export async function createTech(prevState:ResponseTypes, formData : FormData){
  try{
    const title = formData.get("title") as string
    const image = formData.get("image") as File

    const {success,fileUrl} = await uploadFile(image);

    const user = await getUser();
    if(!user){
      return {
        error:"User not Found",
        success:false,
        message:null,
      }
    }

    if(success && fileUrl){
      await prisma.technologies.create({
        data:{
          title:title,
          Images:fileUrl,
          author:{
            connect:{
              id:Number(user.userId),
            }
          }  
        }
      })
      return {
        success:true,
        message:"Successfully Created Tech!",
        error:null
      }
    }

  }catch(error){
    return { 
      success:false,
      message:`Error Message : ${error}`,
      error:`Failed to create the Technologies!`,
    }
  }
}


export async function readTech(){
  try{
  return await prisma.technologies.findMany();
  }catch(err){
console.log(err)
    return {
      success:false,
      message:null,
      error:"Failed to fetch tech!"
    }
  }
}

export async function deleteTech(prevState:ResponseTypes,formData:FormData){
  try{
    const id = formData.get("id") as string
    const FoundTech = await prisma.technologies.findUnique({
      where:{
        id:Number(id),
      }
    });
    if(!FoundTech){
      return{
        success:false,
        message:null,
        error:"Tech not Found!"
      }
    }
    const {success} = await deleteImages(FoundTech?.Images);
    if(success){
      await prisma.technologies.delete({
        where:{
          id:FoundTech.id,
        }
      })
      return {
        success:true,
        message:"Tech Deleted SuccessFully!",
        error:null,
      }
    }
  }catch(error){
    return { 
      success:false,
      message:`Error Message : ${error}`,
      error:"Failed to delete the Technolgoies"
    }
  }
}