import Loader from "@/components/shared/loader";
import {
  useDeletePost,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutation";
import { multiFormatDateString } from "@/lib/utils";
import { CircleArrowLeft, SquarePen, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { mutate: deletePost } = useDeletePost();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    id && deletePost({ postId: id, imageId: post?.imageId });
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center flex-1 gap-6 overflow-y-scroll py-5 px-4 md:p-10 no-scrollbar max-w-screen-lg mx-auto">
      {/* Back Button */}
      <div className="hidden md:flex w-full mb-4">
        <Link
          to="/"
          aria-label="Back to home"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <CircleArrowLeft size={24} />
          <p className="text-sm font-medium lg:text-base">Back</p>
        </Link>
      </div>

      {isPending ? (
        <Loader />
      ) : (
        <div className="w-full rounded-lg flex flex-col xl:flex-row border border-gray-300 shadow-lg overflow-hidden">
          {/* Post Image */}
          <img
            src={post?.imageUrl || "/fallback-image.jpg"}
            alt="postImage"
            className="w-full h-64 sm:h-80 lg:h-[480px] xl:w-1/2 object-cover transition-transform duration-300 ease-in-out"
          />
          {/* Post Content */}
          <div className="flex flex-col w-full p-4 sm:p-6 gap-4 xl:gap-6 xl:w-1/2">
            {/* Creator Info */}
            <div className="flex justify-between items-center">
              <Link
                to={`/profile/${post?.creator?.$id}`}
                className="flex items-center gap-3 sm:gap-4 hover:opacity-80 transition-opacity"
              >
                <img
                  src={post?.creator?.imageUrl || "/fallback-avatar.jpg"}
                  alt="Creator Profile"
                  className="rounded-full h-10 w-10 sm:h-12 sm:w-12 border border-gray-300 object-cover"
                />
                <div>
                  <p className="text-base font-semibold text-gray-800 sm:text-lg">
                    {post?.creator?.name || "Unknown User"}
                  </p>
                  <div className="flex items-center gap-1 sm:gap-2 text-gray-500 text-xs sm:text-sm">
                    <p>{multiFormatDateString(post?.$createdAt)}</p>
                    <span>-</span>
                    <p>{post?.location || "Unknown Location"}</p>
                  </div>
                </div>
              </Link>
              {/* Edit and Delete Buttons */}
              <div className="flex items-center gap-3 sm:gap-4">
                <Link
                  to={`/edit/${post?.$id}`}
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                  aria-label="Edit post"
                >
                  <SquarePen className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  aria-label="Delete post"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            {/* Caption and Tags */}
            <div className="flex-grow">
              <p className="text-gray-800 text-sm sm:text-base lg:text-lg">
                {post?.caption}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {post?.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800">Delete Post</h2>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
