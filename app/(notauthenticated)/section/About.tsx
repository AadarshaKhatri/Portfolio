"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getLanguages, getProfile, getTechnologies } from "../action";
import { LanguagesModel, TechnologiesModel, UserModel } from "../../types/interfaces";

// Skeleton Component
const SkeletonBox = () => (
  <div className="w-14 h-14 bg-gray-700 animate-pulse rounded-md"></div>
);

const About = () => {
  const [tech, setTechs] = useState<TechnologiesModel[]>();
  const [lang, setLang] = useState<LanguagesModel[]>();
  const [user, setUser] = useState<UserModel | null>();
  
  const [loadingTech, setLoadingTech] = useState(true);
  const [loadingLang, setLoadingLang] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [techData, langData, userData] = await Promise.all([
          getTechnologies(),
          getLanguages(),
          getProfile(),
        ]);
  
        setTechs(techData);
        setLang(langData);
        setUser(userData);
        
        setLoadingTech(false);
        setLoadingLang(false);
        setLoadingUser(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="py-8">
      <div className="container mx-auto px-6 md:px-0">
        <div className="flex flex-col space-y-5">
          <h2 className="font-comicNeue text-4xl font-semibold text-primary mb-3">Tech Stack</h2>
          <p className="text-white text-md">
            I bring the expertise and the tools to build success. Here’s my developer’s toolkit for making an impact.
          </p>

          {/* Tech Stack */}
          <div className="grid items-center justify-center grid-cols-3 md:grid-cols-6 gap-y-12 py-8">
            {loadingTech
              ? Array(6).fill(null).map((_, index) => <SkeletonBox key={index} />)
              : tech?.map((techItem) => (
                  <div key={techItem.id} className="flex flex-col items-center gap-y-5">
                    <Image
                      src={techItem.Images}
                      alt="tech-logo"
                      width={42}
                      height={42}
                      quality={100}
                      className="w-[42px] h-[42px]"
                    />
                    <h4 className="text-gray-400 font-semibold">{techItem.title}</h4>
                  </div>
                ))}
          </div>

          {/* Languages */}
          <div className="py-4">
            <h2 className="font-comicNeue text-2xl text-center text-primary mb-5">Languages</h2>
            <div className="grid items-center grid-cols-3 md:grid-cols-4 gap-y-12 py-2">
              {loadingLang
                ? Array(4).fill(null).map((_, index) => <SkeletonBox key={index} />)
                : lang?.map((language) => (
                    <div key={language.id} className="flex flex-col justify-center items-center gap-y-5">
                      <Image
                        src={language.Images}
                        alt="tech-logo"
                        width={42}
                        height={42}
                        quality={100}
                      />
                      <h4 className="text-gray-400 font-semibold">{language.lang}</h4>
                    </div>
                  ))}
            </div>
          </div>

          {/* User Description */}
          <div>
            <h2 className="text-gray-400 text-sm mb-5">Want to know more about me?</h2>
            <div>
              {loadingUser ? (
                <div className="w-full h-40 bg-gray-700 animate-pulse rounded-md"></div>
              ) : (
                <h5 className="text-white mb-5">{user?.description}</h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
