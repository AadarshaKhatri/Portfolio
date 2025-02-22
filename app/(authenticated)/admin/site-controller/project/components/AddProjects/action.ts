"use server";

import { getUser } from "@/app/(authenticated)/sessions";
import prisma from "@/app/lib/db";

interface createProjectResponse {
  error?: string;
  message?: string;
  success?: boolean;
}

export async function createProject(
  prevState: createProjectResponse,
  formData: FormData
) { 
  try {
    const name = formData.get("name") as string;
    const skills: string[] = formData.getAll("skills[]") as string[];
    const description = formData.get("description") as string;
    const liveLink = formData.get("liveLink") as string;
    const codeLink = formData.get("codelink") as string;
    const image = formData.get("image") as string;

    if(!name || !skills || !description  || !liveLink || !codeLink || !image){
      return {
        success:false,
        error:"Please fill in all the fields!",
        message:null,

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
        Images: image,
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
