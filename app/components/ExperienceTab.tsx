import { JsonValue } from "@prisma/client/runtime/library"
import Image from "next/image"


interface ExperienceProps {
  id:number,
  ImgSrc : string,
  company:string,
  role:string,
  location:string,
  description:string,
  skills:JsonValue
}
const ExperienceTab = (props:ExperienceProps) => {
  return (
    <section className="border-l-4 border-primary">
        <div className="flex flex-col px-6 py-3">
              {/* Image and Role */}
              <div className="flex flex-row items-center gap-x-5">
                <div>
                  <Image
                  src = {props.ImgSrc}
                  quality={100}
                  width = {100}
                  height={100}
                  alt = {"Logo"}
                  className="max-w-[100px] max-h-[100px] rounded-full object-fill"
                  />
                </div>

                <div className="flex flex-col">
                  <h2 className="text-2xl text-white font-bold">{props.role}</h2>
                  <h4 className="text-md text-white ">{props.company} - {props.location} </h4>
                  {/* <h6 className="text-sm text-gray-400 font-light">{props.timeline}</h6> */}
                </div>
              </div>

              <div className="mt-5">
          
                <p className="py-2 font-light text-white">{props.description}</p>
            
              </div>

              <div className="mt-5 flex flex-shrink flex-row gap-x-5 gap-y-5 flex-wrap">

              {
                Array.isArray(props.skills) && props.skills.every(skill => typeof skill === 'string') ? (
                  <div className="w-full flex flex-row text-primary font-light pb-5 mt-2 gap-3">
                    {props.skills.map((skill: string, index: number) => (
                      <div key={index}>
                        <h2 className="text-primary bg-primary/15 px-3 py-2 rounded-full">{skill}</h2>
                      </div>
                    ))}
                  </div>
                ) : (
                  null
                )
              }

              </div>

            
              

            </div>
    </section>
  )
}

export default ExperienceTab