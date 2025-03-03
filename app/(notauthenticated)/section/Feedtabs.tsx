"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the components for better performance
const Feeds = dynamic(() => import("./Feeds"));
const About = dynamic(() => import("./About"));
const Experience = dynamic(() => import("./Experience"));
const Works = dynamic(() => import("./Works"));

const Feedtabs = () => {
  const [activeTabs, setActiveTabs] = useState("Feeds");

  const handleTabs = (tabs: string) => {
    setActiveTabs(tabs);
  };

  return (
    <section>
      <div className="w-full flex flex-col">
        {/* Tabs */}
        <div className="flex flex-row justify-between pb-5">
          {["Feeds", "About", "Experience", "Works"].map((tab) => (
            <div
              key={tab}
              onClick={() => handleTabs(tab)}
              className={`font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                ${activeTabs === tab ? "text-white border-b-4 border-primary" : "text-gray-500"}`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="w-full">
          <div
            className={`transition-opacity duration-500 ${activeTabs === "Feeds" ? "opacity-100" : "opacity-0"}`}
          >
            {activeTabs === "Feeds" && <Feeds />}
          </div>
          <div
            className={`transition-opacity duration-500 ${activeTabs === "About" ? "opacity-100" : "opacity-0"}`}
          >
            {activeTabs === "About" && <About />}
          </div>
          <div
            className={`transition-opacity duration-500 ${activeTabs === "Experience" ? "opacity-100" : "opacity-0"}`}
          >
            {activeTabs === "Experience" && <Experience />}
          </div>
          <div
            className={`transition-opacity duration-500 ${activeTabs === "Works" ? "opacity-100" : "opacity-0"}`}
          >
            {activeTabs === "Works" && <Works />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedtabs;
