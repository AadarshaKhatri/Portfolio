import ExperienceTab from "@/app/components/ExperienceTab";
import { useEffect, useState } from "react";
import { getExperience } from "../action";
import { ExperienceModel } from "@/app/types/interfaces";

// Skeleton Component for Button
const SkeletonButton = () => (
  <div className="h-10 bg-gray-500 rounded w-40"></div>
);

// Skeleton Component for Experience Card
const SkeletonExperienceCard = () => (
  <section className="border-l-4 border-gray-400 animate-pulse">
  <div className="flex flex-col px-6 py-3">
    {/* Image and Role */}
    <div className="flex flex-row items-center gap-x-5">
      <div className="bg-gray-500 rounded-full w-24 h-24"></div> {/* Skeleton for Image */}

      <div className="flex flex-col space-y-2">
        <div className="h-6 bg-gray-500 w-3/4 rounded"></div> {/* Skeleton for Role */}
        <div className="h-4 bg-gray-500 w-1/2 rounded"></div> {/* Skeleton for Company/Location */}
      </div>
    </div>

    <div className="mt-5">
      <div className="h-4 bg-gray-500 w-5/6 rounded mb-2"></div> {/* Skeleton for Description */}
      <div className="h-4 bg-gray-500 w-4/5 rounded mb-2"></div>
      <div className="h-4 bg-gray-500 w-3/4 rounded mb-2"></div>
    </div>

    {/* Skeleton for Skills */}
    <div className="mt-5 flex flex-shrink flex-row gap-x-5 gap-y-5 flex-wrap">
      {Array(3).fill(0).map((_, index) => (
        <div key={index} className="h-8 bg-gray-500 rounded-full w-24"></div>
      ))}
    </div>
  </div>
</section>
);

const Experience = () => {
  const [experience, setExperience] = useState<ExperienceModel []>();
  const [positions, setPostions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);  // Add loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const experienceData = await getExperience();
        setExperience(experienceData);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setIsLoading(false);  // Set loading to false once data is fetched
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (experience) {
      const newPositions = experience.map((exp) => exp.title);
      setPostions(newPositions);
    }
  }, [experience]);

  return (
    <section>
      <div className="container mx-auto px-6 md:px-0">
        <div className="flex flex-col">
          <h3 className="text-white font-semibold">Positions I have held</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-between gap-y-8 px-15 py-10">
            {isLoading ? (  // Conditional rendering for skeleton loader
              Array(4).fill(0).map((_, index) => (
                <SkeletonButton key={index} />
              ))
            ) : (
              positions.map((position, index) => (
                <div key={index}>
                  <button className=" px-3 py-2 border border-primary text-md text-white rounded-lg hover:bg-primary hover:text-black focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-md">
                    {position}
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="space-y-16">
            <h2 className="font-comicNeue text-4xl font-semibold text-primary mb-5">
              Career Highlights
            </h2>

            {isLoading ? (  // Conditional rendering for skeleton loader
              Array(3).fill(0).map((_, index) => (
                <SkeletonExperienceCard key={index} />
              ))
            ) : (
              experience?.map((exp) => (
                <ExperienceTab
                  id={exp.id}
                  company={exp.company}
                  key={exp.id}
                  role={exp.title}
                  ImgSrc={exp.logo}
                  location={exp.type}
                  description={exp.description}
                  skills={exp.skills}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
