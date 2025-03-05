"use client"; 

import { ProjectModel } from "@/app/types/interfaces";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { EditProject, GetUniqueProject } from "../../action";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { toast } from "sonner";


export default function UpdateProject(){
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [project, setProject] = useState<ProjectModel | null>();
  const [state, action] = useActionState(EditProject, {
    success:false,
    error:null,
    message:null,
  });
  const params = useParams();
  const id = params.id;
  useEffect(()=>{
    setTimeout(()=>{
      if(!state?.success && state?.error){
        toast.error(`${state.error}`);
      }else if(state?.success && state.message){
        toast.success(`${state.message}`);
        window.location.reload();
      }
    },0)
  },[state])
  useEffect(() => {
    async function FetchProject(id: number) {
      const data = await GetUniqueProject(id);
      setProject(data);
      setSkills(Array.isArray(data?.Skills) ? data.Skills.filter((skill): skill is string => typeof skill === "string") : []);
    }
    FetchProject(Number(id));
  }, [id]);

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

  const handleDeleteImage = () => {
    setProject((prev) => prev ? { ...prev, Images: "" } : prev);
  };
  return(
    <div>
      <form action={action} className="flex flex-wrap gap-6">
          {/* Project Title */}
          <input type="number" defaultValue={project?.id} name="id" placeholder="Enter the id" className="hidden"/>
          <div className="flex w-full gap-6">
            <input
              defaultValue={project?.title}
              name="title"
              type="text"
              placeholder="Enter the Project Title"
              className="text-white border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
            />
          </div>

          {/* Project Description */}
          <div className="flex w-full">
            <textarea
              defaultValue={project?.description}
              name="description"
              placeholder="Write the description of the project"
              className="text-white min-h-40 border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
            ></textarea>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row w-full gap-6">
            <input
              defaultValue={project?.codelink}
              name="codelink"
              type="url"
              placeholder="Share the Repo Link"
              className="text-white border-b-2 border-primary w-full md:w-2/3 py-3 px-4 bg-[#01071D] outline-none focus:border-white"
            />

            <input
              defaultValue={project?.liveLink}
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
                <div key={index} className="flex justify-center items-center gap-2 bg-primary text-white px-4 py-1 rounded-full">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)}>
                    <MdCancel size={20} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            {skills.map((skill, index) => (
              <input key={index} type="hidden" name="skills[]" value={skill} />
            ))}
          </div>

          {/* Image Upload & Delete */}
          <div className="flex w-full flex-col gap-4">
            {project?.Images && (
              <div className="relative">
                <Image priority={true} quality={100} width={100} height = {100} src={project?.Images} alt="Project Image" className="w-[400px] h-[200px] object-fill" />
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

          {/* Save Button */}
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
  )
}