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
  fileUrl?: string; // URL of the uploaded image
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
      error: "Failed to upload file!",
    };
  }
}

export async function createProject(
  prevState: createProjectResponse,
  formData: FormData
) {
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
    const createdProject = await prisma.projects.create({
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
      error: `Failed to Create the Project`,
    };
  }
}
