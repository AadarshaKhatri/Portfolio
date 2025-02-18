"use server"
import { createSession, deleteSession } from "./sessions"
import { redirect } from "next/navigation"
import prisma from "@/app/lib/db"

type SignInResponse = {
  success: boolean;
  message?: string;
  error?: string;
};


// UserLogout
export async function logout() {
  deleteSession()
  redirect('/login')
}


export async function SignIn(
  prevState: SignInResponse | null,
  formData: FormData
): Promise<SignInResponse> {
  console.log("Sign API Hit!");

  const userEmail = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!userEmail || !password) {
    return { success: false, error: "Email and password are required" };
  }

  try {
    const user = await prisma.user_models.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return { success: false, error: "Invalid credentials" };
    }

    await createSession(user.email);
    return { success: true, message: "Sign-in successful" };
  } catch (err) {
    console.error("Error while signing in the user:", err);
    return { success: false, error: "Something went wrong, please try again" };
  }
}


