// import { ISearchUser } from "@/constants/interfaces";
import { Models } from "appwrite";

type ISearchUserProps = {
  searchedUser: Models.Document[];
  isSearchUserPending: boolean;
};
const SearchResults = ({
  searchedUser,
  isSearchUserPending,
}: ISearchUserProps) => {
  return (
    <div className="w-full max-h-80 overflow-y-auto no-scrollbar space-y-3 mt-3">
      {!isSearchUserPending && searchedUser?.length >= 1 ? (
        searchedUser?.map((user: any) => (
          <div
            key={user.name}
            className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 hover:bg-gray-100"
          >
            <img
              src={user?.imageUrl}
              alt={`${user?.name}'s avatar`}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              {user?.username && (
                <p className="text-xs text-gray-500">@{user?.username}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <>
          <p>No User Found</p>
        </>
      )}
    </div>
  );
};

export default SearchResults;
