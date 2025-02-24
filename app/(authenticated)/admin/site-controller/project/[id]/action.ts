"use server";
import prisma from "@/app/lib/db";
import { uploadFile } from "../components/AddProjects/action";

interface EditProjectTypes {
   error?:string
   message?:string,
   success:boolean
}
export async function GetUniqueProject(id:number){
  return await prisma.projects.findUnique({
    where:{
      id:id,
    }
  })
}


export async function EditProject(prevState:EditProjectTypes,formData:FormData){
  console.log("Edit Project Hit!");
  console.log("Form Data:",formData);

  try{
    const id = formData.get("id") as string
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const codeLink = formData.get("codelink") as string;
    const liveLink  = formData.get("liveLink") as string;
    const skills = formData.getAll("skills[]") as string[];
    const images = formData.get("images") as File;
    console.log("Value of Images::",images);
    let url = null

    // Condition to Upload to bucket if the User as Uploaded the Image
    if(images !== null){
    
    const { fileUrl, success, error } = await uploadFile(images);
    if (!success || !fileUrl || error) {
      return {
        error: "Error Uploading the File",
        success: false,
      };
    }
    url = fileUrl
    if(!url){
      return {
        success:false,
        error:"Couldn't Upload the Image",
      }
    }
    }

    const project = await prisma.projects.findUnique({
      where:{
        id:Number(id),
      }
    });
    console.log(`${project?.Images}`);
   const updateProject = await prisma.projects.update({
    where:{
      id:Number(id),
    },
    data:{
      title:title,
      description:description,
      codelink:codeLink,
      liveLink:liveLink,
      Skills:skills,
      Images:url? url: undefined,

    }
   })
   return { 
    success:true,
    message:"Project Updated Successfully",
    error:null,
   }
  }
  catch(error){
    console.log(`${error}`);
    return{
      message:null,
      error:`${error}`, 
      success:false,
    }
  }
}