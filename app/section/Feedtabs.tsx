"use client"

import { useState } from "react"
import Feeds from "./Feeds"
import About from "./About"
import Experience from "./Experience"
import Works from "./Works"


const Feedtabs = () => {
  const [activeTabs,setactiveTabs] = useState('Feeds')

  const handletabs = (tabs :string )=>{
    setactiveTabs(tabs);
  }
  return (
    <section>
      <div className="w-full flex flex-col">

        {/* Tabs */}
        <div className="flex flex-row justify-between pb-5">

          <div
              onClick={() => handletabs('Feeds')}
              className={`font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                ${activeTabs === 'Feeds' ? 'text-white border-b-4 border-primary' : 'text-gray-500'}`}
            >
              Feeds
            </div>
      
            <div
              onClick={() => handletabs('About')}
              className={`font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                ${activeTabs === 'About' ? 'text-white border-b-4 border-primary' : 'text-gray-500'}`}
            >
              About
            </div>

            <div
              onClick={() => handletabs('Experience')}
              className={`font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                ${activeTabs === 'Experience' ? 'text-white border-b-4 border-primary' : 'text-gray-500'}`}
            >
              Experience
            </div>

            <div
              onClick={() => handletabs('Works')}
              className={`font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                ${activeTabs === 'Works' ? 'text-white border-b-4 border-primary': 'text-gray-500'}`}
            >
              Works 
            </div>
        </div>
        

        {/* Sections */}
        <div className="w-full">
        {
          activeTabs === "Feeds" && <Feeds/>
        }
           {
          activeTabs === "About" && <About/>
        }

        {
          activeTabs === "Experience" && <Experience/>
        }

        {
          activeTabs === "Works" && <Works/>
        }
      </div>

      </div>
    </section>
  )
}

export default Feedtabs