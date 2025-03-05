import { useEffect, useState } from "react";
import ProjectCard from "@/app/components/ProjectCard";
import { getProjects } from "../action";
import { ProjectModel } from "@/app/types/interfaces";

// Skeleton Loader for a Project Card
const SkeletonProjectCard = () => (
    <section className="p-5 animate-pulse bg-gray-800 rounded-lg">
     <div className="container mx-auto px-2">
      <div className="flex flex-col">

        {/* Title and Action Links */}
        <div className="flex flex-row justify-between pb-6 mt-5">
          <div className="bg-gray-500 h-6 w-2/4 rounded"></div>

          <div className="flex flex-row gap-5">
            <div className="bg-gray-500 h-6 w-20 rounded"></div>
            <div className="bg-gray-500 h-6 w-20 rounded"></div>
          </div>
        </div>
        
        {/* Description */}
        <div className="h-4 bg-gray-500 w-full rounded mb-4"></div>
        <div className="h-4 bg-gray-500 w-5/6 rounded mb-4"></div>

        {/* Tags */}
        <div className="mt-5 flex flex-shrink flex-row gap-x-5 gap-y-5 flex-wrap pb-5">
          <div className="w-full flex flex-row text-primary font-light pb-5 mt-2 gap-3">
            {Array(3).fill(0).map((_, index) => (
              <div key={index}>
                <div className="h-8 bg-gray-500 rounded-full w-24"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div>
          <div className="bg-gray-500 h-56 rounded-md w-full"></div>
        </div>

      </div>
     </div>
  </section>
);

const Works = () => {
  const [projects, setProject] = useState<ProjectModel[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Fetching data...");
    async function fetchData() {
      try {
        const projectData = await getProjects();
        setProject(projectData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }finally{
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section>
      <div className="container mx-auto px-6 md:px-0">
        <div className="flex flex-col justify-between gap-y-10">
          {/* Render Skeletons while loading */}
          {isLoading ? (
            Array(3).fill(0).map((_, index) => <SkeletonProjectCard key={index} />)
          ) : (
            // Render actual cards once data is fetched
            projects?.map((project) => (
              <ProjectCard
                key={project.id}
                liveLink={project.liveLink}
                title={project.title}
                hrefLink={project.liveLink}
                description={project.description}
                ImageSource={project.Images}
                tags={project.Skills}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
