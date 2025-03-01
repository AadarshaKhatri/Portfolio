"use client";
import { LanguagesModel } from "@/app/types/interfaces";
import { deleteLang, readLang } from "../../../../action";
import AddLangDialouge from "./AddLangDialogue"
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

const LangStack = () => {
  const[state,action] = useActionState(deleteLang,null);
  
  const [langs, setLangs] = useState<LanguagesModel []>([]);
  useEffect(() => {
    async function FetchTech() {
        const data : LanguagesModel[] = await readLang();
        setLangs(data);
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
      <div className="flex flex-col justify-center items-center gpa-5">

      
     <div className="w-full flex flex-row justify-between items-center">
      <h4 className="text-primary font-semibold">Languages Stack</h4>
        <hr className="md:w-96 border-white right-12"></hr>
          <AddLangDialouge/>
      </div>

       {
                
              langs?.length > 0 ?
                <div className="mt-5 flex flex-wrap justify-center gap-10">
                {langs?.map((language) => (
                  <div key={language.id} className="flex flex-col items-center gap-y-5">
                    <Image
                      src={language.Images}
                      alt="language-logo"
                      width={42}
                      height={42}
                      quality={100}
                      className="w-[42px] h-[42px]"
                    />
                    <h4 className=" text-gray-400 font-semibold text-lg">{language.lang}</h4>
                    <form action={action}>
                        <input name="id" className="hidden" placeholder="Id" defaultValue={language.id}/>
                      <div className="w-full flex justify-center items-center">
                       <button type="submit" className="text-sm py-2 px-2 bg-red-500 text-white hover:bg-red-800 rounded-md">Delete language</button>
                       </div>
                    </form>
                  </div>
                ))}
              </div>
                :
                 <p className="text-lg text-center text-primary">No language Found!</p> 
           
              }
      </div>

    </section>
  )
}

export default LangStack