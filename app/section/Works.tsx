import ProjectCard from "../components/ProjectCard"


const Works = () => {
  const ProjectList = [
    {
      title: "DashBoard UI",
      hrefLink:"https://github.com/AadarshaKhatri/DashBoard",
      description:"Designed and developed a Shipments Dashboard user interface using React, focusing on delivering an intuitive and efficient experience for managing shipments. The project involved implementing responsive layouts, dynamic data visualization, and user-friendly components to streamline tracking and management tasks.",
      ImageSource:"/projectImg/DashBoard.png",
      tags:["React","Re-Charts","Tailwind Css"],
      
    },{
      title:"Sass Landing Page",
      hrefLink:"https://github.com/AadarshaKhatri/Framer_LP",
      description:"Developed a SaaS full-responsive product landing page featuring a sleek parallax effect and smooth scrolling animations for a modern and engaging user experience. The design was inspired by a reference template sourced from the Figma Community, adapted and implemented with precision to maintain visual appeal and functionality. ",
      ImageSource:"/projectImg/LP.png",
      tags:["Next JS","React JS", "Tailwind CSS" , "Framer Motion"],
    },{
      title:"Tourist Guide",
      hrefLink:"https://github.com/AadarshaKhatri/Tourist_Guide",
      description:"This project highlights my ability to turn Figma designs into responsive web applications, blending technical expertise with design principles to deliver interactive and visually appealing solutions.",
      ImageSource:"/projectImg/Lp_tourist.png",
      tags:["React","Gsap","Tailwind CSS"],
    },{
      title:"Weather App",
      hrefLink:"https://github.com/AadarshaKhatri/Weather_forecast",
      description:"A weather app delivering real-time updates, forecasts, and location-based insights with a clean, responsive design and dynamic visuals.",
      ImageSource:"/projectImg/Weather.png",
      tags:["JavaScript","Vanilla CSS", "API Handling"],
    }
  ]
  return (
    <section>
      <div className="container mx-auto px-6 md:px-0">


        <div className="flex flex-col justify-between gap-y-10">

          {/* Card */}

          {
            ProjectList.map((currentElement,index)=>(
              <ProjectCard
              key={index}
              title={currentElement.title}
              hrefLink={currentElement.hrefLink}
              description={currentElement.description}
              ImageSource={currentElement.ImageSource}
              tags={currentElement.tags}
              
              />

            ))
          }

          
        </div>

      </div>

    </section>
  )
}

export default Works