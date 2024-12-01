import Image from "next/image"

const About = () => {
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

  const TechStack = [
    {
      iconSrc : "/techImg/html.png",
      title: "HTML"
    },
    {
      iconSrc : "/techImg/Css.png",
      title: "CSS"
    },    {
      iconSrc : "/techImg/Tailwindcss.png",
      title: "TailwindCss"
    },    {
      iconSrc : "/techImg/react.png",
      title: "React JS"
    },    {
      iconSrc : "/techImg/next.png",
      title: "Next JS"
    },    {
      iconSrc : "/techImg/bootstrap.png",
      title: "Bootstrap"
    },    {
      iconSrc : "/techImg/Figma.png",
      title: "Figma"
    },    {
      iconSrc : "/techImg/git.png",
      title: "Git"
    },  
    {
      iconSrc:"/techImg/Overleaf.png",
      title:"Overleaf"
    },   
        {
      iconSrc : "/techImg/shad.png",
      title: "ShadCn"
    },    {
      iconSrc : "/techImg/Framer.png",
      title: "Framer"
    },
  ]

  return (
    <section className="py-8">
      <div className="container mx-auto px-6 md:px-0">
        <div className="flex flex-col space-y-5">
            <h2 className="font-comicNeue text-4xl font-semibold text-primary mb-5">Tech Stack</h2>

            <p className="text-white text-md">My expertise currently lies in <span className="text-primary font-bold">Frontend Development</span> , specializing in the creation of dynamic and responsive user interfaces.</p> 

            {/* Tech Stack Images */}
            <div className="grid  grid-cols-3 md:grid-cols-6 gap-y-12 py-8">
            {
              TechStack.map((currentElement,index)=>(
                <div key={index} className="flex flex-col items-center gap-y-5">
                  <Image 
                  src = {currentElement.iconSrc}
                  alt = "tech-logo"
                  width={42}
                  height={42}
                  quality={100}
                  className="w-[42px] h-[42px]"
                  />
                  <h4 className=" text-gray-400 font-semibold">{currentElement.title}</h4>
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
                    I’m an 18-year-old developer with a passion for creating impactful products. My expertise is centered around frontend technologies, allowing me to build complete solutions from scratch. I have a strong foundation in coding, design, and problem-solving that empowers me to transform ideas into functional, user-friendly products.
                  </h5>

                  
                  <h5 className="text-white mb-5">
                        At the beginning of my career, I gained valuable experience working within the startup ecosystem, embracing its fast-paced and innovative culture, and taking on diverse responsibilities within my role. This has taught me how to adapt quickly, manage tight deadlines, and collaborate effectively with cross-functional teams to deliver results. I’ve learned to think on my feet, find creative solutions to challenges, and always stay ahead of the curve when it comes to new technologies and development practices.
                  </h5>
                  
                  <h5 className="text-white mb-5">
                      Outside of coding, I have a strong interest in exploring and experimenting with new technologies. Whether I’m working on digital products or diving into new projects, I’m always eager to learn and create. I love developing side projects that challenge me and allow me to contribute to the tech community. Beyond tech, I stay active by participating in competitive football matches and swimming, which are among my favorite extracurricular activities. My drive for curiosity and innovation keeps me constantly seeking ways to expand my skills and collaborate with others who share my enthusiasm for technology and problem-solving.
                  </h5>

              </div>

            </div>

        </div>
      </div>

    </section>
  )
}

export default About