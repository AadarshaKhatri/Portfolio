"use client"; 

import { PostModel} from "@/app/types/interfaces";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { toast } from "sonner";
import { editPost, getUniquePost } from "../../action";


export default function UpdatePost(){
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [post, setPost] = useState<PostModel>();
  const [state, action] = useActionState(editPost, null);
  const params = useParams();
  const userId = params.id;
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
      const data: PostModel = await getUniquePost(id);
      setPost(data);
      setTags(data.tags || []);
    }
    FetchProject(Number(userId));
  }, [userId]);

  const handleAddTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTags = (skillToRemove: string) => {
    setTags(tags.filter((tags) => tags !== skillToRemove));
  };

  const handleDeleteImage = () => {
    setPost((prev) => prev ? { ...prev, Images: "" } : prev);
  };
  return(
    <div>
      <form action={action} className="flex flex-wrap gap-6">
          {/* Post ID */}
          <input type="number" defaultValue={post?.id} name="id" placeholder="Enter the id" className="hidden"/>
        
          {/* Project caption */}
          <div className="flex w-full gap-20">
            <textarea
              defaultValue={post?.caption}
              name="caption"
              placeholder="Caption for your post!"
              className="text-white min-h-40 border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
            ></textarea>

            <div className="w-52">
                  <select
                    required
                    name="status"
                    className="text-white border w-[200px] border-primary rounded-md py-3 px-4 bg-[#01071D] outline-none focus:ring-2 focus:ring-primary transition"
                  >
                    <option value="">Select the Status</option>
                    <option value="pinned">Pinned</option>
                    <option value="unpinned">Unpinned</option>
                  </select>
                </div>
          </div>

       

          {/* Tags Input */}
          <div className="w-full flex flex-col gap-5">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleAddTags}
              placeholder="Technologies Used in the Project"
              className="text-white border-b-2 border-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
            />

       
            {/* Render skills as tags */}
            <div className="flex flex-wrap mt-2 gap-5">
              {tags.map((tag, index) => (
                <div key={index} className="flex justify-center items-center gap-2 bg-primary text-white px-4 py-1 rounded-full">
                  {tag}
                  <button type="button" onClick={() => removeTags(tag)}>
                    <MdCancel size={20} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            {tags.map((tag, index) => (
              <input key={index} type="hidden" name="tags" value={tag} />
            ))}
          </div>

          {/* Image Upload & Delete */}
          <div className="flex w-full flex-col gap-4">
            {post?.images && (
              <div className="relative">
                <Image priority={true} quality={100} width={100} height = {100} src={post?.images} alt="Project Image" className="w-[400px] h-[200px] object-fill" />
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