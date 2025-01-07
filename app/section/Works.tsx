import ProjectCard from "../components/ProjectCard"


const Works = () => {
  const ProjectList = [
    {
      title: "Tours Booking",
      liveLink:"",
      hrefLink:"https://github.com/AadarshaKhatri/travelWorld",
      description:"Developed a full-stack web application for users to book tours and user authentication, allowing users to view product. The admin can create products, which are then displayed on the frontend for users to browse.",
      ImageSource:"/projectImg/Tours_travel.png",
      tags:["React","Node-JS","Express JS","MongoDB Atlas"],
      
    },
    {
      title: "Product Showcase ",
      liveLink:"",
      hrefLink:"https://github.com/AadarshaKhatri/bag",
      description:"Developed a full-stack web application with an admin panel and user authentication, allowing users to view products. The admin can create products, which are then displayed on the frontend for users to browse.",
      ImageSource:"/projectImg/Bag.png",
      tags:["EJS","Node-JS","Express JS"],
      
    },
    
    {
      title: "DashBoard UI",
      liveLink:"https://preview-dashboard-xi.vercel.app/",
      hrefLink:"https://github.com/AadarshaKhatri/DashBoard",
      description:"Developed a Shipments Dashboard user interface using React, focusing on delivering an intuitive and efficient experience for managing shipments. The project involved implementing responsive layouts, dynamic data visualization, and user-friendly components to streamline tracking and management tasks.",
      ImageSource:"/projectImg/DashBoard.png",
      tags:["React","Re-Charts","Tailwind Css"],
      
    },{
      title:"Sass Landing Page",
      liveLink:"https://framer-lp.vercel.app/",
      hrefLink:"https://github.com/AadarshaKhatri/Framer_LP",
      description:"Developed a SaaS full-responsive product landing page featuring a sleek parallax effect and smooth scrolling animations for a modern and engaging user experience. The design was inspired by a reference template sourced from the Figma Community, adapted and implemented with precision to maintain visual appeal and functionality. ",
      ImageSource:"/projectImg/LP.png",
      tags:["Next JS","React JS", "Tailwind CSS" , "Framer Motion"],
    },{
      title:"Coffee Landing Page - UI Design",
      liveLink:"https://dribbble.com/shots/24952926-Coffee-Landing-Page",
      description:"This was a project that I designed in Figma, featuring a coffee-themed landing page. The design focuses on creating an inviting and visually appealing user experience, incorporating elements that capture the essence of a cozy coffee shop. It includes interactive sections, a clean layout, and strategic use of color and typography to engage visitors and showcase the brand's personality.",
      hrefLink:"",
      ImageSource:"/projectImg/Coffee_Design.png",
      tags:["UI Design", "Figma", "High Fidelity", "Responsive","Design Project"]
    },

      {
      title:"Tourist Guide",
      liveLink:"",
      hrefLink:"https://github.com/AadarshaKhatri/Tourist_Guide",
      description:"This project highlights my ability to turn Figma designs into responsive web applications, blending technical expertise with design principles to deliver interactive and visually appealing solutions. The design is below the same section",
      ImageSource:"/projectImg/Lp_tourist.png",
      tags:["React","Gsap","Tailwind CSS"],
    },{
      title:"Weather App",
      liveLink:"https://forescanner.netlify.app/",
      hrefLink:"https://github.com/AadarshaKhatri/Weather_forecast",
      description:"A weather app delivering real-time updates, forecasts, and location-based insights with a clean, responsive design and dynamic visuals.",
      ImageSource:"/projectImg/Weather.png",
      tags:["JavaScript","Vanilla CSS", "API Handling"],
    },{
      title:"Web Design",
      liveLink:"https://dribbble.com/shots/24502020-Landing-Page",
      description:"Created a visually appealing, responsive landing page in Figma using advanced prototyping and plugins. It features a compelling hero section, clear value propositions, and attention-grabbing animations, all designed with meticulous attention to typography, layout, and color scheme.",
      hrefLink:"",
      ImageSource:"/projectImg/Linked.png",
      tags:["UI/UX", "Figma", "Responsive","Design Project"]
    },
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
              liveLink={currentElement.liveLink}
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