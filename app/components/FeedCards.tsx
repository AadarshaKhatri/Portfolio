import Image from "next/image"
interface FeedCardsProps {
  date:string,
  title:string,
  pfp:string,
  imgSrc:string,
  description:string,
  tags:string | null
}

const FeedCards = (props : FeedCardsProps) => {
  return (
    <section className="p-5 pt-10 hover:bg-white/10 rounded-lg">
    <div className="container mx-auto px-2">
     <div className="flex flex-row gap-1">
            <div className="w-[50px]">
              <Image
                  src = {props.pfp}
                  alt = "Logos"
                  height = {42}
                  width={42}
                  className="rounded-full max-w-[50px] max-h-[50px] object-contain"
                  quality ={100}/>
                  

            </div>

       <div className="flex-1 flex-col">
        <h1 className="text-white text-lg font-bold pb-1">{props.title}<span className="font-normal text-gray-400 text-sm"> - {props.date} </span></h1>
        
        {/* Description */}
        {
          props.description ? <p className="text-white">{props.description}
        </p> :null
        }
        
        
        {/* Tags */}
        <p className="text-primary font-light pb-5 mt-2">
          {props.tags}
        </p>

        {/* Images */}
        
        {
          props.imgSrc ? 
          <div className="">
              <Image
              src={props.imgSrc}
              alt = "Feed"
              width={1000}
              height={1000}
              quality={100}
              priority
              className="w-full h-[220px] md:h-[320px] object-cover"/>
              

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