"use client";

import { Suspense, useState } from "react";
import AddProjects from "./components/AddProjects/AddProjects";
import {ViewProject} from "./components/ViewProject/ViewProject";

const ProjectStatus = () => {
  const [activeTabs, setactiveTabs] = useState("View Projects");

  const handletabs = (tabs: string) => {
    setactiveTabs(tabs);
  };

  return (
    <section>
      <div className="flex flex-col justify-center items-center gap-y-10">
        <div className="flex flex-row justify-center items-center gap-10">
              <div
                onClick={() => handletabs("View Projects")}
                className={` font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                      ${
                        activeTabs === "View Projects"
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-500"
                      }`}
              >
                View Projects
              </div>
            <div
              onClick={() => handletabs("Add Project")}
              className={` mx-auto font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                    ${
                      activeTabs === "Add Project"
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-500"
                    }`}
            >
              Add Project
            </div>
        </div>
        <div className="flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
              {activeTabs === "Add Project" && <AddProjects/>}
              {activeTabs === "View Projects" && <ViewProject/>}
              
            </Suspense>
        </div>
      </div>
    </section>
  );
};

export default ProjectStatus;
