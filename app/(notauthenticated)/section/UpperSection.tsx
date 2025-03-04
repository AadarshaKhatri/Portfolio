"use client";

import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { IoSchoolOutline } from "react-icons/io5";
import { PiBalloon } from "react-icons/pi";
import Feedtabs from "./Feedtabs";
import { useEffect, useState } from "react";
import { UserModel } from "@/app/types/interfaces";
import { getProfile } from "../action";

const UpperSection = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching data...");
    async function fetchData() {
      try {
        const UserData = await getProfile();
        setUser(UserData);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const BioInfo = [
    {
      icon: <CiLocationOn size={20} className="text-primary" />,
      name: user?.location || "Unknown",
    },
    {
      icon: <IoSchoolOutline size={20} className="text-primary" />,
      name: user?.degree || "Not available",
    },
    {
      icon: <PiBalloon size={20} className="text-primary" />,
      name: user?.born ? new Date(user.born).getFullYear() : "Not specified",
    },
  ];

  // Skeleton loader component
  const SkeletonLoader = ({ height = "20px", width = "100%",className="" }: { height?: string; width?: string; className?:string }) => (
    <div className={`bg-gray-500 animate-pulse  ${className}`} style={{ height, width }}></div>
  );

  // Show skeletons while fetching data (loading is true)
  if (loading) {
    return (
      <section className="overflow-hidden min-h-screen flex justify-center">
        <div className="w-full max-w-[650px] mx-auto">
          <div className="flex flex-col">
            {/* Background Image Section and Profile Section */}
            <div className="relative">
              <SkeletonLoader height="250px" className="rounded-md" />
              <div className="relative flex flex-row justify-between mx-8 mt-4">
                <SkeletonLoader height="120px" width="120px" className=" relative rounded-full top-[-80px] z-50" />
                <SkeletonLoader height="40px" width="120px" className="rounded-md"/>
              </div>
            </div>

            {/* Personal Information */}
            <div className="flex flex-col mx-4 gap-5 mt-[-42px]">

              <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-x-2">
                <SkeletonLoader height="42px" width="300px" className="rounded-sm" />
                <SkeletonLoader height="42px" width="40px" className="rounded-sm" />
              </div>

              {/* Role */}
              <SkeletonLoader height="20px" width="150px" />
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-2">
                <SkeletonLoader height="18px" width="100%" />
                <SkeletonLoader height="18px" width="30%" />
              </div>

              {/* Icons */}
              <div className="flex flex-row justify-start gap-x-5 mt-4">
                {BioInfo.map((ele, index) => (
                  <div key={index} className="flex flex-row justify-between items-center gap-x-1">
                    <span>{ele.icon}</span>
                    <SkeletonLoader height="24px" width="150px" />
                  </div>
                ))}
              </div>
            </div>
            <SkeletonLoader height="400px" width="100%" className="mt-10 rounded-md"/>
          </div>
        </div>
      </section>
    );
  }

  // Show user data when loading is false
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        No Data Available!
      </div>
    );
  }

  return (
    <section className="overflow-hidden min-h-screen flex justify-center">
      <div className="w-full max-w-[650px] mx-auto">
        {/* Information */}
        <div className="flex flex-col">
          {/* Background Image Section and Profile Section */}
          <div className="relative pb-5">
            <Image
              src="/assets/Bg.png"
              alt="Background-Image"
              width={1000}
              height={500}
              quality={100}
              className="md:w-full md:h-[250px] h-auto object-cover"
            />
            <div className="relative flex flex-row justify-between mx-4 mt-4">
              {/* Profile Picture */}
              {user.profile && (
                <Image
                  src={user.profile}
                  alt="Pfp"
                  width={100}
                  height={100}
                  quality={100}
                  className="mt-[-80px] w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-red-300 rounded-full object-cover"
                />
              )}

              {/* Download Button */}
              <div>
                <a href="/pdf/Cv.pdf" download>
                  <button className="text-white font-comicNeue text-md border border-primary px-4 py-2 rounded-full hover:bg-primary">
                    Download CV
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="flex flex-col mx-4">
            <div className="flex flex-row items-center gap-x-2">
              <h2 className="text-primary text-2xl md:text-4xl font-semibold">{user.name}</h2>
              <Image
                src="/assets/Code.png"
                alt="Code"
                width={42}
                height={32}
                quality={100}
                className="w-[32px] h-[32px] md:w-[42px] md:h-[42px]"
              />
            </div>

            {/* Role */}
            <h4 className="text-md text-gray-400">{user.title}</h4>

            {/* Bio */}
            <p className="text-white mt-4">{user.bio}</p>

            {/* Icons */}
            <div className="flex flex-row justify-start gap-x-5 mt-4">
              {BioInfo.map((ele, index) => (
                <div key={index} className="flex flex-row justify-between items-center gap-x-1">
                  <span>{ele.icon}</span>
                  <h4 className="text-gray-400 text-sm md:text-lg">{ele.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feedtabs */}
        <div className="mt-10">
          <Feedtabs />
        </div>
      </div>
    </section>
  );
};

export default UpperSection;
