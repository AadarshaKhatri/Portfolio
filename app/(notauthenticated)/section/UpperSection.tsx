"use client"

import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { IoSchoolOutline } from "react-icons/io5";
import { PiBalloon } from "react-icons/pi";
import Feedtabs from "./Feedtabs";
import { useEffect, useState } from "react";
import { UserModel } from "@/app/types/interfaces";
import { getProfile } from "../action";




const UpperSection = () => {
    const [user,setUser] = useState<UserModel>();
    useEffect(() => {
      console.log("Fetching data...");
      async function fetchData() {
        try {
          const UserData = await getProfile();
          setUser(UserData);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      }
      fetchData();
    }, []);

 
  const BioInfo = [
    {
      icon:<CiLocationOn size={20} className="text-primary"/>,
      name: user?.location
    },
    {
      icon:<IoSchoolOutline size={20} className="text-primary"/>,
      name:user?.degree
    },{
      icon:<PiBalloon size={20} className="text-primary"/>,
      name:new Date(user?.born).getFullYear()
    }
  ]





  if(!user){
   return (
    <div>No Data!</div>
   )
  }
  return (
    <section className="overflow-hidden min-h-screen flex justify-center ">
      <div className="w-full max-w-[650px] mx-auto">

        {/* Information */}
        <div className="flex flex-col">

          {/* Background Image Section and Profile Section */}
          <div className="relative pb-5">
            <Image
              src="/assets/Bg.png"
              alt="Background-Image"
              width={1000} 
              height={500} 
              quality={100}
              className="md:w-full md:h-[250px] h-auto object-cover"
            />
            <div className=" relative flex flex-row justify-between mx-4 mt-4">
            {/* Profile Picture */}
            {
              user.profile ? <Image 
              src = {user?.profile}
              alt="Pfp"
              width={100}
              height={100}
              quality={100}
              className="mt-[-80px] w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-red-300 rounded-full  object-cover"
              /> :null
            }
            
              {/* <div className=" mt-[-86px] w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-red-300 rounded-full border-4 border-white">
                
              </div> */}

              {/* Download Button */}
              <div className="">
              <a href="/pdf/Cv.pdf" download>
              <button className="text-white font-comicNeue text-md border border-primary px-4 py-2 rounded-full hover:bg-primary">
                  Download CV
              </button></a>

            </div>
  
            </div>
          </div>

          {/* Personal Information */}
          <div className="flex flex-col mx-4">
            <div className="flex flex-row items-center gap-x-2">
              <h2 className="text-primary text-2xl md:text-4xl font-semibold">{user?.name}</h2>
              <Image
                src="/assets/Code.png"
                alt="Code"
                width={42}
                height={32}
                quality={100}
                className="w-[32px] h-[32px] md:w-[42px] md:h-[42px]"
              />
            </div>

            {/* Role */}
            <h4 className="text-md text-gray-400">{user?.title}</h4>

            {/* Info/Bio */}
            <p className="text-white mt-4">
            {user?.bio}
            </p>

            {/* Icons */}
            <div className="flex flex-row justify-start gap-x-5 mt-4">
              {
                BioInfo.map((ele,index)=>(
                  <div key = {index} className="flex flex-row justify-between items-center gap-x-1 ">
                    <span>{ele.icon}</span>
                    <h4 className="text-gray-400 text-sm md:text-lg">{ele.name}</h4>
                  </div>

                ))
              }
              

            </div>

    


          </div>
        </div>


        <div className="mt-10">
          <Feedtabs/>
        </div>



      </div>
     
    </section>
  );
};

export default UpperSection;
