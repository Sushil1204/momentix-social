import Loader from "@/components/shared/loader";
import PostsGrid from "@/components/shared/PostsGrid";
import SearchResults from "@/components/shared/SearchResults";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetPosts,
  useSearchUser,
} from "@/lib/react-query/queriesAndMutation";
import { ListFilter, SearchIcon } from "lucide-react";
import { useState } from "react";

const Search = () => {
  const { data: posts, fetchNextPage, hasNextPage, isPending } = useGetPosts();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedUser, isPending: isSearchUserPending } =
    useSearchUser(debouncedValue);

  // if (!isPending) {
  //   return (
  //     <div className="flex items-center justify-center w-full h-full">
  //       <Loader />
  //     </div>
  //   );
  // }

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts?.pages?.every((item) => item?.documents.length === 0);

  return (
    <div className="flex flex-col flex-1 items-center overflow-scroll py-10 px-5 md:p-14 no-scrollbar">
      <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className="text-2xl font-bold md:text-3xl text-left w-full">
          Search
        </h2>
        <div className="flex gap-1 px-4 w-full rounded-lg items-center border-2 border-gray-800">
          <SearchIcon />
          <input
            type="text"
            name="searchUser"
            placeholder="Search user"
            value={searchValue}
            className="h-12 px-3 w-full outline-none border-none focus:ring-0 focus:outline-none placeholder:text-light-4"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl mt-6">
        {shouldShowSearchResults ? (
          <SearchResults
            searchedUser={searchedUser?.documents}
            isSearchUserPending={isSearchUserPending}
          />
        ) : shouldShowPosts ? (
          <p className=""> You are all caught up !!!</p>
        ) : (
          posts?.pages?.map((item, index) => (
            <PostsGrid key={`page-${index}`} posts={item?.documents} />
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
