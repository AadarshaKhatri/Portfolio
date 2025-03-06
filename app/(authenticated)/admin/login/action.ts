"use server"
import { createSession, deleteSession } from "../../sessions";
import prisma from "@/app/lib/db"
import { redirect } from "next/navigation"
import { SignFormSchema } from "@/app/lib/definations";
import { comparePassword } from "@/app/utils/hasher";

export type SignInReturn = {
  error?:string | null,
  message?:string | null,
  success?:boolean,
  redirect?:string | null,
} | undefined

// UserLogout
export async function logout() {
  deleteSession()
  
  redirect('/admin/login')
}

// User Login
export async function SignIn(
  prevstate:SignInReturn,
  formData: FormData
): Promise<SignInReturn>{
  const userEmail = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!userEmail || !password) {
    return { success: false, error:"User Not Found!" };
  }

  try {
    const result = SignFormSchema.safeParse(Object.fromEntries(formData))

    if(!result.success){
      return{
        success:false,
        redirect:null,
        message:null,
        error:'Invalid Email or Password',
      }
    }

    const{email,password} =  result.data
    const user = await prisma.user_models.findUnique({
      where: { email: userEmail },
    });



    if (user?.email !== email) {
      return { 
        message:null,
        redirect:null,
        success: false,
        error:"Email or Password is incorrect",

      }
    }

    const PasswrodMatched = await comparePassword(password,user?.password);

    if(!PasswrodMatched){
      return { success: false,error:"Email or Password is Incorrect",message:null,
        redirect:null,
       };
    }
    
    await createSession(String(user.id),String(user.name));
  
    return { success: true, message: "User Logged In Successfully",redirect:"/admin/site-controller",error:null, };
  } catch (err) {
    console.log("Error while signing in the user:");
    console.log(`Error Message:${err}`);
    return { success: false, error: "Something went wrong",message:String(err),redirect:null };
  }
}


