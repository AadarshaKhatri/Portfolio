"use server"

import prisma from "@/app/lib/db";
import { SignFormSchema } from "@/app/lib/definations";
import { CreateSession } from "@/app/lib/session";
import { ActionStateTypes } from "@/app/types/interfaces";
import { comparePassword } from "@/app/utils/hasher";



export async function signIn(state : ActionStateTypes,formData : FormData) {
  console.log("Sign In Action Hit!")
  try{
    const validateResult = SignFormSchema.safeParse({
      email:formData.get("email"),
      password:formData.get("password")
    })

    if(!validateResult.success){
      return {
        errors: validateResult.error.flatten().fieldErrors,
      }
     
    }
    const{email,password} = validateResult.data;
   
     const user = await prisma.User_models.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        error: "Incorrect Email or Password",
      };
    }

    const isPasswordValid = comparePassword(password, user.password);
    console.log(isPasswordValid)
    
    if (!isPasswordValid) {
      return {
        error: "Incorrect Email or Password",
      };
    }
    
    await CreateSession(email);

  }catch(err){
    console.log(`Error Message: ${err.message}`)
    console.log("Failed to log In",err)
  }finally{
    return{
      pending:false,
    }
  }
  
}