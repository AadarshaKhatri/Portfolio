"use server"

import { supabase } from "@/app/lib/supabase";
import { getUser } from "@/app/(authenticated)/sessions";
import prisma from "@/app/lib/db";
import { ProjectModel, ResponseTypes } from "@/app/types/interfaces";





interface uploadFileResponse{
  fileUrl?:string
  success?:boolean,
  error?:string
  message?:string
}





export async function GetUniqueProject(id:number) : Promise<ProjectModel | null>{
 return await prisma.projects.findUnique({
   where:{
     id:id,
   }
 })
}


export async function EditProject(prevState:ResponseTypes,formData:FormData) : Promise<ResponseTypes>{
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


  await prisma.projects.update({
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

// =================== Function to Upload the File ====================
export async function uploadFile(file: File): Promise<uploadFileResponse> {

  try {
    if (!file) {
      return {
        success: false,
        error: "No file uploaded!",
      };
    }


    const fileName = `${Date.now()}_${file.name}`;

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from("images") // Ensure this bucket exists in Supabase
      .upload(`public/${fileName}`, file, {
        cacheControl: "3600",
        upsert: false,
        contentType:file.type
      });

    if (error) {
      return {
        success: false,
        error: `Failed to upload image`,
      };
    }

    // Get public URL
    const url = supabase.storage.from("images").getPublicUrl(data.path);

    if (!url) {
      return {
        success: false,
        error: "Error retrieving file URL",
      };
    }
    return {
      success: true,
      message: "File uploaded successfully!",
      fileUrl: url.data.publicUrl,
    };
  } catch (err) {
    return {
      success: false,
      message:`Error Message:${err}`,
      error: "Failed to upload file!",
    };
  }
}

export async function createProject(prevState:ResponseTypes,formData: FormData) : Promise<ResponseTypes> {
  try {
    const name = formData.get("title") as string;
    const skills = formData.getAll("skills") as string[];
    const description = formData.get("description") as string;
    const liveLink = formData.get("liveLink") as string;
    const codeLink = formData.get("codelink") as string;
    const image = formData.get("image") as File; // Ensure it's a File

    if (!image || !(image instanceof File)) {
      return {
        error: "Invalid file uploaded",
        success: false,
      };
    }

    // Upload the file
    const { fileUrl, success, error } = await uploadFile(image);

    if (!success || !fileUrl || error) {
      return {
        error: "Error Uploading the File",
        success: false,
      };
    }

    const user = await getUser();
    if (!user) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const { userId, userName } = user;
    if (!userId || !userName) {
      return {
        success: false,
        error: "User ID or username is missing",
      };
    }

    // Store project details in the database
     await prisma.projects.create({
      data: {
        codelink: codeLink,
        title: name,
        description: description,
        liveLink: liveLink,
        Skills: skills,
        Images: fileUrl, // Store uploaded image URL
        author: {
          connect: { id: Number(userId) }, // Connect to User_models using userId
        },
      },
    });

 
    return {
      success: true,
      error:null,
      message: "Project created successfully!",
    };
  } catch (err) {
    return {
      success: false,
      error: `Failed to Create the Project, ${err}`,
      message:`Error Message:${err}`
    };
  }
}



export async function ReadProjects(){
  try{
  return await prisma.projects.findMany();
}catch(error){
  return {
    success:false,
    mesasge:`Error Message: ${error}`,
    error:"Failed to read experiences"
  }
}
}

export async function deleteProject(prevState:ResponseTypes,formData:FormData) : Promise<ResponseTypes>{
  try{
    const id = formData.get("id") as string;
    const FoundProject = await prisma.projects.findUnique({
      where:{
        id:Number(id),
      }
    })
    
    if(!FoundProject){
      return {
        success:false,
        error:"Project Not Found!",
        message:null,
      }
    }
    const {success} = await deleteImages(FoundProject?.Images)

    if(success){
      await prisma.projects.delete({
       where:{
         id:Number(id),
       }
     })
    }

    return {
      success:true,
      message:"Project Deleted!",
      error:null
    }

  }catch(err){
    return{
      success:false,
      message:`Error Message:${err}`,
      error:"Failed to Delete the Project",
    }
  }
}


export async function deleteImages(imageUrl: string) {
  try {
    // Ensure the image URL starts with the correct prefix and decode the URL
    const decodedImageUrl = decodeURIComponent(imageUrl);
    const imagePath = decodedImageUrl.split('/public/images/')[1];  // Extract the image path after /public/images/

    console.log("Decoded Image Url Being Deleted:", imagePath);

    // Log the image path to verify it's correct
    if (!imagePath) {
      return {
        success: false,
        error: "Invalid image URL",
        message: "Failed to extract a valid image path from the URL",
      };
    }

    // Try to remove the image from the storage bucket
    const { error } = await supabase.storage.from("images").remove([`${imagePath}`]);

    // Check if there is an error during the remove operation
    if (error) {
      return {
        success: false,
        error: error.message,
        message: `Failed to delete the image: ${error.message}`,
      };
    }

    // If data is returned, the image has been successfully deleted
    return {
      success: true,
      message: "Image deleted successfully",
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      message: `Error Message: ${err}`,
      error: "Error Deleting the Image",
    };
  }
}
