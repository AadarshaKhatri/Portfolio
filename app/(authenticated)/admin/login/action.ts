"use server"
import { createSession, deleteSession } from "../../sessions";
import prisma from "@/app/lib/db"
import { redirect } from "next/navigation"
import { SignFormSchema } from "@/app/lib/definations";
import { comparePassword } from "@/app/utils/hasher";

export type SignInReturn = {
  error?:string,
  message?:string,
  success?:boolean,
  redirect?:string,
}

// UserLogout
export async function logout() {
  deleteSession()
  redirect('/admin/login')
}

// User Login
export async function SignIn(
  prevstate:SignInReturn,
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
    const user = await prisma.user_models.findUnique({
      where: { email: userEmail },
    });



    if (user?.email !== email) {
      return { success: false, error:{
        email:"Invalid Email or Password",
        passowrd:"Invalid Email or password",
      } };
    }

    const PasswrodMatched = await comparePassword(password,user?.password);

    if(!PasswrodMatched){
      return { success: false, error:{
        email:"Invalid Email or Password",
        passowrd:"Invalid Email or password",
      } };
    }
    
    await createSession(String(user.id));
  
    return { success: true, message: "Sign-in successful",redirect:"/admin/site-controller" };
  } catch (err) {
    console.log("Error while signing in the user:", err);
    return { success: false, error: "Something went wrong, please try again message form catch" };
  }
}


