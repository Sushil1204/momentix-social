import Loader from "@/components/shared/loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import React from "react";

const Home = () => {
  const {
    data: recentPosts,
    isPending: loadingRecentPosts,
    isError: RecentPostError,
  } = useGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 no-scrollbar">
        <div className="max-w-screen-sm flex flex-col items-start w-full gap-6 md:gap-9 ">
          <h2 className="text-2xl font-bold md:text-3xl text-left w-full">
            Feed
          </h2>
          {loadingRecentPosts && !recentPosts ? (
            <Loader />
          ) : (
            <ul className="flex flex-1 flex-col gap-8 ">
              {recentPosts?.documents?.map((post: Models.Document) => {
                return <PostCard post={post} />;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
