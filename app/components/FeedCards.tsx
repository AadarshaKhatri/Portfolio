import Image from "next/image"

const FeedCards = () => {
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
        <h1 className="text-white text-lg font-bold pb-1">Aadarsha Khatri ✨<span className="font-normal text-gray-400 text-sm"> - 25th November, 2024 </span></h1>
        
        {/* Description */}
        <p className="text-white">Just completed building an landing page using React.js and Framer motion! It’s fully responsive 💻🔧 
          {/* Link: https://localhost:30001
          #ReactJs #LandingPage #WebDevelopment #ParallaxEffect */}
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

export default FeedCards