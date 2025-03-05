"use client";
import { useActionState, useEffect } from "react";
import { SignUp } from "../action";
import { redirect } from "next/navigation";
import {  toast } from 'sonner';

export type SignUpReturn  = {
  error:string | null,
  message:string | null,
  success:boolean | null,
  redirect:string | null,
}

const initialState:SignUpReturn = {
  error:null,
  message:null,
  success:null,
  redirect:null,
}
export const SignUpForm = ()=>{
    const [state, action] = useActionState(SignUp,initialState);
      useEffect(() => {
        if (state?.success === true && state.redirect) {
          setTimeout(() => {
            toast.success(`${state.message}`);
            redirect(state.redirect);
          }, 0);
        } else if (state?.success === false && state.error) {
          setTimeout(()=>{
            toast.error(`${state?.error}`);
          })
        }
      }, [state]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl text-white font-semibold">Create a Admin Here</h1>
          <p className="text-lg text-gray-400">You really thouught you can create an account.😂😂</p>
        </div>

        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-white block text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              required
            />
       
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-white block text-sm font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              required
            />
         
          </div>

          <div className="text-center flex justify-center items-center">
            <button className="w-full mt-4 py-4 px-4 bg-primary hover:bg-blue-700 text-white font-semibold rounded-md transition">
             SignUP
            </button>
          </div>


          
        </form>
      </div>
    </div>
  );
}