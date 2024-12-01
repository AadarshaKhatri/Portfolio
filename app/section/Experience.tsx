import ExperienceTab from "../components/ExperienceTab"


const Experience = () => {

  const ExperienceLists = [
    {
      JobTitle: "JavaScript Intern",
      src :"/Logo/CV_logo.png",
      Location: "ChimpVine - Hybrid",
      TimeLine: "Aug 2024 - Present",
      Description: [
        "Designed the UIs for Computer Vision Games",
        "Developed a responsive landing page with parallax effect",
        "Designed high-fidelity prototypes and developed approved designs using React.",
       
      ],
      skills:["Next JS","React JS","Redux","API Integration", "Figma", "Bootstrap"]
      
    },
    {
      JobTitle: "UI/UX Designer Intern",
      src :"/Logo/Cod_logo.png",
      Location: "Codynn - Remote",
      TimeLine: "August 2024 - October 2024",
      Description: [
        "Contributed to UI design of Play Store products including BetterSchool and Codynn.",
        "Designed UI from scratch for various apps in Figma, such as question banks, exercise, and programming apps.",
      
      ],
      skills:["Design Documentation","UX Research","UX Design" , "Ideation","Figma"]
    },
    {
      JobTitle: "Python and C Instructor (Community Hours)",
      src :"/LangImg/Python.png",
      Location: "Bloom Nepal School - Onsite",
      TimeLine: "May 2024 - July 2024",
      Description: [
        "Led Python and C programming classes for grades 8, 9, and 10 as part of community service.",
        "Fostered a passion for computer science among students."
      ],
      skills:["Python","C","Management"]
    },
      {
      JobTitle: "Video Editor Intern",
      src :"/Logo/Ann.png",
      Location: "Aviation News Nepal - Onsite",
      TimeLine: "June 2023 - July 2023",
      Description: [
        "Edited videos for various social media platforms, including shorts, podcasts, and musical videos.",
       
      ],
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
          <div className="space-y-10">
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