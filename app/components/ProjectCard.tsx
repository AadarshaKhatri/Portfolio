
import { FaEye, FaGithub } from "react-icons/fa"
import Image from "next/image"
import { JsonValue } from "@prisma/client/runtime/library"
interface ProjectCardProps {
  key:number,
  title:string,
  liveLink:string,
  hrefLink:string,
  description:string,
  ImageSource:string,
  tags:JsonValue
}

const ProjectCard = (props :ProjectCardProps) => {
  return (
    <section className="p-5  hover:bg-white/10 rounded-lg">
    <div className="container mx-auto px-2">
      <div className="flex flex-col">


        <div className="flex flex-row justify-between pb-6">
          <h1 className="text-white text-2xl font-bold pb-1">{props.title}</h1>

          <div className="flex flex-row gap-5">
            {
             props?.hrefLink ? 

             <a href ={props.hrefLink} target = "_blank" className="flex flex-row gap-x-2 items-center cursor-pointer">
             <FaGithub className="text-white" size={24}/>
               <p className="text-white text-lg">
                View Code 
               </p>
               </a>
             :
             null
            }

{
             props?.liveLink ? 
             <a href ={props.liveLink} target = "_blank" className="flex flex-row gap-x-2 items-center cursor-pointer">
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
        <p className="text-white">{props.description}
         
        </p>
        
  
        <div className="mt-5 flex flex-shrink flex-row gap-x-5 gap-y-5 flex-wrap pb-10">
  


{
                Array.isArray(props.tags) && props.tags.every(tag => typeof tag === 'string') ? (
                  <div className="w-full flex flex-row flex-wrap text-primary font-light pb-5 mt-2 gap-3">
                    {props.tags.map((tag: string, index: number) => (
                      <div key={index}>
                        <h2 className="text-primary bg-primary/15 px-3 py-2 rounded-full">{tag}</h2>
                      </div>
                    ))}
                  </div>
                ) : (
                  null
                )
              }

         
              
       </div>

        {/* Images */}

        <div>
          <Image
          src={props.ImageSource}
          alt="Project Display Image"
          width={1000}
          height={320}
          quality={75}
          className="w-full h-[200px]md:h-[320px] rounded-md z-50 object-fill"
          priority = {true}
          />
        </div>

      </div>

    </div>
      

  </section>

  )
}

export default ProjectCard