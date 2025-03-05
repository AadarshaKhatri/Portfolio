"use server"

import prisma from "../../../lib/db"
import { SignFormSchema } from "../../../lib/definations";
import { hashPassword } from "../../../utils/hasher"
import { createSession } from "../../sessions";

export type SignUpReturn  = {
  error:string | null,
  message:string | null,
  success:boolean | null,
  redirect:string | null,
}



// User SignUp
export async function SignUp(
  prevstate:SignUpReturn,
  formData: FormData
){
  

  const userEmail = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!userEmail || !password) {
    return { 
      success: false,
      error:"User Not Found!",
      message:null,
      redirect:null,

     };
  }

  try {
    const result = SignFormSchema.safeParse(Object.fromEntries(formData))

    if(!result.success){
      return{
        message:null,
        redirect:null,
        success:false,
        error:"Invalid Email or Password",
      }
    }

    // =====================Loggin the Errors from the ZOD=================
    // console.log(result?.error?.flatten().fieldErrors);

    const hasUserbeenCreated = await prisma.user_models.count();

    if(hasUserbeenCreated>0){
      return{
        error:"Admin already exists",
        message:null,
        redirect:null,
        success:false,
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
    await createSession(String(user.id),String(user.name));
    return { 
      success: true,
      message: "User Created Successful",
      redirect:"/admin/site-controller",
      error:null,
       };

  } catch (error) {
    // console.log("Error while signing in the user:", err);
    return { 
      success: false,
       error: "Something went wrong, please try again message form catch",
       message:error,
       redirect:null,
       };
  }
}


