"use client"

import { useState } from "react"


const Feedtabs = () => {
  const [activeTabs,setactiveTabs] = useState('Feeds')

  const handletabs = (tabs :string )=>{
    setactiveTabs(tabs);
  }
  return (
    <section>
      <div className="w-full flex flex-col">

        {/* Tabs */}
        <div className="flex flex-row justify-between">

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
              onClick={() => handletabs('Projects')}
              className={`font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                ${activeTabs === 'Projects' ? 'text-white border-b-4 border-primary': 'text-gray-500'}`}
            >
              Projects 
            </div>
        </div>

        {/* <div className="w-full p-4">
        {activeTab === 'overview' ? (
          <div>
            <OverView/>
            
          </div>
        ) : (
          <div>
            <Tracking/>
            </div>
        )}
      </div> */}

      </div>
    </section>
  )
}

export default Feedtabs