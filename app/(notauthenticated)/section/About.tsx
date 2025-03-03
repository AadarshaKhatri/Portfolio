"use client";
import Image from "next/image"
import { useEffect, useState } from "react"
import { getLanguages, getProfile, getTechnologies } from "../action"
import { LanguagesModel, TechnologiesModel, UserModel } from "../../types/interfaces";

const About = () => {
  const [tech,setTechs] = useState<TechnologiesModel []>();
  const [lang,setLang] = useState<LanguagesModel []>();
  const [user,setUser] = useState<UserModel>();
  useEffect(() => {
    console.log("Fetching data...");
    async function fetchData() {
      try {
        const techData = await getTechnologies();
        console.log("Tech Data:", techData);
        setTechs(techData);
  
        const langData = await getLanguages();
        console.log("Lang Data:", langData);
        setLang(langData);


        const userData = await getProfile();
        setUser(userData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);


  console.log(user);
  console.log("Tech Stack",tech);



  return (
    <section className="py-8">
      <div className="container mx-auto px-6 md:px-0">
        <div className="flex flex-col space-y-5">
            <h2 className="font-comicNeue text-4xl font-semibold text-primary mb-3">Tech Stack</h2>
            <p className="text-white text-md">I bring the expertise and the tools to build success. Here’s my developer’s toolkit for making an impact..</p> 

            {/* Tech Stack Images */}
            <div className="grid  grid-cols-3 md:grid-cols-6 gap-y-12 py-8">
            {
              tech?.map((tech : TechnologiesModel)=>(
                <div key={tech.id} className="flex flex-col items-center gap-y-5">
                  <Image 
                  src = {tech.Images}
                  alt = "tech-logo"
                  width={42}
                  height={42}
                  quality={100}
                  className="w-[42px] h-[42px]"
                  />
                  <h4 className=" text-gray-400 font-semibold">{tech.title}</h4>
                </div>
              ))
            }

            </div>


            {/* Languages  */}
            <div className="py-4">
              <h2 className="font-comicNeue text-2xl text-center  text-primary mb-5">Languages</h2>

              <div className="grid items-center  grid-cols-3 md:grid-cols-4 gap-y-12 py-2">
              {
                lang?.map((language)=>(
                  <div key={language.id} className="flex flex-col items-center gap-y-5">
                    <Image 
                    src = {language.Images}
                    alt = "tech-logo"
                    width={42}
                    height={42}
                    quality={100}
                    />
                    <h4 className="text-gray-400 font-semibold">{language.lang}</h4>
                  </div>
                ))
              }

              </div>
            </div>


            <div>
              <h2 className="text-gray-400 text-sm mb-5">Want to know more about me?</h2>
                {/* Text Information */}
              <div>
                <h5 className="text-white mb-5">{user?.description}</h5>
              </div>

            </div>

        </div>
      </div>

    </section>
  )
}

export default About