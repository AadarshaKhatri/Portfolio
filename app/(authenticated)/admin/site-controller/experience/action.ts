"use server";


import { getUser } from "@/app/(authenticated)/sessions";
import { deleteImages, uploadFile } from "../project/action";
import prisma from "@/app/lib/db";
import { ExperienceModel, ExperienceType, ResponseTypes } from "@/app/types/interfaces";



export async function createExperience(prevState: ResponseTypes, formData: FormData): Promise<ResponseTypes> {
  try {
    // Extract form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;  // Get the string value of type from the form
    
    // Validate the type against the ExperienceType enum
    const experienceType = ExperienceType[type as keyof typeof ExperienceType];
    
    if (!experienceType) {
      return { success: false, error: "Invalid experience type!" };
    }
  

    const companyName = formData.get("companyName") as string;
    const skills = formData.getAll("skills") as string[];
    const image = formData.get("image") as File;

    // Get user
    const user = await getUser();
    if (!user) {
      return { success: false, error: "Failed to get the Author", message: null };
    }

    // Upload image
    const { fileUrl } = await uploadFile(image);
    if (!fileUrl) {
      return { success: false, message: null, error: "Failed to Upload the Image!" };
    }

    // Create experience record in Prisma
    await prisma.experience.create({
      data: {
        company: companyName,
        description: description,
        logo: fileUrl,
        skills: skills,
        type: experienceType, // Pass the mapped enum value to Prisma
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






export async function updateExperience(prevState:ResponseTypes, formData:FormData) : Promise<ResponseTypes> {
  
  try{
    const id = formData.get("id") as string
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const experienceType = ExperienceType[type as keyof typeof ExperienceType];
    const companyName = formData.get("companyName") as string;
    const skills = formData.getAll("skills") as string[];
    const image = formData.get("image") as File;
    let url = null
    // Validate the type against the enum
    if (!experienceType) {
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
        type:experienceType, // Convert string to enum
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
    error:`Failed to Update; ${error}`,
   }
  }
}


export async function readExperiences() : Promise<ExperienceModel []>{
  try{
    return await prisma.experience.findMany() as ExperienceModel[];
  }catch(error){
    console.log(error);
    return []
  }
}

export async function deleteExperiences(prevState:ResponseTypes , formData:FormData) : Promise<ResponseTypes> {
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

export async function createTech(prevState:ResponseTypes, formData : FormData) : Promise<ResponseTypes> {
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
    return {
      success:false,
      message:`Error Message:${err}`,
      error:"Failed to fetch tech!"
    }
  }
}

export async function deleteTech(prevState:ResponseTypes,formData:FormData) : Promise<ResponseTypes> {
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
      error:"Failed to delete the Technologies"
    }
  }
}


export async function createLang(prevState:ResponseTypes,formData:FormData) : Promise<ResponseTypes> {
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
      await prisma.languages.create({
        data:{
          lang:title,
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
        message:"Successfully Created Language!",
        error:null
      }
    }

  }catch(error){
    return {
      success:false,
      error:`Failed to create the Language`,
      message:`Error Message:${error}`,
    }
  }
}

export async function readLang(){
  try{
  return await prisma.languages.findMany();
  }catch(err){
    return {
      success:false,
      message:`Error Message:${err}`,
      error:"Failed to fetch Languages!"
    }
  }
}

export async function deleteLang(prevState:ResponseTypes,formData:FormData) : Promise<ResponseTypes> {
  try{
    const id = formData.get("id") as string
    const FoundLang = await prisma.languages.findUnique({
      where:{
        id:Number(id),
      }
    });
    if(!FoundLang){
      return{
        success:false,
        message:null,
        error:"Tech not Found!"
      }
    }
    const {success} = await deleteImages(FoundLang?.Images);
    if(success){
      await prisma.languages.delete({
        where:{
          id:FoundLang.id,
        }
      })
      return {
        success:true,
        message:"Language Deleted SuccessFully!",
        error:null,
      }
    }
  }catch(error){
    return { 
      success:false,
      message:`Error Message : ${error}`,
      error:"Failed to delete the Language"
    }
  }
}