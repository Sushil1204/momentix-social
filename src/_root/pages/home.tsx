import Loader from "@/components/shared/loader";
import PostCard from "@/components/shared/PostCard";
import {
  useGetRecentPosts,
  useGetTopUsers,
} from "@/lib/react-query/queriesAndMutation";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: recentPosts, isPending: loadingRecentPosts } =
    useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetTopUsers(10);
  const TopCreators = creators?.documents?.filter(
    (creator) => creator?.posts?.length >= 1
  );
  return (
    <div className="flex flex-1 flex-col xl:flex-row gap-10 py-10 px-5 md:px-8 lg:px-14 no-scrollbar">
      {/* Feed Section */}
      <div className="flex-1 flex flex-col items-center gap-10">
        <div className="w-full max-w-screen-md">
          <h2 className="text-2xl font-bold md:text-3xl mb-6">Feed</h2>
          {loadingRecentPosts ? (
            <Loader />
          ) : (
            <ul className="space-y-8">
              {recentPosts?.documents?.map((post) => (
                <PostCard key={post.$id} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Top Creators Section */}
      <aside className="hidden xl:block xl:w-80 h-fit 2xl:w-96 px-6 py-10 bg-white rounded-lg  overflow-y-auto no-scrollbar">
        <h3 className="text-2xl font-bold mb-6">Top Creators</h3>
        {isUserLoading ? (
          <Loader />
        ) : isErrorCreators ? (
          <p className="text-gray-500 text-center">Error loading creators</p>
        ) : (
          <div className="space-y-6">
            {TopCreators?.map((creator) => (
              <Link
                to={`/profile/${creator?.$id}`}
                key={creator.$id}
                className="flex items-center gap-4 hover:opacity-80 transition-opacity"
              >
                <img
                  src={creator?.imageUrl || "/fallback-avatar.jpg"}
                  alt={`${creator?.name}'s Profile`}
                  className="rounded-full h-12 w-12 border border-gray-300 object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {creator?.name || "Unknown User"}
                  </p>
                  <p className="text-sm text-gray-500">
                    @{creator?.username || "unknown"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
};

export default Home;
