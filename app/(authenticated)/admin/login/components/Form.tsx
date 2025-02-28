"use client";
import { useActionState, useEffect } from "react";
import { SignIn } from "../action";
import { redirect } from "next/navigation";
import {toast} from "sonner"




export default function LoginForm() {
  const [state, action] = useActionState(SignIn, null);

  useEffect(() => {
    if (state?.success === true && state.redirect) {
      setTimeout(() => {
        toast.success(`${state.message}`);
        redirect(state.redirect);
      }, 0);
    } else if (state?.success === false && state.error) {
      setTimeout(()=>{
        toast.error(`${state?.error}`);
      },0)
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl text-white font-semibold">Welcome Back, Aadarsha Khatri</h1>
          <p className="text-lg text-gray-400">Enter your credentials and login to your account.</p>
        </div>

        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-white block text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-white block text-sm font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              
            />
          </div>

          <div className="text-center flex justify-center items-center">
            <button className="w-full mt-4 py-4 px-4 bg-primary hover:bg-blue-700 text-white font-semibold rounded-md transition">
             Log In
            </button>
          </div>

          
        </form>
      </div>
    </div>
  );
}
