"use server"

import prisma from "../../../lib/db"
import { SignFormSchema } from "../../../lib/definations";
import { hashPassword } from "../../../utils/hasher"
import { createSession } from "../../sessions";

export type SignUpReturn  = {
  error?:string,
  message?:string,
  success?:boolean,
  redirect?:string,
}



// User SignUp
export async function SignUp(
  prevstate:SignUpReturn,
  formData: FormData
){
  

  const userEmail = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!userEmail || !password) {
    return { success: false, message:"User Not Found!" };
  }

  try {
    const result = SignFormSchema.safeParse(Object.fromEntries(formData))

    if(!result.success){
      return{
        success:false,
        error:result.error.flatten().fieldErrors,
      }
    }

    const{email,password} =  result.data
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user_models.create({
    data:{
      email:email,
      password: hashedPassword,
    }
    });
    await createSession(String(user.id));
    return { success: true, message: "User Sucessfully successful",redirect:"/admin/site-controller" };
  } catch (err) {
    console.log("Error while signing in the user:", err);
    return { success: false, error: "Something went wrong, please try again message form catch" };
  }
}


