"use client";
import Image from "next/image"
import { useEffect, useState } from "react"
import { getTechnologies } from "../(notauthenticated)/action,";
import { TechnologiesModel } from "../types/interfaces";

const About = () => {
  const [tech,setTechs] = useState<TechnologiesModel []>();
  // const [lang,setLang] = useState<LanguagesModel []>();
  // const [user,setUser] = useState<UserModel []>();

  useEffect(()=>{
    async function fetchData(){
      setTechs(await getTechnologies());
      console.log(tech);
      // setLang(await getLanguages());
      // setUser(await getProfile());
    }
    fetchData();
  },[])


  const LangStack = [
    {
      iconSrc : "/LangImg/TypeScript.png",
      title:"TypeScript",
    },{
      iconSrc:"/LangImg/JavaScript.png",
      title:"JavaScript",
    },{
      iconSrc:"/LangImg/Python.png",
      title:"Python",
    },{
      iconSrc:"/LangImg/Java.png",
      title:"Java"
    }
  ]

  // const TechStack = [
  //   {
  //     iconSrc : "/techImg/html.png",
  //     title: "HTML"
  //   },
  //   {
  //     iconSrc : "/techImg/Css.png",
  //     title: "CSS"
  //   },    {
  //     iconSrc : "/techImg/Tailwindcss.png",
  //     title: "TailwindCss"
  //   },    {
  //     iconSrc : "/techImg/react.png",
  //     title: "React JS"
  //   },    {
  //     iconSrc : "/techImg/next.png",
  //     title: "Next JS"
  //   },    {
  //     iconSrc : "/techImg/bootstrap.png",
  //     title: "Bootstrap"
  //   },    {
  //     iconSrc : "/techImg/Figma.png",
  //     title: "Figma"
  //   }, 
  //   {
  //     iconSrc:"/techImg/Nodejs.png",
  //     title:"Node JS"
  //   },
  //   {
  //     iconSrc:"/techImg/Express.png",
  //     title:"Express JS"
  //   },
  //   {
  //     iconSrc : "/techImg/git.png",
  //     title: "Git"
  //   },  
  //   {
  //     iconSrc:"/techImg/Overleaf.png",
  //     title:"Overleaf"
  //   },   
  //       {
  //     iconSrc : "/techImg/shad.png",
  //     title: "ShadCn"
  //   },    {
  //     iconSrc : "/techImg/Framer.png",
  //     title: "Framer"
  //   },
  // ]

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
                LangStack.map((currentElement,index)=>(
                  <div key={index} className="flex flex-col items-center gap-y-5">
                    <Image 
                    src = {currentElement.iconSrc}
                    alt = "tech-logo"
                    width={42}
                    height={42}
                    quality={100}
                    />
                    <h4 className="text-gray-400 font-semibold">{currentElement.title}</h4>
                  </div>
                ))
              }

              </div>
            </div>


            <div>
              <h2 className="text-gray-400 text-sm mb-5">Want to know more about me?</h2>


              <div className="w-full h-[400px] bg-red-200 rounded-sm mb-10">
                {/* Image Here
                  */}
              </div>

                {/* Text Information */}
              <div>
                  <h5 className="text-white mb-5">
                  I’m an 18-year-old aspiring <span className="text-primary font-bold">self-proclaimed developer</span> with a passion for crafting impactful digital products. My strength lies in frontend technologies, enabling me to transform ideas into functional, user-friendly solutions. Early experience in startups taught me to adapt, meet tight deadlines, and work seamlessly with cross-functional teams in dynamic environments.</h5>

                    <h5 className="text-white">Beyond coding, I’m constantly exploring new technologies and building side projects to grow and contribute to the tech community. Outside of tech, I enjoy staying active through football and swimming, fueling my curiosity, creativity, and drive to innovate.</h5>

              </div>

            </div>

        </div>
      </div>

    </section>
  )
}

export default About