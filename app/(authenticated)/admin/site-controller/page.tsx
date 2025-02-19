"use server"

import { logout } from "../login/action"

export default async function SiteController(){
 
  return(
   <div>
    <h1 className="text-4xl text-white">This is the Site Controller</h1>
    <form action={logout}>
      <button type="submit" className="text-white bg-red-600 py-3 px-4 rounded-md">Logout</button>
    </form>
   </div>
  )
}