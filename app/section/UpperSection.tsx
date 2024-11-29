import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { IoSchoolOutline } from "react-icons/io5";
import { PiBalloon } from "react-icons/pi";
import Feedtabs from "./Feedtabs";

const UpperSection = () => {
  const BioInfo = [
    {
      icon:<CiLocationOn size={20} className="text-primary"/>,
      name: "Nepal"
    },
    {
      icon:<IoSchoolOutline size={20} className="text-primary"/>,
      name:"Undergraduate"
    },{
      icon:<PiBalloon size={20} className="text-primary"/>,
      name:"Born 2005",
    }
  ]

  const logos = [
    {
      source:"/Logo/Ann.png"
    },
    {
      source:"/Logo/Cod_logo.png",
    },
    {
      source :"/Logo/Cv_logo.png",
    }
  ]
  return (
    <section className="overflow-hidden min-h-screen flex justify-center ">
      <div className="w-full max-w-[650px] mx-auto">

        {/* Infomation */}
        <div className="flex flex-col">

          {/* Background Image Section and Profile Section */}
          <div className="relative pb-5">
            <Image
              src="/assets/Bg.png"
              alt="Background-Image"
              width={600} // Adjusted width for responsiveness
              height={300} // Adjusted height for better proportions
              quality={100}
              className="md:w-full md:h-[250px] h-auto object-cover"
            />
            <div className=" relative flex flex-row justify-between mx-4 mt-4">
            {/* Profile Picture */}
              <div className=" mt-[-86px] w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-red-300 rounded-full border-4 border-white"></div>

              {/* Download Button */}
              <div className="">
              <button className="text-white font-comicNeue text-md border border-primary px-4 py-2 rounded-full hover:bg-primary">
                  Download CV
              </button>

            </div>
  
            </div>
          </div>

          {/* Personal Information */}
          <div className="flex flex-col mx-4">
            <div className="flex flex-row items-center gap-x-2">
              <h2 className="text-primary text-2xl md:text-4xl font-semibold">Aadarsha Khatri</h2>
              <Image
                src="/assets/Code.png"
                alt="Code"
                width={42}
                height={32}
                quality={100}
                className="w-[32px] h-[32px] md:w-[42px] md:h-[42px]"
              />
            </div>

            {/* Role */}
            <h4 className="text-md text-gray-400">@Software Developer Aspirant</h4>

            {/* Info/Bio */}
            <p className="text-white mt-4">
              Creating meaningful projects for actual clients, not just adding to the project count for portfolios. 🌟
            </p>

            {/* Icons */}
            <div className="flex flex-row justify-start gap-x-5 mt-4">
              {
                BioInfo.map((ele,index)=>(
                  <div key = {index} className="flex flex-row justify-between items-center gap-x-1 ">
                    <span>{ele.icon}</span>
                    <h4 className="text-gray-400 text-sm md:text-lg">{ele.name}</h4>
                  </div>

                ))
              }
              

            </div>

            {/* Worked At */}
            <div className="flex flex-row mt-4 gap-1 items-center">
              <div className="flex flex-row items-center -space-x-3 pr-1">
                {
                  logos.map((currentElement,index)=>(
                    <Image
                    key = {index}
                    src = {currentElement.source}
                    alt = "Logos"
                    height = {24}
                    width={24}
                    className="rounded-full max-w-[24px] max-h-[24px]"
                    quality ={100}/>
                    
                  
                  ))
                }

              
              </div>

              <div>
                <p className="text-primary hover:underline cursor-pointer">Worked at ChimpVine, Codynn, Aviation News Nepal and more..</p>
              </div> 

            </div>


          </div>
        </div>


        <div className="mt-10">
          <Feedtabs/>
        </div>



      </div>
    </section>
  );
};

export default UpperSection;
