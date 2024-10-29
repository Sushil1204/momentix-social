import PostsGrid from "@/components/shared/PostsGrid";
import StatBlock from "@/components/shared/StatBlock";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useFollowUser,
  useGetFollowings,
  useGetUserById,
} from "@/lib/react-query/queriesAndMutation";
import { Grid3x3, SquarePen, UserPlus } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { mutateAsync: followUser } = useFollowUser();
  const { data: currentUser } = useGetUserById(id || user?.id);
  const { data: folllowings } = useGetFollowings(id || user?.id);

  // State to manage the selected tab
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="flex flex-col items-center flex-1 gap-10 overflow-y-scroll py-10 px-5 md:px-14 no-scrollbar">
      <div className="flex items-center gap-8 flex-col xl:flex-row relative max-w-5xl w-full md:mb-8 xl:items-start">
        <img
          src={currentUser?.imageUrl}
          alt="profile"
          loading="lazy"
          className="w-28 h-28 rounded-full shadow-md object-cover"
        />
        <div className="flex flex-col flex-1 justify-between md:mt-2 items-center xl:items-start">
          <div className="flex flex-col w-full text-center xl:text-left">
            <h1 className="text-xl md:text-2xl font-semibold">
              {currentUser?.name}
            </h1>
            <p className="text-sm md:text-base text-gray-500">
              @{currentUser?.username}
            </p>
          </div>
          <div className="flex gap-8 mt-6 items-center justify-center xl:justify-start flex-wrap">
            <StatBlock value={currentUser?.posts?.length} label="Posts" />
            <StatBlock
              value={folllowings?.documents[0]?.followersId?.length}
              label="Followers"
            />
            <StatBlock
              value={folllowings?.documents[0]?.followingsId?.length}
              label="Following"
            />
          </div>
          <p className="mt-7 text-gray-700 text-center xl:text-left max-w-md text-sm md:text-base">
            {currentUser?.bio}
          </p>
        </div>
        <div className="flex justify-center mt-6 xl:mt-0 gap-4">
          <Link
            to={`/editprofile/${currentUser?.$id}`}
            className="flex items-center gap-2 bg-transparent text-gray-800 px-4 py-2 rounded-lg hover:bg-slate-50 border border-gray-800 transition-colors"
          >
            <SquarePen className="h-5 w-5" />
            <span className="text-sm font-medium">Edit Profile</span>
          </Link>
          {currentUser?.$id !== user?.id && (
            <Button
              onClick={() =>
                followUser({
                  userId: user?.id,
                  followingId: currentUser?.$id || "",
                })
              }
              className="flex items-center gap-2 bg-transparent text-gray-800 px-4 py-2 rounded-lg hover:bg-slate-50 border border-gray-800 transition-colors"
            >
              <UserPlus className="h-5 w-5" />
              <span className="text-sm font-medium">
                {folllowings?.documents[0]?.userId === currentUser?.$id
                  ? "Following"
                  : "Follow"}
              </span>
            </Button>
          )}
        </div>
      </div>

      <div className="flex w-full max-w-5xl gap-4 md:flex-wrap justify-center xl:justify-center">
        <div
          onClick={() => setActiveTab("posts")}
          className={`flex items-center gap-2 py-3 px-5 w-full md:w-48 transition-colors rounded-lg cursor-pointer ${
            activeTab === "posts"
              ? "bg-gray-400 text-gray-900"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Grid3x3 className="h-5 w-5" />
          <span className="text-sm font-medium">Posts</span>
        </div>
        {currentUser?.$id === user?.id && (
          <div
            onClick={() => setActiveTab("liked")}
            className={`flex items-center gap-2 py-3 px-5 w-full md:w-48 transition-colors rounded-lg cursor-pointer ${
              activeTab === "liked"
                ? "bg-gray-400 text-gray-900"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <FaHeart className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium">Liked Posts</span>
          </div>
        )}
      </div>

      {/* Render PostsGrid based on the active tab */}
      {activeTab === "posts" ? (
        <PostsGrid posts={currentUser?.posts} showUser={false} />
      ) : (
        <PostsGrid posts={currentUser?.liked} showUser={false} />
      )}
    </div>
  );
};

export default Profile;
