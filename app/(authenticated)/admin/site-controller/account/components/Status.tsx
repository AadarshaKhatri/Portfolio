"use client"

import {  useEffect, useState } from "react"
import { BsFilePost, BsViewStacked } from "react-icons/bs"
import { FaHouse } from "react-icons/fa6"
import { MdWorkspacePremium } from "react-icons/md"
import { getExperienceCount, getPostCount, getProjectCount, getTechStackCount } from "../action"


const Status = () => {
  const [ project, setProject] = useState<number>();
  const [ experience, setExperience] = useState<number>();
  const [ tech, setTech] = useState<number>();
  const [ post, setPost] = useState<number>();

  useEffect(()=>{
    async function fetchData(){
      setProject(await getProjectCount());
      setPost(await getPostCount());
      setExperience(await getExperienceCount());
      setTech(await getTechStackCount());
    }
    fetchData();
  },[])



  const datas = [ 
    {
      name:"Total Projects",
      value:project,
      icon:<MdWorkspacePremium size={24} className="text-primary"/>
    },
    {
      name:"Total Posts",
      value:post,
      icon:<BsFilePost size={24} className="text-primary"/>
    },
    {
      name:"Total Tech Stack",
      value:tech,
      icon:<BsViewStacked size={24} className="text-primary"/>
    },
    {
      name:"Total Companies",
      value:experience,
      icon:<FaHouse size={24} className="text-primary"/>
    }
  ]

  return (

      <section>
        <div className="flex flex-row justify-center items-center gap-6">

        {
          datas.map((data,index)=>(
        <div key={index} className="w-[220px] h-[120px] border-2 border-primary rounded-md flex flex-col justify-between items-start p-4 bg-gradient-to-br from-[#01071D] to-[#0A0D2E] shadow-lg">
          {/* Header Section */}
          <div className="flex flex-row justify-between items-center w-full mb-4">
            <div>
              <h2 className="text-primary text-sm font-semibold">{data.name}</h2>
            </div>
            <div className="flex items-center gap-2">
              {data.icon}
            </div>
          </div>

      {/* Projects Count Section */}
          <div>
            <h2 className="text-white font-semibold text-3xl">{data.value}</h2>
          </div>
        </div>

          ))
        }
        </div>
        </section>


  )
}

export default Status