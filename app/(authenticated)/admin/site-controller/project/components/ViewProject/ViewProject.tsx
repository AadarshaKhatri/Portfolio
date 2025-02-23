"use client" 

import React, { useActionState, useEffect, useState } from 'react'
import { FaEye, FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import { ProjectModel } from '@/app/types/interfaces';
import { deleteProject, ReadProjects } from './action';
import { toast } from 'sonner';
import Link from 'next/link';

 export const ViewProject = () => {
  const [state,action] = useActionState(deleteProject,null)
  const [projects,setProject] = useState<ProjectModel[]>();

  useEffect(()=>{
    setTimeout(()=>{
      if(!state?.success && state?.error){
        toast.error(`${state.error}`)
      }else if(state?.success && state.message){
        toast.success(`${state.message}`);
        window.location.reload();
      }
    },0)
  })

  useEffect(()=>{
    async function fetchProject(){
     const data  = await  ReadProjects();
     setProject(data);
    }
    fetchProject();
    console.log(projects);
  },[])

  if(!projects){
    return <div className='bg-red-200 borer-2 border-rd-800 p-3 rounded-md text-white'><p className='text-md'>No Project Found!</p></div>
  }
  return (
    <div>
      {
        projects.length === 0 ? <div className='bg-red-200 borer-2 border-rd-800 p-3 rounded-md text-white'><p className='text-md'>No Project to List</p></div>:
    <section className='container mx-auto'>
      <div className='flex flex-row justify-center items-start flex-wrap gap-5'>
        {
          projects.map((project,index)=>(
            <section key={index} className="p-5 bg-white/10 rounded-lg">
             <div className="container mx-auto px-2">
               <div className="flex flex-col w-[390px]">
         
         
                 <div className="flex flex-row justify-between pb-6">
                   <h1 className="text-white text-xl font-bold pb-1">{project.title}</h1>
         
                   <div className="flex flex-row gap-5">
                     {
                      project?.codelink ? 
         
                      <a href ={project.codelink} target = "_blank" className="flex flex-row gap-x-2 items-center cursor-pointer">
                      <FaGithub className="text-white" size={24}/>
                        <p className="text-white text-lg">
                         View Code 
                        </p>
                        </a>
                      :
                      null
                     }
         
         {
                      project?.liveLink ? 
                      <a href ={project.liveLink} target = "_blank" className="flex flex-row gap-x-2 items-center cursor-pointer">
                      <FaEye className="text-white" size={24}/>
                        <p className="text-white text-lg">
                         Live 
                        </p>
                        </a>
                      :
                      null
                     }
         
         
               
         
                    
                   </div>
                  
                   
                 </div>
                 
                 {/* Description */}
                 <p className="w-full text-white">{project.description}
                  
                 </p>
                 
           
                 <div className="mt-5 flex flex-shrink flex-row gap-x-5 gap-y-5 flex-wrap pb-10">
                     {
                       project.Skills?.map((element,index)=>(
                         <div key = {index} className="text-primary bg-primary/15 px-3 py-2 rounded-full">
                         {element}
                         </div>
                       ))
                     }   
                  
                       
                </div>
         
                 {/* Images */}
         
                 <div>
                   <Image
                   src={project.Images}
                   alt="Project Display Image"
                   width={1000}
                   height={320}
                   quality={75}
                   className="w-[400px] h-[200px] md:h-[320px] rounded-md object-cover"
                   priority = {true}
                   />
                 </div>
         
               </div>
         
             </div>
              
            <div className='flex flex-row justify-center items-center mt-5 gap-5'>

              {/* Delete Button */}

              <div className='flex'>
                <form action={action}>
                  <input type='text'  name="id" defaultValue={project.id} placeholder='id of the project' className='hidden'/>
                <button className='px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-500/50'>Delete Project</button></form>
              </div>

              {/* Edit Button */}
              <div className='flex'>
                <Link href={`/admin/site-controller/project/${project.id}`}>
                <button className='px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-500/50'>Edit Project</button></Link>

              </div>

            </div>
         
           </section>
          ))
       
        }
             
      </div>
    </section>
      }
    </div>
  )
}

