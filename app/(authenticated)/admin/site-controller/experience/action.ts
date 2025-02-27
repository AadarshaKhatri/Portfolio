import { boolean } from "zod"

interface ResponseTypes{
  error?:string
  success?: boolean
  message?:string
}

export async function createExperience(prevState:ResponseTypes, formData:FormData){

  try{

  }catch(error){
   return {
    success:false,
    message:`Error Message: ${error}`,
    error:"Failed to create a experience "
   }
  }
}

export async function updateExperience(prevState:ResponseTypes, formData:FormData){

  try{

  }catch(error){
   return {
    success:false,
    message:`Error Message: ${error}`,
    error:"Failed to create a experience "
   }
  }
}


export async function readExperiences(){
  try{

  }catch(error){
    return {
      success:false,
      mesasge:`Error Message: ${error}`,
      error:"Failed to read experiences"
    }
  }
}

export async function deleteExperiences(id:number){
  try{

  }catch(error){
    return{
      success:false,
      error:"Failed to delete the experience",
      message:`Error Message: ${error}`
    }
  }
}

export async function readUniqueExperience(id:number){
  try{
    
  }catch(error){
    return { 
      success:false,
      error:"Failed to read the experience",
      message:`Error Message: ${error}`
    }
  }
}

export async function createTech(prevState:ResponseTypes, formDat : FormData){
  try{

  }catch(error){
    return { 
      success:false,
      message:`Error Message : ${error}`,
      error:"Failed to create the Technologies",
    }
  }
}


export async function deleteTech(id:number){
  try{

  }catch(error){
    return { 
      success:false,
      message:`Error Message : ${error}`,
      error:"Failed to delete the Technolgoies"
    }
  }
}