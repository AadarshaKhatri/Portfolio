"use server";

import { supabase } from "@/app/lib/supabase";  
import { getUser } from "@/app/(authenticated)/sessions";
import prisma from "@/app/lib/db";

interface createProjectResponse {
  error?: string;
  message?: string;
  success?: boolean;
}
interface uploadFileResponse {
  error?: string;
  message?: string;
  success?: boolean;
  fileUrl?: string;  // URL of the uploaded image
}

export async function createProject(
  prevState: createProjectResponse,
  formData: FormData
) { 
  try {
    console.log("Form Data:",formData)
    const name = formData.get("name") as string;
    const skills = formData.getAll("skills") as string[];
    const description = formData.get("description") as string;
    const liveLink = formData.get("liveLink") as string;
    const codeLink = formData.get("codelink") as string;
    const image = formData.get("image") as Blob;
    // if(!name || skills.length === 0 || !description  || !liveLink || !codeLink || !image){
    //   return {
    //     success:false,
    //     error:"Please fill in all the fields!",
    //     message:null,

    //   }
    // }
    const {fileUrl,success,error} = await uploadFile(image)
    console.log(await uploadFile(image));

    if(!success && error){
      console.log("Didn't recevied anything")
      return{
        error:error,
        success:false,
      }
    }
    if(!fileUrl){
      return{
        error:"Error Uploading the File",
        success:false,
      }
    }
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        error: "User not authenticated",
        message: null,
      };
    }
    const { userId, userName } = user;

    if (!userId || !userName) {
      return {
        success: false,
        error: "User ID or username is missing",
        message: null,
      };
    }


    // Proceed with project creation
    const createProject = await prisma.projects.create({
      data: {
        codelink: codeLink,
        title: name,
        description: description,
        liveLink: liveLink,
        Skills: skills,
        Images: fileUrl,
        author: {
          connect: { id: userId },  // Connect to User_models using userId
        },
      },
    });

    if (!createProject) {
      return {
        success: false,
        error: "Failed to Create Project!",
        message: null,
      };
    }
    return {
      success: true,
      message: "Project created successfully!",
      error: null,
    };
  } catch (err) {
 
    return {
      success: false,
      error: "Failed to Create Project!",
      message: err,
    };
  }
}

async function uploadFile(File:Blob):Promise<uploadFileResponse>{
  console.log("File Upload Hit!")
  try {
    if (!File) {
      console.log("No Filed Uploaded")
      return {
        success: false,
        error: "No file uploaded!",
      };
    }

    const fileName = `${Date.now()}_${File.name}`;

    const { data, error } = await supabase.storage
      .from("images")  // Specify the bucket name (ensure the bucket is public)
      .upload(`public/${fileName}`, File, {
        cacheControl: "3600",  // Optional: cache the file for 1 hour
        upsert: false,  // Do not overwrite the file if it already exists
      });

    // Handle any errors during the upload
    if (error) {
      return {
        success: false,
        error: `Failed to upload image: ${error.message}`,
      
      };
    }
    const url = supabase.storage.from("images").getPublicUrl(data.path);
    if(!url){
      console.log("Not Received")
      return {
        success:false,
        error:"no url"
      }
    }
    return {
      success: true,
      message: "File uploaded successfully!",
      fileUrl: url,
    };
  } catch (error) {
    console.log("Error Uploading from catch block",error)
    return {
      success: false,
      error: "Failed to upload file!",
    };
  }

}

