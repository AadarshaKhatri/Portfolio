import { JsonValue } from "@prisma/client/runtime/library"
import Image from "next/image"
import { VscPinned } from "react-icons/vsc"

interface FeedCardsProps {
  id:number,
  authorId:number,
  profile:string,
  username:string,
  pinned:boolean,
  createdAt:Date,
  caption:string,
  tags:JsonValue,
  images:string,

}
const FeedCards = (props : FeedCardsProps) => {
  return (
    <section className="p-5 md:pt-10 hover:bg-white/10 rounded-lg">
    <div className="container mx-auto px-2">

     <div className="flex flex-row gap-1">
            <div className="w-[50px]">
              <Image
                  src = {props.profile}
                  alt = "Logos"
                  height = {42}
                  width={42}
                  className="rounded-full max-w-[42px] max-h-[42px] object-cover"
                  quality ={100}/>
                  

            </div>

       <div className="flex-1 flex-col relative">
       {
        props.pinned == true ? 
        <div className="flex flex-row items-center gap-2 absolute top-[-16px] md:top-[-30px]">
            <VscPinned className="text-gray-300" size={16}/>
            <p className="text-gray-300 text-sm">Pinned</p>
        </div>
        : null
        
      }
      <h1 className="text-white text-lg font-bold pb-1">
                  {props.username }
                  <span className="font-normal text-gray-400 text-sm">
                    {" "}- {new Date(props.createdAt).toLocaleDateString('en-GB', { 
                      day: '2-digit', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </h1>

        
        {/* Description */}
        {
          props.caption ? <p className="text-white">{props.caption}
        </p> :null
        }
        
        


{
  Array.isArray(props.tags) && props.tags.every(tag => typeof tag === 'string') ? (
    <div className="w-full flex flex-row text-primary font-light pb-5 mt-2 gap-3">
      {props.tags.map((tag: string, index: number) => (
        <div key={index}>
          <h2>{tag}</h2>
        </div>
      ))}
    </div>
  ) : (
    null
  )
}





        {/* Images */}
        
        {
          props.images ? 
          <div className="">
              <Image
              src={props.images}
              alt = "Feed"
              width={1000}
              height={1000}
              quality={100}
              priority
              className="w-full h-[150px] md:h-[320px] object-cover"/>
              
              

            </div>

          : null
        }
      

       </div>

     </div>
      
    </div>
  </section>
  )
}

export default FeedCards