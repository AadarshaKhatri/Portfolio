"use client";

import { ExperinceModel } from "@/app/types/interfaces";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { deleteExperiences, readExperiences } from "../../action";
import Link from "next/link";
import { toast } from "sonner";
import Technologies from "../Technologies/Technologies";

const ViewExperience = () => {
  const [state,action] = useActionState(deleteExperiences,{
    success:false,
    error:null,
    message:null,
  });

  const [experiences, setExperiences] = useState<ExperinceModel[]>([]);

  useEffect(() => {
    async function FetchData() {
      const data = await readExperiences();
      if(!Array.isArray(data)){
        setTimeout(()=>{
          toast.error(`${data.error}`);
        })
        return;
      }
      setExperiences(data);
    }
    FetchData();
  }, []);

  useEffect(()=>{
    setTimeout(()=>{
      if(!state?.success && state?.error){
        toast.error(`${state.error}`)
      }else if(state?.success && state.message){
        toast.success(`${state.message}`);
        setTimeout(()=>{
          window.location.reload();
        },3000)
      }
    },0)
   
  },[state])
  return (
    <section className="w-[800px] py-10">
      <div className="flex flex-col">
        <Technologies/>
      </div>
      <div className="max-w-4xl mx-auto px-5">
        <div className="flex flex-col gap-10">
          <h2 className="text-primary font-semibold">Your Experiences</h2>
          {experiences?.map((experience, index) => (
            <section key={index} className="border-l-4 border-primary bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Image */}
                {experience.logo && (
                  <Image
                    priority
                    src={experience.logo}
                    width={80}
                    height={80}
                    alt="Company Logo"
                    className="w-[80px] h-[80px] rounded-full object-cover border border-gray-700"
                    
                  />
                )}

                {/* Experience Details */}
                <div className="flex flex-col">
                  <h2 className="text-xl sm:text-2xl text-white font-bold">{experience.title}</h2>
                  {experience.type === "INTERNSHIP" ? (
                    <h4 className="text-md text-primary font-semibold">Intern</h4>
                  ) : null}
                  {experience.type === "WORK" ? (
                    <h4 className="text-md text-primary font-semibold">Dev</h4>
                  ): null}
                  {experience.type === "COMMUNITY_HOURS" ? (
                    <h4 className="text-md text-primary font-semibold">Volunter (Community Service)</h4>
                  ):null}
                  <h6 className="text-sm text-gray-400">{experience.company}</h6>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-gray-300 leading-relaxed">{experience.description}</p>

              {/* Skills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {experience.skills.map((skill : string, index:number) => (
                  <span key={index} className="text-primary bg-primary/20 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>


              <div className='flex flex-row justify-center items-center mt-5 gap-5'>

                  {/* Delete Button */}

                  <div className='flex'>
                    <form action={action}>
                      <input type='text'  name="id" defaultValue={experience.id} placeholder='id of the experience' className='hidden'/>
                    <button className='px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-500/50'>Delete Experiencce</button></form>
                  </div>

                  {/* Edit Button */}
                  <div className='flex'>
                    <Link href={`/admin/site-controller/experience/${experience.id}`}>
                    <button className='px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-500/50'>Edit Experience</button></Link>

                  </div>

                </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewExperience;
