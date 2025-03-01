"use client"

import { useActionState, useEffect, useState } from "react";
import AddTechDialouge from "../TechStack/AddTechDialouge";
import { deleteTech, readTech } from "../../../../action";
import { TechnologiesModel } from "@/app/types/interfaces";
import Image from "next/image";
import { toast } from "sonner";


const TechStack = () => {
  const[state,action] = useActionState(deleteTech, {
    success: false,
    message: null,
    error: null,
  });
  
  const [techs, setTechs] = useState<TechnologiesModel[]>([]);
  useEffect(() => {
    async function FetchTech() {
        const data  = await readTech(); 
        if(!Array.isArray(data)){
          setTimeout(()=>{
            toast.error(`${data.error}`);
          },0)
          return;
        }
        setTechs(data);
    }
    FetchTech();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (!state?.success && state?.error) {
        toast.error(`${state?.error}`);
      } else if (state?.success && state.message) {
        toast.success(`${state?.message}`);
        setTimeout(()=>{
          window.location.reload();
        },3000)
      }
  
    }, 0);
  }, [state]);
  

  return (
    <section className="w-full container mx-auto">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="w-full flex flex-row justify-between items-center">
          <h4 className="text-primary font-semibold">Technologies Stack</h4>
          <hr className="  md:w-96 border-white right-12"></hr>
          <AddTechDialouge />
        </div>

        {
          
          techs?.length > 0 ?
          <div className="mt-5 flex flex-wrap justify-center gap-10">
          {techs?.map((tech) => (
            <div key={tech.id} className="flex flex-col items-center gap-y-5">
              <Image
                src={tech.Images}
                alt="tech-logo"
                width={42}
                height={42}
                quality={100}
                className="w-[42px] h-[42px]"
              />
              <h4 className=" text-gray-400 font-semibold text-lg">{tech.title}</h4>
              <form action={action}>
                  <input name="id" className="hidden" placeholder="Id" defaultValue={tech.id}/>
                <div className="w-full flex justify-center items-center">
                 <button type="submit" className="text-sm py-2 px-2 bg-red-500 text-white hover:bg-red-800 rounded-md">Delete Tech</button>
                 </div>
              </form>
            </div>
          ))}
        </div>
          :
           <p className="text-lg text-center text-primary">No Tech Found!</p> 
     
        }

       
      </div>
    </section>
  );
};

export default TechStack;
