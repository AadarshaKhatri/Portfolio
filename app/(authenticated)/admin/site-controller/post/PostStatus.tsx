"use client";

import { Suspense, useState } from "react";
import AddPost from "./components/AddPost/AddPost";
import ViewPost from "./components/ViewPost/ViewPost";

const PostStatus = () => {
  const [activeTabs, setactiveTabs] = useState("View Posts");

  const handletabs = (tabs: string) => {
    setactiveTabs(tabs);
  };

  return (
    <section>
      <div className="flex flex-col justify-center items-center gap-y-10">
        <div className="flex flex-row justify-center items-center gap-10">
              <div
                onClick={() => handletabs("View Posts")}
                className={`font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                      ${
                        activeTabs === "View Posts"
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-500"
                      }`}
              >
                View Posts
              </div>
            <div
              onClick={() => handletabs("Add Post")}
              className={` font-semibold cursor-pointer py-2 px-4 text-lg transition-all duration-100 
                    ${
                      activeTabs === "Add Post"
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-500"
                    }`}
            >
              Add Post
            </div>
        </div>
        <div className="flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
              {activeTabs === "Add Post" && <AddPost/>}
              {activeTabs === "View Posts" && <ViewPost/>}
              
            </Suspense>
        </div>
      </div>
    </section>
  );
};

export default PostStatus;
