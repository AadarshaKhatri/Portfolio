"use client";

import { useActionState, useEffect, useState } from "react";
import { createProject } from "../../action";
import { toast } from "sonner";
import { MdCancel } from "react-icons/md";



const AddProjects = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

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
  const initialState = {
    error: "",
    success: false,
    message: ""
  }
  const [state, action] = useActionState(createProject, initialState);
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
      <div className="flex flex-col">
        <div className="flex-col gap-10">
          <form action={action} className="flex flex-wrap gap-6">
            {/* First Row - Full Width */}
            <div className="flex w-full gap-6">
              <input
                name="title"
                type="text"
                placeholder="Enter the Project Title"
                className="text-white border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
              />
            </div>
            <div className="flex w-full">
              <textarea
                name="description"
                placeholder="Write the description of the project"
                className="text-white min-h-20 border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D]  outline-none focus:border-white"
              ></textarea>
            </div>
            {/* Second Row - Three Inputs in One Line */}
            <div className="flex flex-col md:flex-row w-full gap-6">
              <input
                name="codelink"
                type="url"
                placeholder="Share the Repo Link"
                className="text-white border-b-2 border-primary w-full md:w-2/3 py-3 px-4 bg-[#01071D] outline-none focus:border-white"
              />

              <input
                name="liveLink"
                type="url"
                placeholder="Share the link to the site"
                className="text-white border-b-2 border-primary w-full md:w-2/3 py-3 px-4 bg-[#01071D] outline-none focus:border-white"
              />
            </div>

           {/* Skills Input */}
            <div className="w-full flex flex-col gap-5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Technologies Used in the Project"
                className="text-white border-b-2 border-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
              />

              {/* Render skills as tags */}
              <div className="flex flex-wrap mt-2 gap-5">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center gap-6 bg-primary text-white px-4 py-1 rounded-full"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className=""
                    >
                      <MdCancel size={32} className=""/>
                    </button>
                  </div>
                ))}
              </div>

              {/* 🔥 Hidden Inputs to Submit Skills */}
              {skills.map((skill, index) => (
                <input key={index} type="hidden" name="skills" value={skill} />
              ))}
            </div>


            {/* Third Row - Full Width */}
            <div className="flex w-full">
              <input
                name="image"
                type="file"
                placeholder="Upload an Image"
                className="text-white border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
              />
            </div>

            <div className="w-full flex flex-row justify-center items-center mt-5">
              <button
                className="text-white bg-green-800 rounded-md text-lg py-3 px-6 hover:bg-green-800/50"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProjects;
