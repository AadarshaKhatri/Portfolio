"use client";

import { Suspense, useState } from "react";
import AddExperience from "./components/AddExperience/AddExperience";
import ViewExperience from "./components/ViewExperience/ViewExperience";

const ExperienceStatus = () => {
  const [activeTabs, setactiveTabs] = useState("View Experience");

  const handletabs = (tabs: string) => {
    setactiveTabs(tabs);
  };

  return (
    <section>
      <div className="flex flex-col justify-center items-center gap-y-10">
        <div className="flex flex-row justify-center items-center gap-10">
              <div
                onClick={() => handletabs("View Experience")}
                className={` font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                      ${
                        activeTabs === "View Experience"
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-500"
                      }`}
              >
                View Experience
              </div>
            <div
              onClick={() => handletabs("Add Experience")}
              className={` mx-auto font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                    ${
                      activeTabs === "Add Experience"
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-500"
                    }`}
            >
              Add Experience
            </div>
        </div>
        <div className="flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
              {activeTabs === "Add Experience" && <AddExperience/>}
              {activeTabs === "View Experience" && <ViewExperience/>}
              
            </Suspense>
        </div>
      </div>
    </section>
  );
};

export default ExperienceStatus;
