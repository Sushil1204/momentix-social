import Loader from "@/components/shared/loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutation";
import { multiFormatDateString } from "@/lib/utils";
import { CircleArrowLeft, SquarePen } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();
  return (
    <div className="flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 no-scrollbar items-center">
      <div className="hidden md:flex max-w-5xl w-full">
        <div className="flex gap-5">
          <CircleArrowLeft size={28} />
          <p className="text-sm font-medium lg:text-base lg:font-medium">
            Back
          </p>
        </div>
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <div className="w-full max-w-5xl rounded-3xl flex-col flex xl:flex-row border border-gray-700 xl:rounded-l-3xl">
          <img
            src={post?.imageUrl}
            alt="postImage"
            className="w-full h-80 xl:w-[48%] lg:h-[480px] object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg"
          />
          <div className="flex items-center gap-4">
            <div className="w-full px-4 flex items-center justify-between">
              <Link
                to={`/profile/${post?.creator?.$id}`}
                className="hover:opacity-80 transition-opacity flex items-center gap-3"
              >
                <img
                  src={post?.creator?.imageUrl}
                  alt="Creator Profile"
                  className="rounded-full h-12 w-12 border border-gray-300 object-cover"
                />
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
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  to={`/edit/${post?.$id}`}
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <SquarePen className="h-6 w-6" />
                </Link>
                <Link
                  to={`/edit/${post?.$id}`}
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <SquarePen className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
