"use client";

import React, { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { PostModel, UserModel } from "@/app/types/interfaces";
import { deletePost, getPostCreator, readPost } from "../../action";
import { VscPinned } from "react-icons/vsc";
import { getUser } from "@/app/(authenticated)/sessions";
import Link from "next/link";
import { toast } from "sonner";

export const ViewPost = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [user, setUser] = useState<UserModel | null>(null);
  const [state,action] = useActionState(deletePost,{
    success:false,
    error:null,
    message:null,
  })

  useEffect(()=>{
    setTimeout(()=>{
      if(!state?.success && state?.error){
        toast.error(`${state.error}`)
      }else if(state?.success && state.message){
        toast.success(`${state.message}`);
      }
    },0)
   
  },[state])

  // Fetch posts once on component mount
  useEffect(() => {
    async function fetchData() {
      const postData = await readPost();
      setPosts(postData);
    }
    fetchData();
  }, []);

  // Fetch user data only when posts exist
  useEffect(() => {
    if (posts.length > 0) {
      async function fetchUser() {
        const userPayload = await getUser();
        const UserData = await getPostCreator(Number(userPayload?.userId));
        if(!UserData){
          console.log("Error Getting the User");
          return;
        }
        setUser(UserData)
      }
      fetchUser();
    }
  }, [posts]);

  // If posts are not loaded yet
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-red-100 border-2 border-red-800 p-3 rounded-md text-black">
        <p className="text-md">No Project Found!</p>
      </div>
    );
  }

  return (
    <div>
      <section className="container mx-auto">
        <div className="flex flex-row justify-center items-start flex-wrap gap-5">
          {posts.map((post, index) => (
            <section key={index} className=" py-10 md:pt-10 hover:bg-white/10 rounded-lg md:w-[430px]">
              <div className="container mx-auto px-5">
                <div className="flex flex-row gap-1">
                  <div className="w-[52px]">
                    {user?.profile ? (
                      <Image
                        src={user.profile || "/default-profile.png"} // Fallback image
                        alt="Profile"
                        height={42}
                        width={42}
                        className="rounded-full max-w-[42px] max-h-[42px] object-cover"
                        quality={100}
                      />
                    ) : (
                      <p className="text-primary">No User Profile!</p>
                    )}
                  </div>

                  <div className="flex-1 flex-col relative">
                    {post.pinned && (
                      <div className="flex flex-row items-center gap-2 absolute top-[-24px] md:top-[-20px]">
                        <VscPinned className="text-gray-300" size={16} />
                        <p className="text-gray-300 text-sm">Pinned</p>
                      </div>
                    )}

                    <h1 className="text-white text-lg font-bold pb-1">
                      {user?.name}<span className="font-normal text-gray-400 text-sm"> - {new Date(post?.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })} </span>
                    </h1>

                    {/* Description */}
                    {post.caption && <p className="text-white mt-2">{post.caption}</p>}

                    {/* Tags */}
                    <p className="text-primary font-light pb-5 mt-2">{post.tags}</p>

                    {/* Post Image */}
                    {post.images && post.images !== "" ? (
                      <div className="">
                        <Image
                          src={post.images}
                          alt="Feed"
                          width={1000}
                          height={1000}
                          quality={100}
                          priority
                          className="w-full h-[150px] md:h-[320px] object-cover"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='flex flex-row justify-center items-center mt-5 gap-5'>

{/* Delete Button */}

                <div className='flex'>
                  <form action={action}>
                    <input type='text'  name="id" defaultValue={post.id} placeholder='id of the post' className='hidden'/>
                  <button className='px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-500/50'>Delete Post</button></form>
                </div>

                {/* Edit Button */}
                <div className='flex'>
                  <Link href={`/admin/site-controller/post/${post.id}`}>
                  <button className='px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-500/50'>Edit Post</button></Link>

                </div>

                </div>
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
};
