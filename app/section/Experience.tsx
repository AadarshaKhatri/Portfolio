import ExperienceTab from "../components/ExperienceTab"


const Experience = () => {

  const ExperienceLists = [
    {
      JobTitle: "JavaScript Intern",
      src :"/Logo/CV_logo.png",
      Location: "ChimpVine - Hybrid",
      TimeLine: "Aug 2024 - Present",
      Description: "ChimpVine is a US-based company that provides educational games, quizzes, and interactive courses for students from Pre-K to Grade 8, with the goal of making learning fun and engaging. I initially joined the company as an intern and have since been steadily advancing in my journey, gaining valuable experience and contributing to the company's mission of transforming education through innovative and enjoyable learning experiences.",
      skills:["Next JS","React JS","Redux","TailWind Css", "Figma", "Bootstrap"]
      
    },
    {
      JobTitle: "UI/UX Designer Intern",
      src :"/Logo/Cod_logo.png",
      Location: "Codynn - Remote",
      TimeLine: "August 2024 - October 2024",
      Description: 
        "Coddyn, a product of vOID Nepal, is developed by a software company dedicated to bridging the education gap through programming courses. I began as a remote intern designer, where I refined my UX skills by contributing to UI designs for products like BetterSchool and Coddyn, as well as creating designs for apps such as question banks and programming learning tools.",
      skills:["Design Documentation","UX Research","UX Design" , "Ideation","Figma"]
    },
    {
      JobTitle: "Community Hours",
      src :"/Logo/BNS.jpeg",
      Location: "Bloom Nepal School - Onsite",
      TimeLine: "May 2024 - July 2024",
      Description: 
        "Back on Track BNSF is a volunteer-driven initiative focused on rebuilding Nepali schools and enhancing education post-earthquake. As part of the Mentorship Program, I joined as a Python Instructor, teaching programming to grades 8, 9, and 10 at Bloom Nepal School. In this role, I inspired students' interest in computer science and helped them develop key coding skills in Python and C, supporting the school's educational recovery and growth.",
      
      skills:["Python","C","Mentoring"]
    },
      {
      JobTitle: "Video Editor Intern",
      src :"/Logo/Ann.png",
      Location: "Aviation News Nepal - Onsite",
      TimeLine: "June 2023 - July 2023",
      Description:  "Aviation News Nepal, a media company dedicated to daily aviation updates across various social platforms, gave me the opportunity to contribute as an editor for their aviation content. During high school, I completed a summer internship as a Video Editor, where I gained valuable hands-on experience in video production and post-production workflows.",
      skills:["Premier Pro","Video Editing"]
    },
  ];
  
  const ButtonTitle = [
    {
      title: "Python Instructor",
    },{
      title:"Video Editor Intern",

    },{
      title:"Frontend Intern",
    },{
      title:"UI/UX Designer",
    },{
      title:"JavaScript Intern",
    }
  ]
  return (
    <section>
      <div className="container mx-auto px-6 md:px-0">
        <div className="flex flex-col">
          <h3 className="text-white font-semibold">Positions I have held</h3>

          <div className="grid grid-cols-3  items-center justify-between gap-y-5 px-15 py-10">
            {
              ButtonTitle.map((currentElement,index)=>(
                <div key={index}>
                  <button className=" px-3 py-2 border border-primary text-md text-white rounded-lg hover:bg-primary hover:text-black focus:outline-none focus:ring-2 focus:ring-primary">{currentElement.title}</button>
                </div>

              ))
            }
          </div>

          Career Highlights
          <div className="space-y-16">
            <h2 className="font-comicNeue text-4xl font-semibold text-primary mb-5"> 
              Career Highlights
            </h2>

            {
              ExperienceLists.map((currentElement,index)=>(
                <ExperienceTab
                key={index}
                role={currentElement.JobTitle}
                ImgSrc={currentElement.src}
                location={currentElement.Location}
                timeline={currentElement.TimeLine}
                description={currentElement.Description}
                skills={currentElement.skills}
                />
              ))
            }

          

          

          </div>

        </div>

      </div>
      
    </section>
  )
}

export default Experience