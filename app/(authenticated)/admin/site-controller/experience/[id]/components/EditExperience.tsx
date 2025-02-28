"use client"
import { useActionState, useEffect, useState } from "react";
import { readUniqueExperience, updateExperience } from "../../action";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Experience } from "@prisma/client";
import { ExperinceModel } from "@/app/types/interfaces";
import { MdCancel } from "react-icons/md";
import Image from "next/image";

const EditExperience = () => {
  const params = useParams();
  const id = params.id;

  const [experience, setExperience] = useState<ExperinceModel>();
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [experienceType, setExperienceType] = useState<string>("");

  const handleAddSkill = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      setSkills([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const [state, action] = useActionState(updateExperience, null);

  const handleDeleteImage = () => {
    setExperience((prev) => (prev ? { ...prev, logo: "" } : prev));
  };

  useEffect(() => {
    async function readExperience(id: number) {
      const data = await readUniqueExperience(id);
      setExperience(data);
      setSkills([...data?.skills]); // Ensure skills are populated
      setExperienceType(data?.type || ""); // Ensure select has the right default value
    }
    readExperience(Number(id));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!state?.success && state?.error) {
        toast.error(`${state?.error}`);
      } else if (state?.success && state.message) {
        toast.success(`${state?.message}`);
      }
    }, 0);
  }, [state]);

  return (
    <section>
      <div className="container mx-auto">
        <div className="flex flex-col">
          <form action={action} className="flex flex-wrap gap-6">
            <input name="id" defaultValue={experience?.id} className="hidden"/>
            {/* Experience Title */}
            <div className="flex w-full gap-6">
              <input
                defaultValue={experience?.title}
                name="title"
                type="text"
                placeholder="Enter the Experience Title"
                className="text-white border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
              />
            </div>

            {/* Description */}
            <div className="flex w-full">
              <textarea
                defaultValue={experience?.description}
                name="description"
                placeholder="Write the description for your experience"
                className="text-white min-h-20 border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
              ></textarea>
            </div>

            {/* Select Experience Type */}
            <div className="flex flex-col w-full">
              <select
                value={experienceType}
                name="type"
                onChange={(e) => setExperienceType(e.target.value)}
                className="text-white border-b-2 border-b-primary w-full py-4 px-4 bg-[#01071D] outline-none"
              >
                <option value="INTERNSHIP">INTERNSHIP</option>
                <option value="WORKS">WORKS</option>
                <option value="COMMUNITY_HOURS">COMMUNITY HOURS</option>
              </select>
            </div>

            {/* Company Name */}
            <div className="flex flex-col md:flex-row w-full gap-6">
              <input
                defaultValue={experience?.company}
                name="companyName"
                type="text"
                placeholder="Enter the name of the company"
                className="text-white border-b-2 border-primary w-full md:w-2/3 py-3 px-4 bg-[#01071D] outline-none focus:border-white"
              />
            </div>

            {/* Technologies Used */}
            <div className="w-full flex flex-col gap-5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Technologies Used in the Company"
                className="text-white border-b-2 border-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
              />

              <div className="flex flex-wrap mt-2 gap-5">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center gap-6 bg-primary text-white px-4 py-1 rounded-full"
                  >
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>
                      <MdCancel size={32} />
                    </button>
                  </div>
                ))}
              </div>

              {skills.map((skill, index) => (
                <input key={index} type="hidden" name="skills" value={skill} />
              ))}
            </div>

            {/* Upload Logo */}
            <div className="flex w-full flex-col gap-4">
              {experience?.logo && (
                <div className="relative">
                  <Image priority width={100} height={100} src={experience.logo} alt="Project Image" className="w-[400px] h-[200px] object-fill" />
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                  >
                    <MdCancel size={24} />
                  </button>
                </div>
              )}
              <input
                name="image"
                type="file"
                className="text-white border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
              />
              <span className="text-primary text-sm">Note: The current Image will be replaced by the one you will be uploading</span>
            </div>

            <div className="w-full flex flex-row justify-center items-center mt-5">
              <button className="text-white bg-green-800 rounded-md text-lg py-3 px-6 hover:bg-green-800/50" type="submit">
                Update Experience
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditExperience;
