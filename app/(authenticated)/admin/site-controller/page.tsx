"use server"

import AccoutnStatus from "./components/AccountStatus/Account_Status"
import NavigationBar from "./components/Navigation/Navigation"

export default async function SiteController(){
 
  return(
   <div>
    <NavigationBar/>
    <AccoutnStatus/>



   
   </div>
  )
}