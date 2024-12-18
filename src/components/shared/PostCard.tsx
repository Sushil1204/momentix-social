import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { SquarePen, UserRoundMinus, UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { Button } from "../ui/button";
import {
  useFollowUser,
  useGetFollowings,
  useUnfollowUser,
} from "@/lib/react-query/queriesAndMutation";

type PostCardProps = {
  post: Models.Document;
};
const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  if (!user) return;

  const { mutateAsync: followUser } = useFollowUser();
  const { mutateAsync: unfollowUser } = useUnfollowUser();
  const { data: folllowings } = useGetFollowings(user?.id);

  return (
    <div className="w-full max-w-screen-sm p-6 lg:p-8 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Link
            to={`/profile/${post?.creator?.$id}`}
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src={post?.creator?.imageUrl}
              alt="Creator Profile"
              className="rounded-full h-12 w-12 border border-gray-300 object-cover"
            />
          </Link>
          <div className="flex flex-col">
            <p className="text-base font-semibold lg:text-lg text-gray-800">
              {post?.creator?.name}
            </p>
            <div className="flex items-center gap-2 text-gray-500">
              <p className="text-sm font-medium">
                {multiFormatDateString(post?.$createdAt)}
              </p>
              <span>-</span>
              <p className="text-sm font-medium">{post?.location}</p>
            </div>
          </div>
        </div>
        {user?.id === post?.creator?.$id && (
          <Link
            to={`/edit/${post?.$id}`}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <SquarePen className="h-6 w-6" />
          </Link>
        )}
        {user?.id !== post?.creator?.$id && (
          <Button
            variant={"ghost"}
            onClick={() =>
              folllowings?.documents[0]?.followingsId.includes(
                post?.creator?.$id
              )
                ? unfollowUser({
                    userId: user?.id,
                    followingId: post?.creator?.$id,
                  })
                : followUser({
                    userId: user?.id,
                    followingId: post?.creator?.$id,
                  })
            }
            className="flex flex-col md:flex-row itmes-center md:gap-4 border border-gray-800 px-3 py-2 rounded-lg text-gray-800 hover:text-gray-800 transition-colors"
          >
            {folllowings?.documents[0]?.followingsId.includes(
              post?.creator?.$id
            ) ? (
              <UserRoundMinus className="h-10 w-10 md:h-6 md:w-6" />
            ) : (
              <UserRoundPlus className="h-10 w-10 md:h-6 md:w-6" />
            )}
            <span className="hidden md:block">
              {folllowings?.documents[0]?.followingsId.includes(
                post?.creator?.$id
              )
                ? "Unfollow"
                : "Follow"}
            </span>
          </Button>
        )}
      </div>

      <Link to={`/post/${post?.$id}`} className="group">
        <div className="text-sm font-medium lg:text-base mb-4">
          <p className="text-gray-700 group-hover:text-gray-900 transition-colors">
            {post?.caption}
          </p>
          <ul className="flex gap-2 mt-2 flex-wrap">
            {post?.tags?.map((tag: string) => (
              <li key={tag} className="text-sm text-blue-500 font-medium">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-lg">
          <img
            src={post?.imageUrl}
            alt="Post Image"
            className="w-full h-80 lg:h-[480px] object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg"
          />
        </div>
      </Link>
      <PostStats post={post} userId={user?.id} />
    </div>
  );
};

export default PostCard;
