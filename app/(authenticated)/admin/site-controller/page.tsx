"use client";

import { Suspense, useState } from "react";
import AccountStatus from "./components/AccountStatus/Account_Status";
import NavigationBar from "./components/Navigation/Navigation";
import ProjectStatus from "./components/ProjectStatus/ProjectStatus";
import ExperienceStatus from "./components/ExperienceStatus/ExperienceStatus";
import PostStatus from "./components/PostStatus/PostStatus";

export default function SiteController() {
  const [activeTabs, setactiveTabs] = useState("AccountStatus");

  const handletabs = (tabs: string) => {
    setactiveTabs(tabs);
  };

  return (
    <section>
      <NavigationBar />
      <div className="container mx-auto px-6 py-6">
        <div className="flex">

          {/* Sidebar Section - Fixed on the Left */}
          <div className="fixed top-40 left-0 w-[300px] h-screen p-6">
            <div className="flex flex-col justify-start items-start space-y-4">
              
              <div
                onClick={() => handletabs("AccountStatus")}
                className={`lg:w-40 font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                  ${activeTabs === "AccountStatus" ? "text-white border-r-2 border-primary" : "text-gray-500"}`}
              >
                Account
              </div>

              <div
                onClick={() => handletabs("ProjectStatus")}
                className={`lg:w-40 font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                  ${activeTabs === "ProjectStatus" ? "text-white border-r-2 border-primary" : "text-gray-500"}`}
              >
                Project
              </div>

              <div
                onClick={() => handletabs("ExperienceStatus")}
                className={`lg:w-40 font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                  ${activeTabs === "ExperienceStatus" ? "text-white border-r-2 border-primary" : "text-gray-500"}`}
              >
                Experience
              </div>

              <div
                onClick={() => handletabs("PostStatus")}
                className={`lg:w-40 font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                  ${activeTabs === "PostStatus" ? "text-white border-r-2 border-primary" : "text-gray-500"}`}
              >
                Posts
              </div>
            </div>
          </div>

          {/* Main Content Section - On the Right */}
          <div className="ml-[320px] w-full">
            <Suspense fallback={<div>Loading...</div>}>
              {activeTabs === "AccountStatus" && <AccountStatus />}
              {activeTabs === "ProjectStatus" && <ProjectStatus />}
              {activeTabs === "ExperienceStatus" && <ExperienceStatus />}
              {activeTabs === "PostStatus" && <PostStatus />}
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
