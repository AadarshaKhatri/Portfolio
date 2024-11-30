import Image from "next/image"

const About = () => {
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
    },    {
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
        <div className="flex flex-col">
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
                  />
                  <h4 className="text-gray-400 font-semibold">{currentElement.title}</h4>
                </div>
              ))
            }

            </div>

            <h2 className="font-comicNeue text-2xl text-center  text-primary mb-5">Languages</h2>
        </div>
      </div>

    </section>
  )
}

export default About