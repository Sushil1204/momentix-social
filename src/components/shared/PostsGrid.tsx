import { Models } from "appwrite";
import { Link } from "react-router-dom";

type IPostGrid = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};
const PostsGrid = ({ posts, showUser = true }: IPostGrid) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl">
      {posts?.map((post) => (
        <div key={post?.$id} className="relative min-w-80 h-80">
          <Link
            to={`/post/${post?.$id}`}
            className="flex rounded-[24px] border border-dark-4 overflow-hidden cursor-pointer w-full h-full"
          >
            <img
              src={post?.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="absolute flex items-center bottom-0 p-5 flex-between w-full bg-gradient-to-t from-black to-transparent rounded-b-[24px] gap-2">
            {showUser && (
              <div className="flex items-center gap-2">
                <img
                  src={post?.creator?.imageUrl}
                  alt="userImage"
                  className="h-8 w-8 rounded-full"
                />
                <p className="text-sm font-semibold md:text-base text-white lline-clamp-1">
                  {post?.creator?.name}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsGrid;
