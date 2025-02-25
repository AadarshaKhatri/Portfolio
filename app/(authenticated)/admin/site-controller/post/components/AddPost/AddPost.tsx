"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { MdCancel } from "react-icons/md";
import { createPost } from "../../action";



const AddPost = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const hadndleAddTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const [state, action] = useActionState(createPost, null);
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
              <div className="flex justify-between items-center  gap-20 w-full">
                <textarea
                  name="caption"
                  typeof="text"
                  placeholder="Write the caption for the post"
                  className="text-white flex-grow min-h-24 border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
                />
                <div className="w-auto">
                  <select
                  name="status"
                    className="text-white border w-[200px] border-primary rounded-md py-3 px-4 bg-[#01071D] outline-none focus:ring-2 focus:ring-primary transition"
                  >
                    <option value="pinned">Pinned</option>
                    <option value="unpinned">Unpinned</option>
                  </select>
                </div>
              </div>



            {/* Skills Input */}
              <div className="w-full flex flex-col gap-5">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={hadndleAddTags}
                  placeholder="Tags for the post; for example: #Learning"
                  className="text-white border-b-2 border-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
                />



                {/* Render skills as tags */}
                  <span className="text-primary text-sm">Make sure the tags start with &apos; # &apos;</span>
                <div className="flex flex-wrap mt-2 gap-5">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center gap-6 bg-primary text-white px-4 py-1 rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className=""
                      >
                        <MdCancel size={32} className=""/>
                      </button>
                    </div>
                  ))}
                </div>

                {/* 🔥 Hidden Inputs to Submit Skills */}
                {tags.map((tag, index) => (
                  <input key={index} type="hidden" name="skills" value={tag} />
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

export default AddPost;
