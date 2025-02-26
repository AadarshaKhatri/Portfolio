"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PostModel, UserModel } from "@/app/types/interfaces";
import { getPostCreator, readPost } from "../../action";
import { VscPinned } from "react-icons/vsc";
import { getUser } from "@/app/(authenticated)/sessions";

export const ViewPost = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [user, setUser] = useState<UserModel | null>(null);

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
        setUser(UserData)
      }
      fetchUser();
    }
  }, [posts]);

  // If posts are not loaded yet
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-red-200 border-2 border-red-800 p-3 rounded-md text-white">
        <p className="text-md">No Project Found!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl text-white">{user?.name || "No name"}</h2>
      <section className="container mx-auto">
        <div className="flex flex-row justify-center items-start flex-wrap gap-5">
          {posts.map((post, index) => (
            <section key={index} className="p-5 md:pt-10 hover:bg-white/10 rounded-lg">
              <div className="container mx-auto px-2">
                <div className="flex flex-row gap-1">
                  <div className="w-[50px]">
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
                      <div className="flex flex-row items-center gap-2 absolute top-[-16px] md:top-[-30px]">
                        <VscPinned className="text-gray-300" size={16} />
                        <p className="text-gray-300 text-sm">Pinned</p>
                      </div>
                    )}

                    <h1 className="text-white text-lg font-bold pb-1">
                      Aadarsha Khatri <span className="font-normal text-gray-400 text-sm"> - 24th Feb </span>
                    </h1>

                    {/* Description */}
                    {post.caption && <p className="text-white">{post.caption}</p>}

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
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
};
