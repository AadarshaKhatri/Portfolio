"use client";

import { Suspense, useState } from "react";
import AccountStatus from "./account/AccountStatus";
import NavigationBar from "./components/Navigation/Navigation";
import ProjectStatus from "./project/ProjectStatus";
import ExperienceStatus from "./experience/ExperienceStatus";
import PostStatus from "./post/PostStatus";

export default function SiteController() {
  const [activeTabs, setactiveTabs] = useState("AccountStatus");

  const handletabs = (tabs: string) => {
    setactiveTabs(tabs);
  };

  return (
    <section>
      <NavigationBar />
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col justify-center items-center md:flex-row">

          {/* Sidebar Section - Fixed on the Left */}
          <div className="md:fixed md:top-40 md:left-0 md:w-[300px] md:h-screen md:p-6">
            <div className="flex flex-row md:flex-col justify-center items-center md:justify-start md:items-start gap-x-10 space-y-4">
              
              <div
                onClick={() => handletabs("AccountStatus")}
                className={`lg:w-40 font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                  ${activeTabs === "AccountStatus" ? "text-primary border-r-2 border-primary" : "text-gray-500"}`}
              >
                Account
              </div>

              <div
                onClick={() => handletabs("ProjectStatus")}
                className={`lg:w-40 font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                  ${activeTabs === "ProjectStatus" ? "text-primary border-r-2 border-primary" : "text-gray-500"}`}
              >
                Project
              </div>

              <div
                onClick={() => handletabs("ExperienceStatus")}
                className={`lg:w-40 font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                  ${activeTabs === "ExperienceStatus" ? "text-primary border-r-2 border-primary" : "text-gray-500"}`}
              >
                Experience
              </div>

              <div
                onClick={() => handletabs("PostStatus")}
                className={`lg:w-40 font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                  ${activeTabs === "PostStatus" ? "text-primary border-r-2 border-primary" : "text-gray-500"}`}
              >
                Posts
              </div>
            </div>
          </div>

          {/* Main Content Section - On the Right */}
          <div className="md:ml-[320px] w-full">
            <Suspense fallback={<div className="text-primary">Loading...</div>}>
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
