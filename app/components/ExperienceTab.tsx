import Image from "next/image"


interface ExperienceProps {
  ImgSrc : string,
  role:string,
  location:string,
  timeline:string,
  description:Array<string>,
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
                  className="rounded-full object-fill"
                  />
                </div>

                <div className="flex flex-col">
                  <h2 className="text-2xl text-white font-bold">{props.role}</h2>
                  <h4 className="text-md text-white ">{props.location} </h4>
                  <h6 className="text-sm text-gray-400 font-light">{props.timeline}</h6>
                </div>
              </div>

              <div className="mt-5">
              {
                props.description?.map((ele,index)=>(
              <div key={index}  >
                <ol className="list-disc text-white list-inside">
                  <li className="py-2">{ele}</li>
                </ol>
              </div>


                ))
              }
              </div>

            
              

            </div>
    </section>
  )
}

export default ExperienceTab