
import FeedCards from "../components/FeedCards"


const Feeds = () => {

  const FeedTasks = [
    {
    pinned:true,
    date:"12th November, 2024",
    title:"Aadarsha Khatri ✨",
    pfp:"/Logo/pfp.jpg",
    imgSrc:"",
    description:"This is my portfolio website where I share updates on my current projects and showcase what I have worked on. It includes detailed descriptions of my skills, the technologies I've used, and the various projects I've completed.",
    tags:"#Portfolio ",
  
    },
    {
    pinned:false,
    date:"18th September,2024",
    title:"Aadarsha Khatri 🎨",
    pfp:"/Logo/pfp.jpg",
    imgSrc:"/Feeds/Design.png",
    description:"Design is not just about the end result; it’s about the journey. It's the careful, user-focused process that leads to the final outcome.  Here’s how I approach every design project:",
    tags:"#DesignProcess #CreativeThinking",
    },
    

    {
      pinned:false,
      date: "8th June, 2024", 
      title:"Aadarsha Khatri 🤓",
      pfp:"/Logo/pfp.jpg",
      imgSrc:"/Feeds/Py_BNS.jpg",
      description:"Volunteered to lead C and python programming classes at Bloom Nepal School, designing and delivering interactive lessons tailored to the students' needs. Focused on building foundational coding skills through hands-on projects and practical applications. Demonstrated strong leadership, communication, and adaptability, creating an engaging learning environment that inspired students to explore programming concepts and problem-solving.",
      tags:"#C #Tutoring #Python"
    }

  ]

  return (
    <section>
      {/* <div className="flex flex-row items-center gap-2 absolute left-[100px] top-[790px]  md:left-[220px] md:top-[740px] lg:left-[450px] lg:top-[750px]">
        <VscPinned className="text-gray-300" size={16}/>
        <p className="text-gray-300">Pinned</p>
      </div> */}
      <div className="container mx-auto px-1 md:px-0">
        <div className="flex flex-col">
          {
            FeedTasks.map((currentElement,index)=>(
              <FeedCards
              pinned={currentElement.pinned}
              key={index}
              title={currentElement.title}
              tags={currentElement.tags}
              pfp={currentElement.pfp}
              date={currentElement.date}
              description={currentElement.description}
              imgSrc={currentElement.imgSrc}
              
              />

            ))
          }
          {/* <FeedCards/> */}
        </div>

      </div>
    </section>
   
  )
}

export default Feeds