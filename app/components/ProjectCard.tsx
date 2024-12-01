import Image from "next/image"
import { FaGithub } from "react-icons/fa"
const ProjectCard = () => {
  return (
    <section className="p-5 hover:bg-white/10 rounded-lg">
    <div className="container mx-auto px-2">
    <div className="flex flex-row gap-1">
            <div className="w-[50px]">
              <Image
                  src = {"/Logo/CV_logo.png"}
                  alt = "Logos"
                  height = {42}
                  width={42}
                  className="rounded-full max-w-[50px] max-h-[50px]"
                  quality ={100}/>
                  

            </div>

      <div className="flex-1 flex-col">


        <div className="flex flex-row justify-between pb-2">
          <h1 className="text-white text-lg font-bold pb-1">Dashboard UI</h1>
         
            <a className="flex flex-row gap-x-2 items-center cursor-pointer">
          <FaGithub className="text-white" size={24}/>
            <p className="text-white text-lg">
             View Code 
            </p>
            </a>
          
        </div>
        
        {/* Description */}
        <p className="text-white">Just completed building an landing page using React.js and Framer motion! It’s fully responsive 💻🔧 
         
        </p>
        
        {/* Tags */}
        <p className="text-primary font-light pb-5">
          #ReactJs #LandingPage #WebDevelopment #ParallaxEffect
        </p>

        {/* Images */}

        <div className="w-full h-[320px] bg-red-200">

        </div>

      </div>

    </div>
      
    </div>
  </section>

  )
}

export default ProjectCard