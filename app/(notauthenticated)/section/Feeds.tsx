import FeedCards from "@/app/components/FeedCards";
import { PostModel, UserModel } from "@/app/types/interfaces";
import { useEffect, useState } from "react";
import { getPost, getProfile } from "../action";

// Skeleton Component
const SkeletonCard = () => (
  <section className="p-5 md:pt-5  rounded-lg bg-gray-800">
  <div className="container mx-auto px-2">

    {/* Profile Image and Username */}
    <div className="flex flex-row gap-4 justify-start items-center">
      <div className="w-[50px] h-[50px] bg-gray-500 rounded-full"></div>

      <div className="flex gap-4 justify-center items-center ">
        {/* Username and Date */}
        <div className="h-10 bg-gray-500 w-60 rounded mb-2"></div>
        <div className="h-4 bg-gray-500 w-32 rounded"></div>
      </div>
    </div>

    {/* Caption */}
    <div className="h-4 bg-gray-500 w-full rounded mt-4 mb-2"></div>
    <div className="h-4 bg-gray-500 w-full rounded mb-2"></div>
    <div className="h-4 bg-gray-500 w-5/6 rounded mb-4"></div>

    {/* Tags */}
    <div className="w-full flex flex-row text-primary font-light pb-5 mt-2 gap-3">
      {Array(3).fill(0).map((_, index) => (
        <div key={index} className="bg-gray-500 h-8 rounded-full w-24"></div>
      ))}
    </div>

    {/* Feed Image */}
    <div className="h-[320px] bg-gray-500 w-full rounded-md"></div>

  </div>
    </section>
);

const Feeds = () => {

  const [feeds, setFeeds] = useState<PostModel[] | null>(null);
  const [profile, setProfile] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [PostData, UserData] = await Promise.all([getPost(), getProfile()]);
        setFeeds(PostData);
        setProfile(UserData);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setIsLoading(false);  
      }
    }
    fetchData();
  }, []);

  const pinnedPost = feeds?.filter((feed) => feed.pinned === true);
  const unpinnedPost = feeds?.filter((feed) => feed.pinned === false);

  return (
    <section>
      <div className="container mx-auto px-1 md:px-0">
        <div className="flex flex-col space-y-6">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            : pinnedPost?.map((feed) => (
                <FeedCards
                  key={feed.id}
                  username={profile?.name || "Loading..."}
                  profile={profile?.profile || ""}
                  id={feed.id}
                  authorId={profile?.id || 0}
                  pinned={feed.pinned}
                  tags={feed.tags}
                  createdAt={feed.createdAt}
                  caption={feed.caption}
                  images={feed.images}
                />
              ))}

          {isLoading
            ? Array(5)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            : unpinnedPost?.map((feed) => (
                <FeedCards
                  key={feed.id}
                  username={profile?.name || "Loading..."}
                  profile={profile?.profile || ""}
                  id={feed.id}
                  authorId={profile?.id || 0}
                  pinned={feed.pinned}
                  tags={feed.tags}
                  createdAt={feed.createdAt}
                  caption={feed.caption}
                  images={feed.images}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Feeds;
