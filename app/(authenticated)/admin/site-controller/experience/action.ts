import { uploadFile } from "../project/action";
import prisma from "@/app/lib/db";
import { ExperienceType } from "@/app/types/interfaces";

interface ResponseTypes{
  error?:string
  success?: boolean
  message?:string
}



export async function createExperience(prevState: ResponseTypes, formData: FormData) {
  console.log("Form Data:", formData)
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const companyName = formData.get("companyName") as string;
    const skills = formData.getAll("skills") as string[];
    const image = formData.get("image") as File;

    // Validate if the type exists in the enum
    if (!Object.values(ExperienceType).includes(type as ExperienceType)) {
      return { success: false, error: "Invalid experience type!" };
    }

    // Upload file and get URL
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
        type: type as ExperienceType, // Convert type to Prisma Enum
        title: title,
      },
    });

    return { success: true, message: "Experience created successfully!" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: `Error Message: ${error}`,
      error: "Failed to create an experience",
    };
  }
}

// export async function updateExperience(prevState:ResponseTypes, formData:FormData){

//   try{

//   }catch(error){
//    return {
//     success:false,
//     message:`Error Message: ${error}`,
//     error:"Failed to create a experience "
//    }
//   }
// }


// export async function readExperiences(){
//   try{

//   }catch(error){
//     return {
//       success:false,
//       mesasge:`Error Message: ${error}`,
//       error:"Failed to read experiences"
//     }
//   }
// }

// export async function deleteExperiences(id:number){
//   try{

//   }catch(error){
//     return{
//       success:false,
//       error:"Failed to delete the experience",
//       message:`Error Message: ${error}`
//     }
//   }
// }

// export async function readUniqueExperience(id:number){
//   try{
    
//   }catch(error){
//     return { 
//       success:false,
//       error:"Failed to read the experience",
//       message:`Error Message: ${error}`
//     }
//   }
// }

// export async function createTech(prevState:ResponseTypes, formDat : FormData){
//   try{

//   }catch(error){
//     return { 
//       success:false,
//       message:`Error Message : ${error}`,
//       error:"Failed to create the Technologies",
//     }
//   }
// }


// export async function deleteTech(id:number){
//   try{

//   }catch(error){
//     return { 
//       success:false,
//       message:`Error Message : ${error}`,
//       error:"Failed to delete the Technolgoies"
//     }
//   }
// }